import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="homeContainer">
      <header className="masthead">
      <div className="image"></div>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 text-center">
              <h1 className="font-weight-bold">Welcome to SoccerLand!</h1>
              <h3 className="lead">
              Football isn’t just about the game on the field. It’s about leadership and teamwork.
              </h3>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;

