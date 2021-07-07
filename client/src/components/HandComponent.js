import React from "react";

import "../styles/HandComponent.css";

function HandComponent(props) {

    const socket = props.socket;
    const pot = props.pot;
    const gameType = props.gameType;

    var hand = props.hand;
    var playerPot = [];
    var numOfCardsDown = gameType;
    var msg;

    function validMoves() {
        let sameSuit = []; 
        let taroks = [];
        let other = [];
        let validMoves = []; 

        if(pot[0] == null) return hand;
        for(let i = 0; i < hand.length; i++) {
            let card = hand[i];
            if(card.suit == pot[0].suit) sameSuit.push(card);
            else if(card.suit == "T") taroks.push(card);
            else other.push(card);
        }

        if(sameSuit.length == 0) {
            if(taroks.length == 0) return other;
            else validMoves = taroks;
        }
        else validMoves = sameSuit; 

        if(gameType == 5) { //berač
            let berac = []; //hrani validne poteze 
            for(let i = 0; i < validMoves.length; i++) {
                let card = validMoves[i];
                if(card.value > pot[pot.length-1].value) {
                    berac.push(card);
                }
            }
            if(berac.length) return validMoves; //če nimam
        }

        return validMoves;
    }

    var validMoves = validMoves();

    function cardPlayed(index) {
        if(props.gameState == "timeForCards" && props.myTurn && validMoves.some(card => card === hand[index])) {
            socket.emit("cardPlayed", index);
            hand.splice(index, 1);
        }
        else console.log("not a valid move");
    }

    function putDown(index) {
        if(props.myTurn) {
            if(numOfCardsDown < 3) { //needs to check for valid moves
                numOfCardsDown++;
                hand.splice(index, 1);
            }
            else {
                console.log("in");
                hand.splice(index, 1);
                console.log(hand);
                socket.emit("talonDown", hand, playerPot);
            }
        }
    }

    if (hand !== undefined && hand.length != 0) {
        var handDiv = hand.map((card, index) => {
            if(props.gameState == "puttingDown") {
                return(
                    <div className="col" key={index}>
                        <div className="card" onClick={() => putDown(index)}>
                            <img className="handImg" src={"/img/cards/" + card.suit + card.value + ".jpg"} alt="handCard" />
                        </div>
                    </div>
                );
            }
            else {
                return(
                    <div className="col" key={index}>
                        <div className="card" onClick={() => cardPlayed(index)}>
                            <img className="handImg" src={"/img/cards/" + card.suit + card.value + ".jpg"} alt="handCard" />
                        </div>
                    </div>
                );
            }
        });
    }

    if(props.gameState != "puttingDown") {
        msg = <p></p>;
    }
    else {
        msg = <p>Izberi {4 - gameType} kart, ki jih boš založil</p>;
    }

    if (hand === undefined || hand.length == 0) {
        return (
            <p></p>
        );
    }
    else {
        return (
            <div className="row justify-content-center m-0">
                <div>{msg}</div>
                <div className="row row-cols-6 row-cols-lg-auto justify-content-center g-1 hand">{handDiv}</div>
            </div>
        );
    }
}
export default HandComponent;