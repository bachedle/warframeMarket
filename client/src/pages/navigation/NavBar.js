import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
//import Home from '../Home';
//import CreatePost from '../CreatePost';
//import Post from '../Post';
import homebutton from '../../assets/home-button.png';
import './NavBar.css'

function NavBar() {
  return (
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
        </nav>

          {/* <Route path = "/" exact element={<Home/>}></Route>
          <Route path = "/CreatePost" exact element={<CreatePost/>}></Route>
          <Route path = "/Post/:id" exact element={<Post/>}></Route> */}
    </div>
  )
}

export default NavBar
