import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';
import "../create-transaction/FloatingButton.css";
import "../create-transaction/Createtransaction.css";

function FloatingButton() {
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
    console.log("Form values:", values);
  };

  return (
    <div className="floating-container">
      <div className="floating-button">+</div>
      <div className="element-container">
        <div className="float-element" onClick={handleBuyClick}>
          <i className="material-icon">Buy</i>
        </div>
        <div className="float-element" onClick={handleSellClick}>
          <i className="material-icon">Sell</i>
        </div>
        {(sell || buy) && (
          <div className="modalContent">
            <div className="modalHeader">
              <div className="headerContent">
                <h2>{sell ? "Selling Something?" : "Buying Something?"}</h2>
                {/* <button className="close-btn" onClick={handleClose}>
                  X
                </button> */}
              </div>
            </div>

            <div className="modalBody">
              <div className="bodyContent">
                <Formik
                  initialValues={{
                    itemName: "",
                    price: "",
                    quantity: "",
                  }}
                  onSubmit={handleConfirm}
                >
                  <Form>
                    <div className="itemContainer">
                      <label htmlFor="itemName">Item Name</label>
                      <Field as="select" id="itemName" name="itemName">
                        {listOfProductNames.map((productName, index) => (
                          <option key={index} value={productName}>{productName}</option>
                        ))}
                      </Field>
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
    </div>
  );
}

export default FloatingButton;
