import React from "react";

export default function GameInfo(props) {
    let gameType = props.gameType;
    let game = "";

    if(props.players.length > 0) {
        var players = props.players.map((username, index) => {
            return(
                <div className="col-3" key={index}>
                    <div className="card p-1 text-center">
                        <h3>{username}</h3>
                    </div>
                </div>
            );
        });
    }

    if(props.scores.length != 0) {
        var scores = props.scores.map((score, index) => {
            return(
                <div className="col-3" key={index}>
                    <p>Score: {score}</p>
                </div>
            );
        });
    }
    switch (gameType) {
        case 1:
            game = "Tri";
            break;
        case 2:
            game = "Dva";
            break;
        case 3:
            game = "Ena";
            break;
        case 5:
            game = "Solo brez";
            break;
        case 7:
            game = "Berač";
            break;
        case 8:
            game = "Odprti berač";
            break;
        default:
            break;
    }

    return(
        <>
            <div className="row">
                <h3>Miza: {props.roomId}</h3>
                <h4>Igra: {game}</h4>
            </div>
            <div className="row g-1">   
                {players}
            </div>
            <div className="row">
                {scores}
            </div>
        </>
    )
}