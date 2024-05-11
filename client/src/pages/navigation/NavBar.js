import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiOutlineClose } from 'react-icons/ai';
import homebutton from '../../assets/home-button.png';
import './NavBar.css'
import '../create-transaction/FloatingButton.css';

function NavBar() {
  
  // // user state
  const [user, setUser] = useState(null);

  // show login form and register form
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // Pop-up state for login success/failure
  const [showLoginSuccessPopup, setShowLoginSuccessPopup] = useState(false);
  const [showLoginErrorPopup, setShowLoginErrorPopup] = useState(false);

  // Pop-up state for register success/failure
  const [showRegisterSuccessPopup, setShowRegisterSuccessPopup] = useState(false);
  const [showRegisterErrorPopup, setShowRegisterErrorPopup] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // validation schema
  const loginSchema = Yup.object().shape({
    email: Yup.string().required('*'),
    password: Yup.string().required('*'),
  });

  const registerSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('*'),
    password: Yup.string().required('*'),
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
    axios.post('http://localhost:2001/auth/Login', data)
      .then((response) => {
        console.log("Login Response:", response.data);
        if (response.data.message === "YOU LOGGED IN!!!") {
          setShowLoginSuccessPopup(true);
          setUser(response.data.user);
          setIsLoggedIn(true);
          console.log("Successfully logged in");
          setShowLoginForm(false);
          navigate('/');
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
    axios.post('http://localhost:2001/auth', data)
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
    navigate('/');
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

  //Floating Button handlers
  const [sell, setSell] = useState(false);
  const [buy, setBuy] = useState(false);
  const [listOfProductNames, setListOfProductNames] = useState([]);

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

  const handleConfirm = (values) => {
    // Handle the confirm button click event
    console.log("Confirm button clicked");
    console.log("Form values:", values);
  };


  return (
    <div>
      <div className='NavBar'>
        <div className='navContainer'>
          <nav className="navBar">
            <div className="homeButton">
              <Link to="/">
                <img src={homebutton} className="image"></img>
                  <div className = "homeText">
                    <span>Warframe</span><br></br>
                    <span>Trading Hub</span>
                  </div>
              </Link> 
              {/* <Link to="/CreatePost">create post</Link> */}
            </div>    
            <div className="navButton">
              <Link to="/Warframe">
                Warframe 
              </Link> 
              <Link to="/Weapons">
                Weapons 
              </Link>
              <Link to="/Mod">
                Mods 
              </Link>
              {isLoggedIn ? (
                <div className='user'>
                  <Link to={{
                    pathname: "/Users",
                    state: { user: user }
                  }}>
                    User 
                  </Link>
                </div>
              ) : (
                <div className='user' onClick={() => console.log("Please login first")}>
                  {/* User  */}
                </div>
              )}
            </div>   
            <div>
              {isLoggedIn ? (
                <div className='loginBtn' onClick={handleLogout}>
                  Logout
                </div>
              ) : (
                <div className='loginBtn' onClick={openLoginForm}>
                  Login
                </div>
              )}
            </div>
          </nav>
        </div>
          {showLoginForm && (
            <div className='overlay'>
              <div className='login-form-container'>
                <div className='login-form'>
                  <h2>Please log in to continue</h2>
                  <button className="close-btn" onClick={() => setShowLoginForm(false)}>
                    <AiOutlineClose />
                  </button>
                  <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={handleLoginSubmit} >
                      <Form>
                        <div className='form-group'>
                          <label htmlFor='email'>Email</label>
                          <Field type='text' id='email' name='email' />
                          <ErrorMessage name='email' component='div' className='error-message' />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='Password'>Password</label>
                          <Field type='password' id='password' name='password' />
                          <ErrorMessage name='password' component='div' className='error-message' />
                        </div>
                        <button type='submit' className='login-button'>
                          Login
                        </button>
                      </Form>
                  </Formik>
                  <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '20px' }}>
                    <span style={{ paddingRight: '5px',marginLeft:'8px' }}>Don't have an account yet? </span>
                    <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={openRegisterForm}>Sign Up</span>
                  </div>
                </div>
              </div>
            </div>
            )}
          {showRegisterForm && (
            <div className='biggerContainer'>
              <div className='register-form-container'>
                <h2>Create new account</h2>
                <button className="close-btn" onClick={() => setShowRegisterForm(false)}>
                  <AiOutlineClose />
                </button>
                <Formik initialValues={{ email: '', password: '' }} validationSchema={registerSchema} onSubmit={handleRegisterSubmit}>
                  <Form>
                    <div className='form-group'>
                      <label htmlFor='email'>Email</label>
                      <Field type='text' id='email' name='email' />
                      <ErrorMessage name='email' component='div' className='error-message' />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='Password'>Password</label>
                      <Field type='password' id='password' name='password' />
                      <ErrorMessage name='password' component='div' className='error-message' />
                    </div>
                    <button type='submit' className='login-button'>
                      Sign up
                    </button>
                  </Form>
                </Formik>
                  <div style={{display:'flex',flexDirection:'row',paddingTop:'20px'}}>
                    <span style={{paddingRight:'5px'}}>Already have an account? </span>
                    <span style={{textDecoration:'underline',cursor:"pointer"}} onClick={openLoginForm} >Sign In</span>
                  </div>
              </div>
            </div>
          )}
          {showLoginSuccessPopup && (
            <div className="success-popup-overlay" onClick={closeLoginPopups}>
              
              <div className="success-popup">         
                  <p>Login Successfully!</p>
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
      </div> 
      <div className='FloatingButton'>
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
      </div>
    </div>
  )
}

export default NavBar
