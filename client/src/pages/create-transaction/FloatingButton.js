import React, { useState } from "react";
import "../create-transaction/FloatingButton.css";
import "../create-transaction/Createtransaction.css";
// import addBtn from '../../assets/add.png'
function FloatingButton() {
  const [sell, setsell] = useState(false);
  const setsellpopup = () => {
    setsell(true);
  };
  return (
    <div className="floating-container">
      <div className="floating-button">+</div>
      <div className="element-container">
        <a href="/Buy" className="float-element">
          <i className="material-icon">Buy</i>
        </a>
        <a className="float-element" onClick={setsellpopup}>
          <i className="material-icon">Sell</i>
        </a>
        {sell && (
          <div className="modalContent">
            <div className="modalHeader">
              <div className="headerContent">
                <h2>Selling Something?</h2>
              </div>
            </div>

            <div className="modalBody">
              <div className="bodyContent">
                <div className="itemContainer">
                  <label for="orderItemName">Item Name</label>
                  <section className="input">
                    <input type="text" placeholder="Item" value></input>
                  </section>
                </div>
                <div className="misContainer">
                  <div className="rowCompact">
                    <div className="price">
                      <label for="orderItemPrice">Price per unit</label>
                      <section className="input">
                        <input
                          type="number"
                          id="orderItemPrice"
                          placeholder="e.g. 1000"
                          value
                        ></input>
                      </section>
                    </div>
                    <div className="quantity">
                      <label for="orderQuantity">Quantity</label>
                      <section className="input">
                        <input
                          type="number"
                          id="orderQuantity"
                          placeholder="e.g. 3"
                          value
                        ></input>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modalAction">
              <div className="buttonHolder">
                <button className="button" tabindex="0" type="button">
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
