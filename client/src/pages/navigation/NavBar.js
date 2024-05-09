import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
//import Home from '../Home';
//import CreatePost from '../CreatePost';
//import Post from '../Post';
import homebutton from '../../assets/home-button.png';
import './NavBar.css'

function NavBar() {
  // const [user, setUSer] = useState(null);
  const[auth, setAuth] =useState(false)
  const[name,setName] = useState('')
  const[message, setMessage] = useState('')

  useEffect(() => {
    axios.get('http://localhost:2001')
    .then(res => {
      if(res.data.Status === "Success") {
        setAuth(true);
        setName(res.data.name);
      } else {
        setMessage(res.data.Message);
      }
    })
  })

  const handleLogout = () => {
    axios.get('http://localhost:2001/Logout')
    .then(res => {
      if(res.data.Message === 'Success') {
        window.location.reload(true);
      } else {
        alert("error");
      }
    })
    .catch(err => console.log(err) )
  }
  
  return (
    <div className='navContainer'>
      {
        auth ?
        <div>
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
            </div>  
            <div className="accountButton">
              {/* <Link to="/Users">
                User 
              </Link> */}
              <div className='loginBtn'>
                <Link to="/Login">
                  Logout
                </Link>
              </div>
            </div>  
          </nav>
        </div>
        :
        <div>
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
            </div>  
            <div className="accountButton">
              {/* <Link to="/Users">
                User 
              </Link> */}
              <div className='loginBtn'>
                <Link to="/Login">
                  Login 
                </Link>
              </div>
            </div>  
          </nav>
        </div>
      }
        
        

          {/* <Route path = "/" exact element={<Home/>}></Route>
          <Route path = "/CreatePost" exact element={<CreatePost/>}></Route>
          <Route path = "/Post/:id" exact element={<Post/>}></Route> */}
    </div>
  )
}

export default NavBar
