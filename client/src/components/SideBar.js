import React from "react";

import "../styles/SideBar.css";

function SideBar(props) {
    return (
        <div className="sidebar collapse d-flex flex-column flex-shrink-0 bg-dark" id="navbarToggleExternalContent">
            <a href="/" className="d-block p-3 text-decoration-none text-center" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
                <img className="logo" src="/img/playing-cards.png" />
                <span className="visually-hidden">Icon-only</span>
            </a>
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                <li className="nav-item">
                    <a href="#" className="nav-link py-3" aria-current="page" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
                    <i className="bi bi-suit-club color-success"></i>
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link py-3" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
                    <i className="bi bi-suit-club"></i>
                    </a>
                </li>
                <li>
                    <a href="joinGame" className="nav-link py-3" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="CreateGame">
                    <i className="bi bi-plus-square-fill"></i>
                    </a>
                </li>
            </ul>
            <div className="dropdown border-top">
                <a href="#" className="d-flex align-items-center justify-content-center p-3 link-light text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Sartre_1967_crop.jpg" alt="mdo" width="35" height="35" className="rounded-circle" />
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
                    <li><a className="dropdown-item" href="#">Profil</a></li>
                    <li><a className="dropdown-item" href="#">Odjava</a></li>
                </ul>
            </div>
        </div>
    );
}
export default SideBar;