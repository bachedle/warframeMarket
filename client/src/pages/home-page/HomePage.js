import React, {useEffect, useState} from 'react'
// import { useParams }  from 'react-router-dom'
import axios from 'axios'
import '../home-page/HomePage.css'
import '../search-section/SearchSection.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './HomePage.css';
import warframeImg from '../../assets/gauss.png'
import weaponImg from '../../assets/AcceltraPrime.webp'
import modImg from '../../assets/mod.webp'
import midenlacdit from '../../assets/platinum.webp'

function HomePage() {
    // let { id } = useParams();
    const [postObject, setPostObject] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:2001/posts`).then((response) => {
            setPostObject(response.data)
        });
    }, [/*id*/])
  return (
      <div className="homepage">
            <div className="homeContainer">
                <div className='searchCategory'>
                    <Link to="/Warframe" className='searchbutt'>
                        <img src={warframeImg} className='img'></img>
                        Warframe
                    </Link>
                </div>
                
                <div className='searchCategory'>
                    <Link to="/Weapons" className='searchbutt'>
                        <img src={weaponImg} className='img'></img>
                        Weapons
                    </Link>
                </div>
                
                <div className='searchCategory'>
                    <Link to="/Mod" className='searchbutt'>
                        <img src={modImg} className='img'></img>
                        Mods
                    </Link>
                </div>
                
                <div className='searchCategory'>
                    <Link to="/PlaceOrder" className='searchbutt'>
                        <img src={midenlacdit} className='img'></img>
                        search
                    </Link>
                </div>
            </div>

            <div className="productList">
                {postObject.map((value,key)=> (
                    <div className="productCapsule">
                        <div className="title">{value.title}</div>
                        <div className="postText">{value.postText}</div>
                        <div className="username">{value.username}</div>
                        {/* <div className="title">title</div>
                        <div className="postText">quantity</div>
                        <div className="username">price</div> */}
                        <br></br>
                    </div>
                ))}
                
                
                
            </div>
        </div>
  )
}

export default HomePage
