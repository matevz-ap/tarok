import React from "react";

function SuitComponent(props) {

  const socket = props.socket;

  function suitChosen(index) {
    socket.emit("suitChosen", index); 
  }

  if (props.gameState != "choosingSuit") {
    return (
      <p></p>
    );
  }
  else {
    return (
      <div className="btn-group">
        <button className="btn btn-danger" onClick={() => suitChosen(0)}>
            <i className="bi bi-suit-heart-fill"></i>
        </button>
        <button className="btn btn-danger" onClick={() => suitChosen(1)}>
            <i className="bi bi-suit-diamond-fill"></i>
        </button>
        <button className="btn btn-dark" onClick={() => suitChosen(2)}>
            <i className="bi bi-suit-spade-fill color-dark"></i>
        </button>
        <button className="btn btn-dark" onClick={() => suitChosen(3)}>
            <i className="bi bi-suit-club-fill"></i>
        </button>
      </div>
    )
  }
}
export default SuitComponent;