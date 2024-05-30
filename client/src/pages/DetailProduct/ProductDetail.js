import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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

  // method xu ly cai form
  const [sell, setSell] = useState(false);
  const [buy, setBuy] = useState(false);
  const [listOfProductNames, setListOfProductNames] = useState([]);

  //clickoutside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      const modalContent = document.querySelector(".modalContent");
      const floatingButton = document.querySelector(".floating-button");

      if (
        modalContent &&
        !modalContent.contains(event.target) &&
        !floatingButton.contains(event.target)
      ) {
        setSell(false);
        setBuy(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:2001/products`)
      .then((response) => {
        const productNames = response.data.map(product => product.Name);
        setListOfProductNames(productNames);
      })
      .catch((error) => {
        console.error("Error fetching product names:", error);
      });
  }, []);

  const setSellPopup = () => {
    setSell(true);
    setBuy(false); // Close the buy popup if it's open
  };

  const setBuyPopup = () => {
    setBuy(true);
    setSell(false); // Close the sell popup if it's open
  };

  // const handleClose = () => {
  //   setSell(false);
  //   setBuy(false);
  // };
  const handleSellClick = (event) => {
    event.stopPropagation();
    setSellPopup();
  };

  const handleBuyClick = (event) => {
    event.stopPropagation();
    setBuyPopup();
  };

  const handleConfirm = (values) => {
    // Handle the confirm button click event
    console.log("Confirm button clicked");
    // values=JSON.stringify(values);
    console.log("Form values:", values);

    axios.put('http://localhost:2001/transactions/update', values)
      .then(() => {
        // Fetch updated transaction data and update states
        axios.get(`http://localhost:2001/transactions/Sell/${product.ID}`)
          .then((response) => {
            setTransactionSell(response.data);
          })
          .catch((error) => {
            console.error("Error fetching sell transactions:", error);
          });
  
        axios.get(`http://localhost:2001/transactions/Buy/${product.ID}`)
          .then((response) => {
            setTransactionBuy(response.data);
          })
          .catch((error) => {
            console.error("Error fetching buy transactions:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating transaction:", error);
      });
  };
  
  const deleteTransaction = (transactionId) => {
    axios.delete(`http://localhost:2001/transactions/delete/${transactionId}`)
      .then(() => {
        setTransactionSell(prev => prev.filter(txn => txn.id !== transactionId));
        setTransactionBuy(prev => prev.filter(txn => txn.id !== transactionId));
      })
      .catch((error) => {
        console.error("Error deleting transaction:", error);
      });
  };

  // end of code

  //method xu ly cai product detail
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
          <img 
            className="product-detail-image"
            src={`/item/${product.Type==='Mod' ? 'item-mods' : product.Type==='Weapon' ? 'item-weapon' : 'item-warframe'}/${(product.Name || '').replace(/\s+/g, '_')}.webp`} 
            alt="Product Image" 
          />
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
      </div>
      <div className="transaction-lists">
        <div className="transaction">
          <h3 className="buy">BUY</h3>
          <div className="transaction-item-header">
            <div className="sus">-----</div>
            <div>Buyer</div>
            <div>Status</div>
            <div>Reputation</div>
            <div>Price</div>    
            <div>Quantity</div>
            <div className="sus">---</div>

          </div>
          {transactionBuy.length > 0 ? (
            transactionBuy.map((transactionBuy) => (
              
              <div
                className="transaction-item"
                key={transactionBuy.id}
                // onClick={() => {
                //   setShowPopupBuy(true);
                //   setPopupUser(transactionBuy.User.Name);
                //   setPopupPrice(transactionBuy.Price);
                // }}
              >
                <div className ="edit-button" onClick={()=>{console.log(transactionBuy.id); deleteTransaction(transactionBuy.id)}}>x</div>
                <div>{transactionBuy.User.Name}</div>
                <div>{transactionBuy.User.Status}</div>
                <div>{transactionBuy.User.Reputation}</div>
                <div className="plat">{transactionBuy.Price}<img className="ducat" src={`/item/icon/platinum.webp`}/></div>
                <div>{transactionBuy.Quantity}</div>
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
                <div className='edit-button' onClick={(event)=>{localStorage.setItem('Edited ID', transactionBuy.id);handleBuyClick(event)}}> 
                  <span className="sus">----</span>
                  <span> edit</span>
                </div>
              </div>
            ))
          ) : (
            <div className="notify-no-transaction">No buy transactions found</div>
          )}
        </div>
        <div className="transaction">
          <h3 className="sell">SELL</h3>
          <div className="transaction-item-header">
          <div className="sus">---</div>

            <div>Seller</div>
            <div>Status</div>
            <div>Reputation</div>
            <div>Price</div>
            <div>Quantity</div>
          </div>
          {transactionSell.length > 0 ? (
            transactionSell.map((transactionSell) => (
              <div
                className="transaction-item"
                key={transactionSell.id}
                // onClick={() => {
                //   setShowPopupSell(true);
                //   setPopupUser(transactionSell.User.Name);
                //   setPopupPrice(transactionSell.Price);
                // }}
              >
                <div className='edit-button' onClick={()=>{console.log(transactionSell.id); deleteTransaction(transactionSell.id)}}> x</div>
                <div>{transactionSell.User.Name}</div>
                <div>{transactionSell.User.Status}</div>
                <div>{transactionSell.User.Reputation}</div>
                <div className="plat">{transactionSell.Price}<img className="ducat" src={`/item/icon/platinum.webp`}/></div>
                <div>{transactionSell.Quantity}</div>
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
                <div className='edit-button' onClick={(event)=>{localStorage.setItem('Edited ID', transactionSell.id);handleSellClick(event)}}> 
                  <span className="sus">----</span>
                  <span > edit</span>
                </div>
              </div>
            ))
          ) : (
            <div className="notify-no-transaction">No sell transactions found</div>
          )}
        </div>
      </div>
      {(sell || buy) && (
          <div className="modalContent">
            <div className="modalHeader">
              <div className="headerContent">
                <h2>{sell ? "Selling Edit?" : "Buying Edit?"}</h2>
                {/* <button className="close-btn" onClick={handleClose}>
                  X
                </button> */}
              </div>
            </div>

            <div className="modalBody">
              <div className="bodyContent">
                <Formik
                  initialValues={{
                    id: localStorage.getItem('Edited ID'),
                    price: "",
                    quantity: "",
                  }}
                  onSubmit={handleConfirm}
                >
                  <Form>
                    <div className="itemContainer">
                      <ErrorMessage name="itemName" component="div" />
                    </div>
                    <div className="misContainer">
                      <div className="rowCompact">
                        <div className="price">
                          <label htmlFor="price">Price per unit</label>
                          <Field type="number" id="price" name="price" />
                          <ErrorMessage name="price" component="div" />
                        </div>
                        <div className="quantity">
                          <label htmlFor="quantity">Quantity</label>
                          <Field type="number" id="quantity" name="quantity" />
                          <ErrorMessage name="quantity" component="div" />
                        </div>
                      </div>
                    </div>
                    <div className="modalAction">
                      <div className="buttonHolder">
                        <button className="button" type="submit">
                          <div>
                            <span>Confirm</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default ProductDetail;
