import React, { useEffect, useState } from "react";
// import { useParams }  from 'react-router-dom'
import axios from "axios";
import "../home-page/HomePage.css";
import "../search-section/SearchSection.css";
import { Link } from "react-router-dom";
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
            Quick buy
          </Link>
        </div>
      </div>
      <div className="productList">
        {listOfProducts.map((value, key) => (
          <div className="productCapsule" key={key}>
            <Link to={`/${value.Name}`} className="Product-card-link">
              <div className="product-details">
                <div className="img-name">
                  <img
                    className="product-image"
                    src="" /*{getImageUrl(value.Name)}*/
                  />
                  <div className="product-name">{value.Name}</div>
                </div>

                <div className="info">
                  {value.ModRank !== null && (
                    <div className="info-item">
                      {/* <img className="nutrition-icon" src={caloriesIcon} alt="Calories" /> */}
                      <div className="modrank"> Mod Rank: {value.ModRank}</div>
                    </div>
                  )}
                  {value.Rarity && (
                    <div className="info-item">
                      {/* <img className="nutrition-icon" src={proteinIcon} alt="Protein" /> */}
                      <div className="rarity"> Rarity: {value.Rarity}</div>
                    </div>
                  )}
                  {value.Duncat && (
                    <div className="info-item">
                      {/* <img className="nutrition-icon" src={carbIcon} alt="Carb" /> */}
                      <div className="duncat"> Duncat: {value.Duncat}</div>
                    </div>
                  )}
                  {value.MasteryRank && (
                    <div className="info-item">
                      {/* <img className="nutrition-icon" src={fatIcon} alt="Fat" /> */}
                      <div className="masteryrank">
                        {" "}
                        Mastery Rank: {value.MasteryRank}
                      </div>
                    </div>
                  )}
                  <div className="info-item">Tax: {value.Tax}</div>
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
