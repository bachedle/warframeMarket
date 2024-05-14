import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./subpage.css";
import "../home-page/HomePage.css";
import axios from "axios";

function WeaponPage() {
  const [listOfProducts, setListOfProducts] = useState([]);
  useEffect(
    () => {
      axios.get(`http://localhost:2001/products/Weapon`).then((response) => {
        setListOfProducts(response.data);
      });
    },
    []
  );

  return (
    <div className="subPage">
      <div className="weaponImage"></div>
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

export default WeaponPage;
