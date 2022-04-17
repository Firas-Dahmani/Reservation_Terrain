import React from "react";
import { Link } from "react-router-dom";
import HomeCss from "./Home.module.css";
import BannerImage from "../../assets/terrain.jpg";

function Home() {
  return (
    <div className={HomeCss.home} style={{ backgroundImage: `url(${BannerImage})`   }}>
      <div className={HomeCss.headerContainer}>
        <h1 style={{ fontWeight: "bold" }}> Réservation du terrain </h1>
        <p>reservation AT A CLICK</p>
        <Link to="/about">
          <button> ORDER NOW </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;

