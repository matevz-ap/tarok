import React from "react";

function GameChoiceComponent(props) {

  const socket = props.socket;

  function gameChosen(index) {
    if(props.myTurn) {
      socket.emit("gameChosen", index);
    }
    else console.log("not a valid game choice");
  }
  if (props.gameState != "choosingGame") {
    return (
      <p></p>
    );
  }
  else {
    return (
      <div className="btn-group">
        <button className="btn btn-success" onClick={() => gameChosen(1)}>3</button>
        <button className="btn btn-success" onClick={() => gameChosen(2)}>2</button>
        <button className="btn btn-success" onClick={() => gameChosen(3)}>1</button>
        <button className="btn btn-success" onClick={() => gameChosen(4)}>Solo brez talona</button>
        <button className="btn btn-success" onClick={() => gameChosen(5)}>berač</button>
      </div>
    )
  }
}
export default GameChoiceComponent;