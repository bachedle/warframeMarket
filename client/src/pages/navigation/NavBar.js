import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineClose } from "react-icons/ai";
import homebutton from "../../assets/home-button.png";
import "./NavBar.css";
import "../create-transaction/FloatingButton.css";
function NavBar() {
  // // user state
  const [user, setUser] = useState(null);
// pop up for online/offline status
const [showUserStatusSuccess, setShowUserStatusSuccess] = useState(false);
const [showUserStatusFailed, setShowUserStatusFailed] = useState(false);
  // show login form and register form
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // Pop-up state for login success/failure
  const [showLoginSuccessPopup, setShowLoginSuccessPopup] = useState(false);
  const [showLoginErrorPopup, setShowLoginErrorPopup] = useState(false);

  // Pop-up state for register success/failure
  const [showRegisterSuccessPopup, setShowRegisterSuccessPopup] =
    useState(false);
  const [showRegisterErrorPopup, setShowRegisterErrorPopup] = useState(false);

  // Pop-up state for success/failure of transaction
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // validation schema
  const loginSchema = Yup.object().shape({
    email: Yup.string().required("*"),
    password: Yup.string().required("*"),
  });

  const registerSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("*"),
    password: Yup.string().required("*"),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref('password'), null], 'Passwords must match')
    //   .required('*'),
  });

  const openLoginForm = () => {
    setShowRegisterForm(false);
    setShowLoginForm(true);
  };

  const openRegisterForm = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
  };

  const navigate = useNavigate();

  const handleLoginSubmit = (data) => {
    axios
      .post("http://localhost:2001/auth/Login", data)
      .then((response) => {
        console.log("Login Response:", response.data);
        if (response.data.message === "YOU LOGGED IN!!!") {
          setShowLoginSuccessPopup(true);
          setUser(response.data.user);
          setIsLoggedIn(true);
          console.log("Successfully logged in");
          setShowLoginForm(false);
          navigate("/");
        } else {
          setShowLoginErrorPopup(true);
          console.log("Fail to logged in");
        }
      })
      .catch((error) => {
        console.error("Login Error:", error);
        setShowLoginErrorPopup(true);
      });
  };

  const handleRegisterSubmit = (data) => {
    axios
      .post("http://localhost:2001/auth", data)
      .then(() => {
        console.log("Register success");
        setShowRegisterSuccessPopup(true);
      })
      .catch((error) => {
        console.error("Register Error:", error);
        setShowRegisterErrorPopup(true);
      });
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleForgotPassword = () => {
    // Handle the "Forgot Password" functionality
    console.log("Forgot Password");
  };

  // Handler functions for closing pop-ups
  const closeLoginPopups = () => {
    setShowLoginSuccessPopup(false);
    setShowLoginErrorPopup(false);
  };

  const closeRegisterPopups = () => {
    setShowRegisterSuccessPopup(false);
    setShowRegisterErrorPopup(false);
  };

  const closePopups = () => {
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
    setShowUserStatusFailed(false);
    setShowUserStatusSuccess(false);
  };

  //Floating Button handlers
  const [sell, setSell] = useState(false);
  const [buy, setBuy] = useState(false);
  const [listOfProducts, setListOfProducts] = useState([]);

  //click outside
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

  //BackEnd Shit
  useEffect(() => {
    axios
      .get(`http://localhost:2001/products`)
      .then((response) => {
        const products = response.data;
        const productDetails = products.map((product) => ({
          id: product.ID,
          Name: product.Name,
        }));
        setListOfProducts(productDetails);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
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

  const handleConfirm = (data) => {
    axios
      .post("http://localhost:2001/transactions", data)
      .then(() => {
        console.log("Register success");
        setShowSuccessPopup(true);
      })
      .catch((error) => {
        console.error("Register Error:", error);
        setShowErrorPopup(true);
      });
    setBuy(false);
    setSell(false);
  };

  const [color, setColor] = useState("red");
  const [status, setStatus] = useState("Offline");

  const handleUserClick = () => {
    // Check if user is not null before accessing its properties
    if (user) {
      axios
        .put(`http://localhost:2001/auth/${user.ID}/${status}`)
        .then(() => {
          console.log("User status updated successfully");
          setShowUserStatusSuccess(true);
        })
        .catch((error) => {
          console.error("Error updating user status:", error);
          setShowUserStatusFailed(true);
        });
      // Toggle between green and red colors
      setColor(status === "Offline" ? "red" : "green");
    } else {
      console.error("User is null");
      // Handle the case where user is null (optional)
    }
  };

  return (
    <div>
      <div className="NavBar">
        <div className="navContainer">
          <nav className="navBar">
            <div className="homeButton">
              <Link to="/">
                <img src={homebutton} className="image"></img>
                <div className="homeText">
                  <span>Warframe</span>
                  <br></br>
                  <span>Trading Hub</span>
                </div>
              </Link>
              {/* <Link to="/CreatePost">create post</Link> */}
            </div>
            <div className="navButton">
              <Link to="/Warframe" style={{color:'darkslategray'}}>Warframe</Link>
              <Link to="/Weapons" style={{color:'darkslategray'}}>Weapons</Link>
              <Link to="/Mod" style={{color:'darkslategray  '}}>Mods</Link>
              <div
                className="user"
                style={{ color: color }}
                onClick={() => {
                  if (user && isLoggedIn) {
                    user.Status =
                      user.Status === "Online" ? "Offline" : "Online";
                    setStatus(user.Status);
                    handleUserClick();
                  }
                }}
              >
                {isLoggedIn ? user && user.Name : ""}
              </div>
            </div>
            <div>
              {isLoggedIn ? (
                <div className="loginBtn" onClick={handleLogout}>
                  Logout
                </div>
              ) : (
                <div className="loginBtn" onClick={openLoginForm}>
                  Login
                </div>
              )}
            </div>
          </nav>
        </div>
        {showLoginForm && (
          <div className="overlay">
            <div className="login-form-container">
              <div className="login-form">
                <h2>Please log in to continue</h2>
                <button
                  className="close-btn"
                  onClick={() => setShowLoginForm(false)}
                >
                  <AiOutlineClose />
                </button>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={loginSchema}
                  onSubmit={handleLoginSubmit}
                >
                  <Form>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field type="text" id="email" name="email" />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Password">Password</label>
                      <Field type="password" id="password" name="password" />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <button type="submit" className="login-button">
                      Login
                    </button>
                  </Form>
                </Formik>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingTop: "20px",
                  }}
                >
                  <span style={{ paddingRight: "5px", marginLeft: "8px" }}>
                    Don't have an account yet?{" "}
                  </span>
                  <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={openRegisterForm}
                  >
                    Sign Up
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        {showRegisterForm && (
          <div className="overlay">
            <div className="register-form-container">
              <h2>Create new account</h2>
              <button
                className="close-btn"
                onClick={() => setShowRegisterForm(false)}
              >
                <AiOutlineClose />
              </button>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={registerSchema}
                onSubmit={handleRegisterSubmit}
              >
                <Form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field type="text" id="email" name="email" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <Field type="password" id="password" name="password" />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Name</label>
                    <Field type="text" id="Name" name="Name" />
                    <ErrorMessage
                      name="Name"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <button type="submit" className="login-button">
                    Sign up
                  </button>
                </Form>
              </Formik>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingTop: "20px",
                }}
              >
                <span style={{ paddingRight: "5px" }}>
                  Already have an account?{" "}
                </span>
                <span
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={openLoginForm}
                >
                  Sign In
                </span>
              </div>
            </div>
          </div>
        )}
        {showLoginSuccessPopup && (
          <div className="success-popup-overlay" onClick={closeLoginPopups}>
            <div className="success-popup">
              <p>Welcome, Tenno!</p>
            </div>
          </div>
        )}
        {showLoginErrorPopup && (
          <div className="error-popup-overlay" onClick={closeLoginPopups}>
            <div className="error-popup">
              <p>Login failed. </p>
              <p>Please check your login information.</p>
            </div>
          </div>
        )}
        {showRegisterSuccessPopup && (
          <div className="success-popup-overlay" onClick={closeRegisterPopups}>
            <div className="success-popup">
              <p>Register Successfully!</p>
            </div>
          </div>
        )}
        {showRegisterErrorPopup && (
          <div className="error-popup-overlay" onClick={closeRegisterPopups}>
            <div className="error-popup">
              <p>Register failed. </p>
              <p>Please check your information again.</p>
            </div>
          </div>
        )}
        {showSuccessPopup && (
          <div className="success-popup-overlay" onClick={closePopups}>
            <div className="success-popup">
              <p>transaction success</p>
            </div>
          </div>
        )}
        
        {showUserStatusFailed && (
          <div className="error-popup-overlay" onClick={closePopups}>
            <div className="error-popup">
              <p>Offline </p>
            </div>
          </div>
        )}
        <div className="floating-container">
          <div className="floating-button">+</div>
          <div className="element-container">
            <div
              className="float-element"
              onClick={
                isLoggedIn ? handleBuyClick : () => setShowLoginErrorPopup(true)
              }
            >
              <i className="material-icon">Buy</i>
            </div>
            <div
              className="float-element"
              onClick={
                isLoggedIn
                  ? handleSellClick
                  : () => setShowLoginErrorPopup(true)
              }
            >
              <i className="material-icon">Sell</i>
            </div>
            {(sell || buy) && (
              <div className="overlay">
                <div className="modalContent">
                  <div className="modalHeader">
                    <div className="headerContent">
                      <h2>
                        {sell ? "Selling Something?" : "Buying Something?"}
                      </h2>
                    </div>
                  </div>

                  <div className="modalBody">
                    <div className="bodyContent">
                      <Formik
                        initialValues={{
                          ProductID: "", // Set initially as an empty string
                          UserID: user ? user.ID : "", // Assuming user is available and contains an ID
                          Price: "",
                          Type: sell ? "Sell" : "Buy", // Set the Type based on the 'sell' variable
                          Quantity: "",
                        }}
                        onSubmit={handleConfirm}
                      >
                        <Form>
                          <div className="itemContainer">
                            <label htmlFor="ProductID">Item Name</label>
                            <Field as="select" id="ProductID" name="ProductID">
                              <option>Choose the product</option>
                              {listOfProducts.map(({ id, Name }, index) => (
                                <option key={index} value={id}>
                                  {Name}
                                </option>
                              ))}
                            </Field>

                            <ErrorMessage name="ProductID" component="div" />
                          </div>
                          <div className="misContainer">
                            <div className="rowCompact">
                              <div className="Price">
                                <label htmlFor="Price">Price per unit</label>
                                <Field type="number" id="Price" name="Price" />
                                <ErrorMessage name="Price" component="div" />
                              </div>
                              <div className="Quantity">
                                <label htmlFor="Quantity">Quantity</label>
                                <Field
                                  type="number"
                                  id="Quantity"
                                  name="Quantity"
                                />
                                <ErrorMessage name="Quantity" component="div" />
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
