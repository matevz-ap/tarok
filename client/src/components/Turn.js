import React from "react";

export default function Turn(props) {
    if(props.myTurn) {
        var i = 200;

        var counterBack = setInterval(function () {
        i--;
        if (i > -1) {
            $('.progress').css('width', i + '%');
        } else {
            clearInterval(counterBack);
        }

        }, 500);

        return(
            <div class="progress bg-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        )
    } 
    else {
        return(
            <></>
        )
    }

}