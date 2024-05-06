import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';
import { Link } from 'react-router-dom';


function ProductDetail() {
  let { Name } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:2001/products/${Name}`).then((response) => {
      setProduct(response.data);
    });
  }, [Name]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='food-detail-container1'>
      <div className="food-detail-container">
          <h2>{product.Name}</h2>
        <div className="info-item">
            <div className="info-item">
            {/* <img className="nutrition-icon" src={caloriesIcon} alt="Calories" /> */}
            {product.ModRank !== null && (
                <div className="modrank"> Mod Rank: {product.ModRank}</div>
            )}
            </div>
            <div className="info-item">
            {/* <img className="nutrition-icon" src={proteinIcon} alt="Protein" /> */}
            {product.Rarity && (
                <div className="rarity"> Rarity: {product.Rarity}</div>
            )}
            </div>
            <div className="info-item">
            {/* <img className="nutrition-icon" src={carbIcon} alt="Carb" /> */}
            {product.Duncat && (
                <div className="duncat"> Duncat: {product.Duncat}</div>
            )}
            </div>
            <div className="info-item">
            {/* <img className="nutrition-icon" src={fatIcon} alt="Fat" /> */}
            {product.MasteryRank && (
                <div className="masteryrank">
                {" "}
                Mastery Rank: {product.MasteryRank}
                </div>
            )}
            </div>
            <div className="info-item">
            Tax: {product.Tax}
            </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
