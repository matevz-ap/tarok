import React from "react";

import "../styles/Suit.css";

export default function SuitComponent(props) {

    const socket = props.socket;

    function suitChosen(suit) {
            if(props.myTurn) {
                socket.emit("suitChosen", suit); 
            }  
    }

    if (props.gameState != "choosingSuit") {
        return (
        <p></p>
        );
    }
    else {
        return (
        <div className="btn-group">
            <button className="btn btn-danger" onClick={() => suitChosen("H")}>
                <i className="bi bi-suit-heart-fill suitOption"></i>
            </button>
            <button className="btn btn-danger" onClick={() => suitChosen("D")}>
                <i className="bi bi-suit-diamond-fill suitOption"></i>
            </button>
            <button className="btn btn-dark" onClick={() => suitChosen("S")}>
                <i className="bi bi-suit-spade-fill suitOption"></i>
            </button>
            <button className="btn btn-dark" onClick={() => suitChosen("C")}>
                <i className="bi bi-suit-club-fill suitOption"></i>
            </button>
        </div>
        )
    }
}