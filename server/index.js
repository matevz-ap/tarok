const express = require("express");
const app = express();
const path = require('path');
const http = require('http').Server(app);
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
});

//Classes
const Deck = require('./classes/Deck.js');
const Hand = require('./classes/Hand.js');
const Game = require('./classes/Game.js');

var router = express.Router();

app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/build')));

const rooms = {};

function newGame(socket, username) {
    const room = {
            id: Object.keys(rooms).length + 13,
            sockets: [],
            players: [],
            game: new Game(),
            startingPlayer: 0,
        };
    rooms[room.id] = room;
    joinRoom(socket, room.id, username);
}
function joinRoom(socket, roomId, username) {
    const room = rooms[roomId]
    if (room == undefined) {
        socket.emit("error", "notFound");
    }
    else if(room.sockets.length < 4) { //room is not full yet
        socket.emit("validRoom");
        socket.relativeId = room.sockets.length;
        socket.join(roomId);
        socket.roomId = roomId;
        room.sockets.push(socket);
        room.game.newPlayer(socket.id, username);

        for(const client of room.sockets) {
            client.emit('joinedRoom', roomId, room.game.getPlayerNames());
        }
        console.log(socket.id, "Joined", roomId);
    }
    else {
        socket.emit('error', "roomFull");
    }
}

function rejoinRoom(socket, roomId, socketId) {
    const room = rooms[roomId];
    const game = room.game; 

    let playerIndex = getSocketIndexById(room, socketId);
    const player = game.players[playerIndex];

    socket.relativeId = playerIndex;
    socket.join(roomId);
    socket.roomId = roomId;
    room.sockets[playerIndex] = socket;

    socket.emit("rejoinedRoom", room.id, game.getPlayerNames(), game.state, 
        player.hand.cards, game.type, game.deck, game.getTurn(), game.pot, game.getScores()); 
}

function startGame(room) {
    const game = room.game;
    game.startGame(room.startingPlayer);

    for(const client of room.sockets) {
        let hand = game.players[client.relativeId].hand.cards;
        client.emit('handDealt', client.relativeId == game.startingPlayer, hand);
    }

    room.startingPlayer = (game.startingPlayer + 1) % 4;
}

function takePot(winner, pot, room) {
    const game = room.game;

    for(const client of room.sockets) { 
        if(client.relativeId == winner) { //najdemo pravega igralca
            game.potTaken(pot, client.relativeId);
            setTimeout(() => {  client.emit('potTaken', true, pot); }, 3000);
        }
        else client.emit('potTaken', false, pot);
    }
}

function gameOver(room, success) { //success true, če je igralec uspešno zaključil igro
    let game = room.game;
    game.gameOver(success);

    updateClients("gameOver", 0, game.getScores(), room);
    startGame(room);
}

function updateClients(update, turn, data, room) { //if turn or data 0, then they are not needed on frontend
    for(const client of room.sockets) {
        client.emit(update, client.relativeId == turn, data);
    }
}

function getSocketIndexById(room, id) {
    const players = room.game.players;
    for(let i = 0; i < players.length; i++) {
        if(players[i].id == id) return i;
    }
    return -1;
}

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log(socket.id, 'just connected.');
    socket.emit("connected");

    socket.on('reconnect', (roomId, socketId) => {
        if(rooms[roomId] != undefined) {
            rejoinRoom(socket, roomId, socketId);   
        }
    });

    socket.on('createNewGame', (username) => {
        newGame(socket, username);
    });

    socket.on('joinGame', (roomId, username) => {
        joinRoom(socket, roomId, username);
    });

    socket.on('ready', () => {
        console.log(socket.id, "is ready!");
        const room = rooms[socket.roomId];
        if (room.sockets.length == 4) { //start
            startGame(room);
            console.log("starT");
        }
    });

    socket.on('gameChosen', (chosenGame) => {
        const room = rooms[socket.roomId];
        const game = room.game;

        game.gameChosen(chosenGame, socket.relativeId);

        updateClients("gameChosen", game.getTurn(), game.type, room);

        if(game.state == "choosingSuit") {
            updateClients(game.state, game.playerPlaying, 0, room); 
        } 
    });

    socket.on('suitChosen', (suit) => {
        const room = rooms[socket.roomId];
        const game = room.game;
        game.suit = suit;
        game.state = "choosingTalon";

        updateClients("showTalon", game.playerPlaying, game.deck, room);
    });

    socket.on('talonChosen', (index) => {
        const room = rooms[socket.roomId];
        const game = room.game;

        let picked = game.deck.cards.splice(index, 4 - game.type);
        game.talonChosen(picked, socket.relativeId);

        socket.emit('putDown', game.players[socket.relativeId].hand.cards);    
    });

    socket.on('talonDown', (hand, pot) => {
        const room = rooms[socket.roomId];
        const game = room.game;

        game.cardsDown(socket.relativeId, hand, pot);

        updateClients("timeForCards", game.startingPlayer, 0, room);
    });

    socket.on('cardPlayed', (cardIndex) => {
        const room = rooms[socket.roomId];
        const game = room.game;

        game.cardPlayed(cardIndex, socket.relativeId);
        let pot = game.pot;

        updateClients("cardPlayed", game.getTurn(), pot, room);

        if(game.turn == 4) {
            let winner = game.getWinner();
            console.log("the winner is: ", winner);

            if(game.type == 5 && winner == game.playerPlaying.relativeId) {
                gameOver(room, false);
            } 

            takePot(winner, pot, room);
            if(game.round > 11) {
                gameOver(room, true);
            }
        }
    });

    socket.on('disconnect', () => {
        console.log(socket.id, 'has disconnected.');
        socket.emit('dis', socket.id, socket.roomId);
        socket.removeAllListeners();
        socket.leave(socket.roomId);
    });

    // to avoid memory leaks
    return () => {
    };
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});