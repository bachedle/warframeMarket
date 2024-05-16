import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./subpage.css";
import "../home-page/HomePage.css";
import axios from "axios";

function ModPage() {
  const [listOfProducts, setListOfProducts] = useState([]);
  useEffect(
    () => {
      axios.get(`http://localhost:2001/products/Mod`).then((response) => {
        setListOfProducts(response.data);
      });
    },
    []
  );

  return (
    <div className="subPage">
      <div className="modImage"></div>
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

export default ModPage;
