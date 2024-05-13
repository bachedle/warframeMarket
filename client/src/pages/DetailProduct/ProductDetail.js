import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
function ProductDetail() {
  let { Name } = useParams();
  const [product, setProduct] = useState([]);
  const [transaction, setTransaction] = useState([]);
  // const history = useHistory();

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
          setTransaction(response.data);
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

  return (
    <div className="product-detail-page">
      <div className="product-detail">
        <h2>{product.Name}</h2>
        <div className="info-item">
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
          <div className="info-item">Tax: {product.Tax}</div>
        </div>
      </div>
      <div className="list-of-transactions">
        {transaction.length > 0 ? (
          transaction.map((transaction) => (
            <li key={transaction.id}>
              Customer Name: {transaction.Customer.Name} - Status:{" "}
              {transaction.Customer.Status} - Reputation:{" "}
              {transaction.Customer.Reputation} - Price: {transaction.Price} -
              Quantity: {transaction.Quantity} -
              {transaction.Product.Type === "Mod" && ( // Check if product type is "Mod"
                <>
                  Rank: {transaction.Product.Rank}{" "}
                  {/* Render Rank if type is "Mod" */}
                </>
              )}
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
