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
        <button className="btn btn-danger" onClick={() => suitChosen("H")}>
            <i className="bi bi-suit-heart-fill"></i>
        </button>
        <button className="btn btn-danger" onClick={() => suitChosen("D")}>
            <i className="bi bi-suit-diamond-fill"></i>
        </button>
        <button className="btn btn-dark" onClick={() => suitChosen("S")}>
            <i className="bi bi-suit-spade-fill color-dark"></i>
        </button>
        <button className="btn btn-dark" onClick={() => suitChosen("C")}>
            <i className="bi bi-suit-club-fill"></i>
        </button>
      </div>
    )
  }
}
export default SuitComponent;