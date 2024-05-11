import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';
import { Link } from 'react-router-dom';

function ProductDetail() {
  let { Name } = useParams();
  const [product, setProduct] = useState([]);
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:2001/products/${Name}`).then((response) => {
      setProduct(response.data);
    });
  }, [Name]);
  // console.log(product);
  useEffect(() => {
    if (product.ID) {
      axios.get(`http://localhost:2001/transactions/Sell/${product.ID}`).then((response) => {
        setTransaction(response.data);
      });
    }
  }, [product.ID]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='product-detail-page'>
      <div className="product-detail">
        <h2>{product.Name}</h2>
        <div className="info-item">
          <img src = ""></img>
          <div className="info-item">
            {product.ModRank !== null && (
              <div className="modrank"> Mod Rank: {product.ModRank}</div>
            )}
          </div>
          <div className="info-item">
            {product.Rarity && (
              <div className="rarity"> Rarity: {product.Rarity}</div>
            )}
          </div>
          <div className="info-item">
            {product.Duncat && (
              <div className="duncat"> Duncat: {product.Duncat}</div>
            )}
          </div>
          <div className="info-item">
            {product.MasteryRank && (
              <div className="masteryrank">
                Mastery Rank: {product.MasteryRank}
              </div>
            )}
          </div>
          <div className="info-item">
            Tax: {product.Tax}
          </div>
        </div>
      </div>
      <div className="list-of-transactions">
        {transaction.length > 0 ? (
          transaction.map(transaction => (
            <li key={transaction.id}>
              Customer Name: {transaction.User.Name} - 
              Status: {transaction.User.Status} -
              Reputation: {transaction.User.Reputation} -
              Price: {transaction.Price}p -
              Quantity: {transaction.Quantity}
            </li>
          ))
        ) : (
          <div>No transactions found</div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
