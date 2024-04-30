import React from 'react';
import './SearchSection.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './SearchSection.css'
import warframeImg from '../../assets/GaussPrime.webp'
import weaponImg from '../../assets/Glaive_Prime.webp'
import modImg from '../../assets/ExilusWarframeAdapter.webp'
import midenlacdit from '../../assets/midenlacdit.jpg'

function searchSection() {
  return (
    <div className="searchSection">
      <div>
        
        <Link to="/Warframe" className='searchbutt'>
          <img src={warframeImg} className='img'></img>
          Warframe
        </Link>
      </div>

      <div>
        
        <Link to="/Weapons" className='searchbutt'>
          <img src={weaponImg} className='img'></img>
          Weapons
        </Link>
      </div>

      <div>
        
        <Link to="/Mod" className='searchbutt'>
          <img src={modImg} className='img'></img>
          Mods
        </Link>
      </div>

      <div>
        
        <Link to="/Search" className='searchbutt'>
          <img src={midenlacdit} className='img'></img>
          search
        </Link>
      </div> 
      
      <button>Weapons</button>
      <button>Mods</button>
      <button>Mischelaneous</button>
    </div>
  )
}

export default searchSection
