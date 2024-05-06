import React, { useEffect, useState } from "react";
// import { useParams }  from 'react-router-dom'
import axios from "axios";
import "../home-page/HomePage.css";
import "../search-section/SearchSection.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./HomePage.css";
import warframeImg from "../../assets/gauss.png";
import weaponImg from "../../assets/AcceltraPrime.webp";
import modImg from "../../assets/mod.webp";
import midenlacdit from "../../assets/platinum.webp";

function HomePage() {
  // let { id } = useParams();
  const [listOfProducts, setListOfProducts] = useState([]);
  useEffect(
    () => {
      axios.get(`http://localhost:2001/products`).then((response) => {
        setListOfProducts(response.data);
      });
    },
    [
      /*id*/
    ]
  );
  return (
    <div className="homepage">
      <div className="homeContainer">
        <div className="searchCategory">
          <Link to="/Warframe" className="searchbutt">
            <img src={warframeImg} className="img"></img>
            Warframe
          </Link>
        </div>

        <div className="searchCategory">
          <Link to="/Weapons" className="searchbutt">
            <img src={weaponImg} className="img"></img>
            Weapons
          </Link>
        </div>
        <div className="searchCategory">
          <Link to="/Mod" className="searchbutt">
            <img src={modImg} className="img"></img>
            Mods
          </Link>
        </div>

        <div className="searchCategory">
          <Link to="/PlaceOrder" className="searchbutt">
            <img src={midenlacdit} className="img"></img>
            search
          </Link>
        </div>
      </div>

      <div className="productList">
      {listOfProducts.map((value, key) => (
          <div className="product-card" key={key}>
            <Link to={`/${value.Name}`} className="Product-card-link">
              <div className="product-image-container">
                {/* <img className="product-image" src={getImageUrl(value.Name)} alt="Product" /> */}
              </div>
              <div className="product-details">
                <div className="product-name">{value.Name}</div>
                <div className="info">
                  <div className="info-item">
                    {/* <img className="nutrition-icon" src={caloriesIcon} alt="Calories" /> */}
                    {value.ModRank !== null && (
                      <div className="modrank"> Mod Rank: {value.ModRank}</div>
                    )}
                  </div>
                  <div className="info-item">
                    {/* <img className="nutrition-icon" src={proteinIcon} alt="Protein" /> */}
                    {value.Rarity && (
                      <div className="rarity"> Rarity: {value.Rarity}</div>
                    )}
                  </div>
                  <div className="info-item">
                    {/* <img className="nutrition-icon" src={carbIcon} alt="Carb" /> */}
                    {value.Duncat && (
                      <div className="duncat"> Duncat: {value.Duncat}</div>
                    )}
                  </div>
                  <div className="info-item">
                    {/* <img className="nutrition-icon" src={fatIcon} alt="Fat" /> */}
                    {value.MasteryRank && (
                      <div className="masteryrank">
                        {" "}
                        Mastery Rank: {value.MasteryRank}
                      </div>
                    )}
                  </div>
                  <div className="info-item">
                    Tax: {value.Tax}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
