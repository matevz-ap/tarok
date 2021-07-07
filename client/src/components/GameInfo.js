import React from "react";

function GameInfo(props) {
    if(props.players.length > 0) {
        var players = props.players.map((username, index) => {
            return(
                <div className="col-3" key={index}>
                    <div className="card p-2 text-center">
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

    return(
        <>
            <div className="row">
                <h2>Room Id: {props.roomId}</h2>
            </div>
            <h3>Players:</h3>
            <div className="row">   
                {players}
            </div>
            <div className="row">
                {scores}
            </div>
        </>
    )
}
export default GameInfo;