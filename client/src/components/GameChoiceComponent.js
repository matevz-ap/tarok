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
      <div className="container">
        <div className="d-grid gap-2 d-flex flex-wrap justify-content-center">
          <button className="btn btn-success btn-lg" onClick={() => gameChosen(1)}>3</button>
          <button className="btn btn-success btn-lg" onClick={() => gameChosen(2)}>2</button>
          <button className="btn btn-success btn-lg" onClick={() => gameChosen(3)}>1</button>
          <button className="btn btn-success btn-lg" onClick={() => gameChosen(5)}>Solo brez</button>
          <button className="btn btn-success btn-lg" onClick={() => gameChosen(7)}>Berač</button>
          <button className="btn btn-success btn-lg" onClick={() => gameChosen(8)}>Odprti berač</button>
        </div>
      </div>
    )
  }
}
export default GameChoiceComponent;