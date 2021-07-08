var Deck = require('./Deck.js');
var Player = require('./Player.js');
var Hand = require('./Hand.js');

module.exports = class Game {
    constructor() {
        this.players = [];
        this.deck = new Deck();
        this.pot = new Array(4);
        this.startingPlayer = 0;
        this.state = "";
        this.round = 0; 
        this.turn = 0; //koliko kart je bilo igranih
        this.type = 0; //tip igre ki se igra (berač, solo, ...)
        this.suit = 0;
        this.partner = 0;
    }

    newPlayer(id, name) {
        this.players.push(new Player(id, name));
    }

    getPlayerNames() {
        let names = [];
        for(const player of this.players) {
            names.push(player.name);
        }
        return names;
    }

    getScores() {
        let scores = [];
        for(const player of this.players) {
            scores.push(player.score);
        }
        return scores;
    }

    getTurn() { //returns index of player who's turn it is
        let turn = (this.startingPlayer + this.turn) % 4;
        console.log(turn);
        return turn;
    }

    dealCards() {
        for(const player of this.players) {
            player.hand = new Hand();
            for(let i = 0; i < 12; i++) {
                player.hand.drawCard(this.deck.drawCard());
            }
            player.hand.sort(0);
        }
        this.state = "choosingGame";
    }

    startGame(playerIndex) {
        this.deck.build();
        this.deck.shuffle();
        this.startingPlayer = playerIndex;
        this.playerPlaying = playerIndex;
        this.pot = new Array(4);

        this.dealCards();
    }

    gameChosen(chosenGame, playerIndex) {
        this.turn++;
        if(chosenGame > this.type) { //checks if the chosen game is more valuable then 
            this.type = chosenGame;
            this.playerPlaying = playerIndex;
        }

        if(this.turn == 4) {
            if(this.type < 5) {
                this.state = "choosingSuit";
                this.turn = 0; 
            }
            else { //no clue kaj bo kle
                this.startingPlayer = socket.relativeId;
                updateClients("timeForCards", game.playerPlaying, 0, room);
            }
        }
    }

    talonChosen(talon, playerIndex) {
        this.players[playerIndex].takeTalon(talon);
        for(const card of talon) {
            if(card.value == 8 && card.suit == this.suit) {
                this.partner = playerIndex;
            }
        }
        this.gameState = "putDown";
    }

    cardsDown(playerIndex, hand, pot) {
        this.potTaken(pot, playerIndex);
        const player = this.players[playerIndex];
        player.hand.cards = hand;
        player.myTurn = false;

        this.state = "timeForCards";
    }

    potTaken(pot, playerIndex) {
        this.players[playerIndex].pot.take(pot);
    }

    cardPlayed(cardIndex, playerIndex) {
        let card = this.players[playerIndex].playCard(cardIndex);
        if(card.value == 8 && card.suit == this.suit) {
            this.partner = playerIndex;
        }
        this.pot[playerIndex] = card;
        this.turn++;
    }

    getWinner() {
        if(this.type < 6) {
            let winner = this.startingPlayer;
            let topCard = this.pot[winner];
            for(let i = 1; i < 4; i++) {
                let relativeId = (i + this.startingPlayer) % 4;
                let card = this.pot[relativeId];
                if (card.suit == topCard.suit) {
                    if (card.value > topCard.value) {
                        topCard = card;
                        winner = relativeId;
                    }
                }
                else if(card.suit == "T") {
                    topCard = card;
                    winner = relativeId;  
                }
            }
            this.startingPlayer = winner;
            this.turn = 0;
            this.round++;
            this.pot = new Array(4);
            return winner;
        }
        else { //implementacija za zmagovalca berača
            return 0;
        }
    }

    addGameValue(score) {
        if(score > 0) score += this.type * 10;
        else score -= this.type * 10;
        return score
    }

    gameOver(success) {
        let score = 0;
        //let maxScore = 71;
        let border = 35; //minimalno tock za zmago
        let partner = this.players[this.partner];
        let playerPlaying = this.players[this.playerPlaying];

        if(this.type < 5) {
            if(this.partner == this.playerPlaying) {
                score = playerPlaying.pot.count() - border;
                score = this.addGameValue(score);

                playerPlaying.score += score;
            }
            else {
                score = partner.pot.count() + playerPlaying.pot.count() - border;
                this.addGameValue(score);

                partner.score += score;
                playerPlaying.score += score;
            }
        }
        else if(this.type == 5) {
            if(success) score = 70;
            else score = -70;

            playerPlaying.score += score;
        }
    }
}