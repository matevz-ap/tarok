import React from "react";

export default function GameInfo(props) {
    let gameType = props.gameType;
    let suit = props.suit;

    let game = "";
    let suitIcon = <></>;

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

    //Displaying game name
    if(gameType == 1) game = "Tri";
    else if(gameType = 2) game = "Dva";
    else if(gameType = 3) game = "Ena";
    else if(gameType = 5) game = "Solo brez";
    else if(gameType = 6) game = "Pikolo";
    else if(gameType = 7) game = "Berač";
    else if(gameType = 8) game = "Odprti berač";
    else game = "Neznana igra";

    //Displaying game suit
    if(suit == "C") suitIcon = <i className="bi bi-suit-club-fill text-dark"></i>;
    else if(suit == "D") suitIcon = <i className="bi bi-suit-diamond-fill text-danger"></i>;
    else if(suit == "H") suitIcon = <i className="bi bi-suit-heart-fill text-danger"></i>;
    else if(suit == "S") suitIcon = <i className="bi bi-suit-spade-fill text-dark"></i>;

    return(
        <>
            <div className="row">
                <h3>Miza: {props.roomId}</h3>
                <h4>Igra: {game} {suitIcon}</h4>
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