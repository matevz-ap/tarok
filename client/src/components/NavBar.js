import React from "react";

function NavBar(props) {
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
                <div className="navbar-nav">
                    <a className="nav-link active" aria-current="page" href="/">Domov</a>
                {/*   <a className="nav-link" href="#">Test</a>
                    <a className="nav-link" href="#">Test</a> */}
                </div>
                </div>
            </div>
        </nav>
    );
}
export default NavBar;