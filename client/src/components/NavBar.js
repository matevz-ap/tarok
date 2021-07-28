import React from "react";

export default function NavBar(props) {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img className="logo" src="/img/playing-cards.png" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/">Domov</a>
                        </li>
                    </ul>
                    {/*
                    <div className="nav-item">
                        <a className="nav-link" aria-current="page" href="uporabnik">mtx</a>
                    </div>
                    */}
                </div>
            </div>
        </nav>
    );
}