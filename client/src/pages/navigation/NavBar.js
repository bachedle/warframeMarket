import React from 'react';
import { Link } from 'react-router-dom';
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
              <a href='Login'>Login</a>
              
            </div> 
            
          </div>  
        </nav>
        

          {/* <Route path = "/" exact element={<Home/>}></Route>
          <Route path = "/CreatePost" exact element={<CreatePost/>}></Route>
          <Route path = "/Post/:id" exact element={<Post/>}></Route> */}
    </div>
  )
}

export default NavBar
