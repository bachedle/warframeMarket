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
                    <img className="product-image" src=''/*{getImageUrl(value.Name)}*/ />
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

export default ModPage;
