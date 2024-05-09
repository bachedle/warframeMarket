import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../login/Login.css';

function Login() {
  // const navigate = useNavigate();

  // const [values, setValues] = useState({
  //   email: '',
  //   password: ''
  // });

  const [isSignUp, setIsSignUp] = useState(false);

  // axios.defaults.withCredentials = true;
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Send a request to the login endpoint
  //   axios.post('http://localhost:2001/auth/Login', values)
  //     .then(res => {
  //       // Handle the successful login
  //       if (res.data.Status === "Success") {
  //         // Redirect to the homepage
  //         navigate('/');
  //       } else {
  //         alert(res.data.Message);
  //       }
  //     })
  //     .catch(err => {
  //       // Handle the login error
  //       console.log(err);
  //     });
  // };

  const handleForgotPassword = () => {
    // Handle the "Forgot Password" functionality
    console.log("Forgot Password");
  };

  const handleSignUp = () => {
    // Handle the "Sign Up" functionality
    setIsSignUp(true);
    console.log("Sign Up");
  };

  const handleLogin = () => {
    // Handle the "Login" functionality
    setIsSignUp(false);
    console.log("Login");
  };

  return (
    <div className='biggerContainer'>
      <div className='container'>
        <div className='header'>
          <div className='text'>{isSignUp ? 'Sign Up' : 'Login'}</div>
          <div className='underline'></div>
        </div>
        <form className='inputs' /*onSubmit={handleSubmit}*/>
          <div className='input'>
            <input
              type='email'
              placeholder='Email'
              // value={values.email}
              // onChange={e => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className='input'>
            <input
              type='password'
              placeholder='Password'
              // value={values.password}
              // onChange={e => setValues({ ...values, password: e.target.value })}
            />
          </div>
          {!isSignUp && (
            <div className='forgot-password' onClick={handleForgotPassword}>
              Forgot Password
            </div>
          )}
          <div className='submit-container'>
            <div className='submit' /*onClick={handleSubmit}*/>{isSignUp ? 'Sign Up' : 'Login'}</div>
          </div>
          <div className='sign-up'>
            {isSignUp ? (
              <div className='login-link' onClick={handleLogin}>
                Already have an account? Login
              </div>
            ) : (
              <a href="#" onClick={handleSignUp}>Sign Up</a>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;