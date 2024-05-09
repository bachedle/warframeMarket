import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./subpage.css";
import axios from "axios";

function ModPage() {
  const [postObject, setPostObject] = useState([]);
  useEffect(
    () => {
      axios.get(`http://localhost:2001/products/Mod`).then((response) => {
        setPostObject(response.data);
      });
    },
    [
      /*id*/
    ]
  );

  return (
    <div className="subPage">
      <div className="modImage"></div>
      <div className="productList">
        {postObject.map((value, key) => (
          <div className="productCapsule">
            <Link to={`/${value.Name}`} className="Product-card-link">
              <div className="name"> {value.Name}</div>
              <div className="type"> {value.Type}</div>
              {value.ModRank !== null && (
                <div className="modrank"> Mod Rank: {value.ModRank}</div>
              )}
              {value.Rarity && (
                <div className="rarity"> Rarity: {value.Rarity}</div>
              )}
              {value.Duncat && (
                <div className="duncat"> Duncat: {value.Duncat}</div>
              )}
              {value.MasteryRank && (
                <div className="masteryrank">
                  {" "}
                  Mastery Rank: {value.MasteryRank}
                </div>
              )}
              <div className="tax"> Tax: {value.Tax}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModPage;
