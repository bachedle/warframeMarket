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
        <div className='header-name'>{product.Name}</div>
        <div className="info-container">
          <img src="" alt="Product Image" />
          <div className="info-items">
            {product.ModRank !== null && (
              <div className="info-item">
                Mod Rank: {product.ModRank}
              </div>
            )}
            {product.Rarity && (
              <div className="info-item">
                Rarity: {product.Rarity}
              </div>
            )}
            {product.Duncat && (
              <div className="info-item">
                Duncat: {product.Duncat}
              </div>
            )}
            {product.MasteryRank && (
              <div className="info-item">
                Mastery Rank: {product.MasteryRank}
              </div>
            )}
            <div className="info-item">
              Tax: {product.Tax}
            </div>
          </div>
        </div>
      </div>
      <div className="transaction-lists">
        <div className="productList">
          <h3 className='buy'>BUY</h3>
          {transaction.length > 0 ? (
            transaction.map(transaction => (
              <div className="transaction-item" key={transaction.id}>
                <div>Customer Name: {transaction.User.Name}</div>
                <div>Status: {transaction.User.Status}</div>
                <div>Reputation: {transaction.User.Reputation}</div>
                <div>Price: {transaction.Price}p</div>
                <div>Quantity: {transaction.Quantity}</div>
              </div>
            ))
          ) : (
            <div>No buy transactions found</div>
          )}
        </div>
        <div className="productList">
          <h3 className='sell'>SELL</h3>
          {transaction.length > 0 ? (
            transaction.map(transaction => (
              <div className="transaction-item" key={transaction.id}>
                <div>Customer Name: {transaction.User.Name}</div>
                <div>Status: {transaction.User.Status}</div>
                <div>Reputation: {transaction.User.Reputation}</div>
                <div>Price: {transaction.Price}p</div>
                <div>Quantity: {transaction.Quantity}</div>
              </div>
            ))
          ) : (
            <div>No sell transactions found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
