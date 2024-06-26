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
import midenlacdit from "../../assets/quickbuy.webp";

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
  const modifiedName = '';
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
                    src={`/item/${value.Type==='Mod' ? 'item-mods' : value.Type==='Weapon' ? 'item-weapon' : 'item-warframe'}/${value.Name.replace(/\s+/g, '_')}.webp`} />
                  <div className="product-name">{value.Name}</div>
                </div>
                <div className="info">
                  {value.ModRank !== null && (
                    <div className="info-item">
                      <div className="modrank"> Mod Rank: {value.ModRank}</div>
                    </div>
                  )}
                  {value.Rarity && (
                    <div className="info-item">
                      <div className="rarity"> Rarity: {value.Rarity}</div>
                    </div>
                  )}
                  {value.MasteryRank && (
                    <div className="info-item">
                      <div className="masteryrank">
                        {" "}
                        Mastery Rank: {value.MasteryRank}
                      </div>
                    </div>
                  )}
                  {value.Duncat && (
                    <div className="info-item-ducat">
                      <img className="ducat" src={`/item/icon/ducat.webp`}/>
                      <div className="ducat" >{value.Duncat}</div>
                    </div>
                  )}
                  <div className="info-item">Trading Tax: <img className="ducat" src={`/item/icon/credits.webp`}/> {value.Tax}</div>
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
