import React, { useState } from "react";
import { useHistory, BrowserRouter as Router, Route } from "react-router-dom";
import socketIOClient from "socket.io-client";

import ClientComponent from "./components/GameComponent";
import HandComponent from "./components/HandComponent";
import Home from "./components/Home";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";

21721
const ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? "http://localhost:21721"
    : "http://localhost:3001";

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
            render={(props) => <ClientComponent socket={socket} />}
          />
        </div>
      </div>
    </Router>
  );
}
