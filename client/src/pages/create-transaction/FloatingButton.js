import React, { useState, useEffect, useRef } from "react";
import "../create-transaction/FloatingButton.css";
import "../create-transaction/Createtransaction.css";

function FloatingButton() {
  const [sell, setSell] = useState(false);
  const [buy, setBuy] = useState(false);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const sellButtonRef = useRef(null);
  const buyButtonRef = useRef(null);

  const setSellPopup = () => {
    setSell(true);
  };

  const setBuyPopup = () => {
    setBuy(true);
  };

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

  const handleSellClick = (event) => {
    event.stopPropagation();
    setSellPopup();
  };

  const handleBuyClick = (event) => {
    event.stopPropagation();
    setBuyPopup();
  };

  const handleConfirm = () => {
    // Handle the confirm button click event
    console.log("Confirm button clicked");
    console.log("Item Name:", itemName);
    console.log("Price:", price);
    console.log("Quantity:", quantity);
  };

  return (
    <div className="floating-container">
      <div className="floating-button">+</div>
      <div className="element-container">
        <div className="float-element" onClick={handleBuyClick} ref={buyButtonRef}>
          <i className="material-icon">Buy</i>
        </div>
        <div className="float-element" onClick={handleSellClick} ref={sellButtonRef}>
          <i className="material-icon">Sell</i>
        </div>
        {(sell || buy) && (
          <div className="modalContent">
            <div className="modalHeader">
              <div className="headerContent">
                <h2>{sell ? "Selling Something?" : "Buying Something?"}</h2>
              </div>
            </div>

            <div className="modalBody">
              <div className="bodyContent">
                <div className="itemContainer">
                  <label htmlFor="orderItemName">Item Name</label>
                  <section className="input">
                    <input
                      type="text"
                      placeholder="Item"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                    />
                  </section>
                </div>
                <div className="misContainer">
                  <div className="rowCompact">
                    <div className="price">
                      <label htmlFor="orderItemPrice">Price per unit</label>
                      <section className="input">
                        <input
                          type="number"
                          id="orderItemPrice"
                          placeholder="e.g. 1000"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </section>
                    </div>
                    <div className="quantity">
                      <label htmlFor="orderQuantity">Quantity</label>
                      <section className="input">
                        <input
                          type="number"
                          id="orderQuantity"
                          placeholder="e.g. 3"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modalAction">
              <div className="buttonHolder">
                <button
                  className="button"
                  tabIndex="0"
                  type="button"
                  onClick={handleConfirm}
                >
                  <div>
                    <span>Confirm</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FloatingButton;