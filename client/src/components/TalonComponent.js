import React from "react";

import "../styles/TalonComponent.css";

function TalonComponent(props) {

    const socket = props.socket;

    let talon = props.talon.cards;
    let gameType = props.gameType;

    function chooseTalon(index) {
        console.log(props.myTurn);
        if(props.myTurn) {
            socket.emit("talonChosen", index); 
        } 
    }

    function getSrc(card) {
        return "/img/cards/" + card.suit + card.value + ".jpg"
    }

    if(props.gameState != "choosingTalon" || talon == undefined || gameType > 3) {
        return(
            <></>
        )
    }
    else {
        switch (gameType) {
            case 1:
                return(
                    <div className="row">
                      <div className="col">
                        <img className="talon" src={getSrc(talon[0])} onClick={() => chooseTalon(0)} alt="talonCard" />
                        <img className="talon" src={getSrc(talon[1])} onClick={() => chooseTalon(0)} alt="talonCard" />
                        <img className="talon" src={getSrc(talon[2])} onClick={() => chooseTalon(0)} alt="talonCard" />
                      </div>
                      
                      <div className="col">
                        <img className="talon" src={getSrc(talon[3])} onClick={() => chooseTalon(3)} alt="talonCard" />
                        <img className="talon" src={getSrc(talon[4])} onClick={() => chooseTalon(3)} alt="talonCard" />
                        <img className="talon" src={getSrc(talon[5])} onClick={() => chooseTalon(3)} alt="talonCard" />
                      </div>
                    </div>
                )
            break;

            case 2:
                return(
                    <div className="row">
                      <div className="col">
                        <img className="talon" src={getSrc(talon[0])} onClick={() => chooseTalon(0)} alt="talonCard" />
                        <img className="talon" src={getSrc(talon[1])} onClick={() => chooseTalon(0)} alt="talonCard" />
                      </div>
                      <div className="col">
                        <img className="talon" src={getSrc(talon[2])} onClick={() => chooseTalon(2)} alt="talonCard" />
                        <img className="talon" src={getSrc(talon[3])} onClick={() => chooseTalon(2)} alt="talonCard" />
                      </div>
                      <div className="col">
                        <img className="talon" src={getSrc(talon[4])} onClick={() => chooseTalon(4)} alt="talonCard" />
                        <img className="talon" src={getSrc(talon[5])} onClick={() => chooseTalon(4)} alt="talonCard" />
                      </div>
                    </div>
                )
            break;

            case 3:
                return(
                    <div className="row">
                      <div className="col">
                        <img className="talon" src={getSrc(talon[0])} onClick={() => chooseTalon(talon[0])} alt="talonCard" />
                      </div>
                      <div className="col">
                        <img className="talon" src={getSrc(talon[1])} onClick={() => chooseTalon(talon[1])} alt="talonCard" />
                      </div>
                      <div className="col">
                        <img className="talon" src={getSrc(talon[2])} onClick={() => chooseTalon(talon[2])} alt="talonCard" />
                      </div>
                      <div className="col">
                        <img className="talon" src={getSrc(talon[3])} onClick={() => chooseTalon(talon[3])} alt="talonCard" />
                      </div>
                      <div className="col">
                        <img className="talon" src={getSrc(talon[4])} onClick={() => chooseTalon(talon[4])} alt="talonCard" />
                      </div>
                      <div className="col">
                        <img className="talon" src={getSrc(talon[5])} onClick={() => chooseTalon(talon[5])} alt="talonCard" />
                      </div>
                    </div>
                )
            break;
        
            default:
            break;
        }
    }
}
export default TalonComponent;