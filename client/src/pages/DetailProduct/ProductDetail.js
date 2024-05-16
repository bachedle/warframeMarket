import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";
import { Link } from "react-router-dom";

function ProductDetail() {
  let { Name } = useParams();
  const [product, setProduct] = useState([]);
  const [transactionSell, setTransactionSell] = useState([]);
  const [transactionBuy, setTransactionBuy] = useState([]);
  const [popupUser, setPopupUser] = useState(null);
  const [popupPrice, setPopupPrice] = useState(null);
  const textRef = useRef(null);

  // Pop-up state for success/failure of transaction
  const [showPopupBuy, setShowPopupBuy] = useState(false);
  const [showPopupSell, setShowPopupSell] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:2001/products/${Name}`).then((response) => {
      setProduct(response.data);
    });
  }, [Name]);
  console.log(product);
  useEffect(() => {
    if (product.ID) {
      axios
        .get(`http://localhost:2001/transactions/Sell/${product.ID}`)
        .then((response) => {
          setTransactionSell(response.data);
        });
    }
  }, [product.ID]);

  useEffect(() => {
    if (product.ID) {
      axios
        .get(`http://localhost:2001/transactions/Buy/${product.ID}`)
        .then((response) => {
          setTransactionBuy(response.data);
        });
    }
  }, [product.ID]);
  // useEffect(() => {
  //   if (product.ID) {
  //     axios
  //       .get(`http://localhost:2001/transactions/Sell/${product.ID}`)
  //       .then((response) => {
  //         setTransaction(response.data);
  //       })
  //       .catch((error) => {
  //         if (error.response && error.response.status === 404) {
  //           // Product not found, navigate to 404 page
  //           history.push("/404");
  //         } else {
  //           // Handle other errors here
  //           console.error("Error fetching transaction:", error);
  //         }
  //       });
  //   }
  // }, [product.ID, history]);
  if (!product) {
    return <div>Loading...</div>;
  }

  const closePopups = () => {
    if (showPopupSell) {
      if (textRef.current) {
        navigator.clipboard.writeText(textRef.current.innerText);
      }
      setShowPopupSell(false);
    }
    if (showPopupBuy) {
      if (textRef.current) {
        navigator.clipboard.writeText(textRef.current.innerText);
      }
      setShowPopupBuy(false);
    }
  };

  return (
    <div className="product-detail-page" onClick={closePopups}>
      <div className="product-detail">
        <div className="header-name">{product.Name}</div>
        <div className="info-container">
          <img src="" alt="Product Image" />
          <div className="info-items">
            {product.ModRank !== null && (
              <div className="info-item">Mod Rank: {product.ModRank}</div>
            )}
            {product.Rarity && (
              <div className="info-item">Rarity: {product.Rarity}</div>
            )}
            {product.Duncat && (
              <div className="info-item">Duncat: {product.Duncat}</div>
            )}
            {product.MasteryRank && (
              <div className="info-item">
                Mastery Rank: {product.MasteryRank}
              </div>
            )}
            <div className="info-item">Tax: {product.Tax}</div>
          </div>
        </div>
        <div className="wiki-link">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a>
        </div>
      </div>
      <div className="transaction-lists">
        <div className="productList">
          <h3 className="buy">BUY</h3>
          {transactionBuy.length > 0 ? (
            transactionBuy.map((transactionBuy) => (
              <div
                className="transaction-item"
                key={transactionBuy.id}
                onClick={() => {
                  setShowPopupBuy(true);
                  setPopupUser(transactionBuy.User.Name);
                  setPopupPrice(transactionBuy.Price);
                }}
              >
                <div>Buyer Name: {transactionBuy.User.Name}</div>
                <div>Status: {transactionBuy.User.Status}</div>
                <div>Reputation: {transactionBuy.User.Reputation}</div>
                <div>Price: {transactionBuy.Price}p</div>
                <div>Quantity: {transactionBuy.Quantity}</div>
                {showPopupBuy && (
                  <div className="error-popup-overlay">
                    <div className="buy-popup">
                      <p>Please message {transactionBuy.User.Name} to buy</p>
                      <p className="message" ref={textRef}>
                        /w {popupUser} Hi! I want to buy: "{product.Name}" for{" "}
                        {popupPrice} platinum.
                      </p>
                      <p className="note">
                        This message will be copy to clipboard after close,
                        please sent that message to the trader
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="notify-no-transaction">No buy transactions found</div>
          )}
        </div>
        <div className="productList">
          <h3 className="sell">SELL</h3>
          {transactionSell.length > 0 ? (
            transactionSell.map((transactionSell) => (
              <div
                className="transaction-item"
                key={transactionSell.id}
                onClick={() => {
                  setShowPopupSell(true);
                  setPopupUser(transactionSell.User.Name);
                  setPopupPrice(transactionSell.Price);
                }}
              >
                <div>Seller Name: {transactionSell.User.Name}</div>
                <div>Status: {transactionSell.User.Status}</div>
                <div>Reputation: {transactionSell.User.Reputation}</div>
                <div>Price: {transactionSell.Price}p</div>
                <div>Quantity: {transactionSell.Quantity}</div>
                {showPopupSell && (
                  <div className="error-popup-overlay">
                    <div className="sell-popup">
                      <p>Please message {popupUser} to sell</p>
                      <p className="message" ref={textRef}>
                        /w {popupUser} Hi! I want to sell: "{product.Name}" for{" "}
                        {popupPrice} platinum.
                      </p>
                      <p className="note">
                        This message will be copy to clipboard after close,
                        please sent that message to the trader
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="notify-no-transaction">No sell transactions found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
