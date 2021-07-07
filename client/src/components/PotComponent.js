import React from "react";

function PotComponent(props) {
    if(props.pot != null && props.pot.length != 0) {
        var pot = props.pot.map((card, index) => {
            if(card != null && card != 0) {
                return(
                    <div className="col" key={index}>
                    <img src={"/img/cards/" + card.suit + card.value + ".jpg"} height="200px"/>
                    </div>
                );
            }
            else {
                return(
                    <div className="col" key={index}>
                    
                    </div>
                );
            }
        });
    }

    return(
        <div className="row">{pot}</div>
    )
}
export default PotComponent;