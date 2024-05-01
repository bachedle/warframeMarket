import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfProducts, setListOfProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products data
  useEffect(() => {
    axios
      .get("http://localhost:2001/products")
      .then((response) => {
        setListOfProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <div className="listOfProducts">
        {listOfProducts.map((value, key) => (
          <div
            className="product"
            key={key}
            onClick={() => navigate(`/Product/${value.id}`)}
          >
            <br />
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
