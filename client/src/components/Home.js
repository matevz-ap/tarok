import React from "react";
import { useHistory } from "react-router-dom";

export default function Home(props) {

    let socket = props.socket;
    let history = useHistory();

    function createGame(event) {
        let username = event.target.username.value;
        socket.emit("createNewGame", username);
        history.push("/game");
    }

    function joinGame(event) {
        event.preventDefault();
        let gameId = event.target.joinGameId.value;
        let username = event.target.username.value;
        socket.emit("joinGame", gameId, username);
        history.push("/game");
    }
    
    return (
        <>
        <div className="Homepage container p-3">
            <h1 className="pb-2">Pagat.si</h1>
            <div className="row gap-3">
                <div className="col-12 col-lg-6 border p-3">
                    <h3>Ustvari igro</h3>
                    <form onSubmit={createGame.bind(this)} className="text-center">
                        <div className="row">
                            <div className="col-6">
                                <input id="username" className="form-control" type="text" placeholder="Vzdevek"/>
                            </div>
                            <div className="col-6">
                                <button type="submit" id="joinGame" className="btn btn-outline-success">
                                    Ustvari igro
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col border p-3">
                    <h3>Pridruži se igri</h3>
                    <form onSubmit={joinGame.bind(this)} className="text-center">
                        <div className="row">
                            <div className="col-6">
                                <input id="joinGameId" className="form-control" type="text" placeholder="Id igre"/>
                            </div>
                            <div className="col-6">
                                <input id="username" className="form-control" type="text" placeholder="Vzdevek"/>
                            </div>
                        </div>
                        <button type="submit" id="joinGame" className="btn btn-outline-success mt-3">
                            Pridruži se igri
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

