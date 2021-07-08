import React, { useState } from "react";
import { useHistory, BrowserRouter as Router, Route } from "react-router-dom";
import socketIOClient from "socket.io-client";

import GameComponent from "./components/GameComponent";
import HandComponent from "./components/HandComponent";
import Home from "./components/Home";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";

const ENDPOINT =
  process.env.NODE_ENV === 'production'
    ?  window.location.hostname
    : 'http://localhost:3001';

const socket = socketIOClient(ENDPOINT);

export default function App() {
  let history = useHistory();

  return (
    <Router>
      <div className="App">
        <div>
          <NavBar />
        </div>
        <div>
          <Route
            exact
            path="/"
            render={(props) => <Home socket={socket} />}
          />
          <Route
            path="/game"
            render={(props) => <GameComponent socket={socket} />}
          />
        </div>
      </div>
    </Router>
  );
}
