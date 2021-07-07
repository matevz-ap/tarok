import React, { useEffect, useState } from "react";
import HandComponent from "./HandComponent";
import GameChoiceComponent from "./GameChoiceComponent";
import SuitComponent from "./SuitComponent";
import PotComponent from "./PotComponent";
import TalonComponent from "./TalonComponent";
import GameInfo from "./GameInfo";
import { useHistory } from "react-router-dom";

import "../styles/GameComponent.css";

export default function GameComponent(props) {
    const [players, setPlayers] = useState([]);
    const [hand, setHand] = useState([]);
    const [pot, setPot] = useState([]);
    const [talon, setTalon] = useState([]);
    const [showReadyButton, setReadyButton] = useState(true);
    const [myTurn, setMyTurn] = useState(false);
    const [gameState, setGameState] = useState("");
    const [gameType, setGameType] = useState(0);
    const [roomId, setRoomId] = useState("");
    const [undefRoom, setUndefRoom] = useState(false);
    const [scores, setScores] = useState([]);

    let socket = props.socket;
    let localStorage = window.localStorage;
    let history = useHistory();

    useEffect(() => {
        socket.on("connected", () => {
            if(localStorage.getItem("roomId") != undefined) {
                console.log(Number(getItemFromLocal("roomId")));
                socket.emit("reconnect", getItemFromLocal("roomId"), getItemFromLocal("socketId"));
            }
        });
        socket.on("joinedRoom", (roomId, players) => {
            console.log(socket.id);
            setRoomId(roomId);
            setPlayers(players);
            localStorage.setItem("roomId", roomId);
            localStorage.setItem("socketId", socket.id); 
        });
        socket.on("rejoinedRoom", (roomId, players, state, hand, game, talon, turn, pot) => {
            setGameState(state);
            setRoomId(roomId);
            setPlayers(players);
            setMyTurn(turn);
            setHand(hand);
            setGameType(game);
            setTalon(talon);
            setPot(pot);
        });
        socket.on("undefinedRoom", () => {
            setUndefRoom(true);
            console.log("undefined room");
        });
        socket.on("handDealt", (turn, hand) => {
            setGameState("choosingGame");
            setHand(hand);
            setTalon(talon);
            setMyTurn(turn);
            setScores([0, 0, 0, 0]);
            setReadyButton(false); 
        });
        socket.on("gameChosen", (turn, game) => {
            setGameType(game);
            setMyTurn(turn);
        });
        socket.on("chooseSuit", () => {
            setGameState("choosingSuit");
            setMyTurn(true);
        });
        socket.on("showTalon", (choosing, talon) => {
            setGameState("choosingTalon");
            console.log(talon);
            setTalon(talon);
            setMyTurn(choosing);
        });
        socket.on("putDown", (hand) => {
            setGameState("puttingDown");
            setMyTurn(true);
            setHand(hand);    
        });
        socket.on("timeForCards", (turn) => {
            setGameState("timeForCards");
            setMyTurn(turn);
        });
        socket.on("cardPlayed", (turn, pot) => {
            setPot(pot);
            setMyTurn(turn);
        });
        socket.on("potTaken", (turn, pot) => {
            setPot([]);
            console.log("potTaken");
            setMyTurn(turn);
        });
        socket.on("gameOver", (turn, scores) => {
            setScores(scores);
            console.log(scores);
        });
        socket.on('dis', (roomId, socketId) => {
            socket.removeAllListeners();
        });

        // to avoid memory leaks
        return () => {
            /*lahko tudi vse na setBlabla({});
            setPlayers([]);
            setHand([]);
            setPot([]);
            setTalon([]);
            setScores([]);
            setRoomId("");
            setGameType(0);*/
        };
    }, []);

    function ready() {
        console.log("ready ",showReadyButton);
        socket.emit("ready");
        setReadyButton(false);
    }

    function home() {
        history.push("/");
    }
  
    function getItemFromLocal(item) {
        return localStorage.getItem(item);
    }

    return (
        <>
        <div className="container overflow-hidden p-3">
        <GameInfo roomId={roomId} players={players} scores={scores} />
        <div>
            <button className={showReadyButton ? '' : 'hidden'} onClick={ready} id="startGame">
            Start
            </button>
        </div>
        <p>{myTurn ? 'Ti si na vrsti' : 'Nisi na vrsti'}</p>
        <div className="text-center">
            <GameChoiceComponent myTurn={myTurn} gameState={gameState} socket={socket}/>
        </div>
        <div className="text-center mt-3">
            <SuitComponent gameState={gameState} socket={socket}/>
        </div>
        <div className="text-center">
            <TalonComponent gameState={gameState} talon={talon} gameType={gameType} myTurn={myTurn} socket={socket} />
        </div>
        <div>
            <PotComponent pot={pot} />
        </div>
        </div>
        <HandComponent hand={hand} pot={pot} myTurn={myTurn} gameState={gameState} gameType={gameType} socket={socket} />
        </>
    );
}