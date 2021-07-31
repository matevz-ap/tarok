import React, { useEffect, useState } from "react";

function GameChoiceComponent(props) {

    const [error, setError] = useState(""); 

    const socket = props.socket;
    var msg;

    function gameChosen(index) {
        if(props.myTurn) { 
            if(index > props.gameType) {
                socket.emit("gameChosen", index);
            }
            else { //chossen game is not valid (too low)
                setError("tooLow");
            }
        }
        else console.log("not a valid game choice");
    }

    if(error == "tooLow") {
        msg = <div className="alert alert-danger" role="alert">Prosim izberi veljavno igro</div>;
    }
    else {
        msg = <div></div>;
    }

    if(props.gameState != "choosingGame") {
        return (
            <p></p>
        );
    }
    else {
        return (
        <div className="container">
            {msg}
            <div className="d-grid gap-2 d-flex flex-wrap justify-content-center">
                <button className="btn btn-success btn-lg" onClick={() => gameChosen(1)}>3</button>
                <button className="btn btn-success btn-lg" onClick={() => gameChosen(2)}>2</button>
                <button className="btn btn-success btn-lg" onClick={() => gameChosen(3)}>1</button>
                <button className="btn btn-success btn-lg" onClick={() => gameChosen(5)}>Solo brez</button>
                <button className="btn btn-success btn-lg" onClick={() => gameChosen(7)}>Berač</button>
                <button className="btn btn-success btn-lg" onClick={() => gameChosen(8)}>Odprti berač</button>
                <button className="btn btn-outline-success btn-lg" onClick={() => gameChosen(100)}>Naprej</button>
            </div>
        </div>
        )
    }
}
export default GameChoiceComponent;