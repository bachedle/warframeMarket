import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import NavBar from './pages/navigation/NavBar';
import SearchSection from './pages/search-section/SearchSection';
import HomePage from './pages/home-page/HomePage'
import Footer from './pages/footer/Footer'
import WarframePage from './pages/component/WarframePage';
import WeaponPage from './pages/component/WeaponPage';
import ModPage from './pages/component/ModPage';
import PlaceOrder from './pages/place-order/PlaceOrder';
import User from './pages/account/user/User';
import Register from './pages/account/register/Register';
function App() {
  return (
    <div className='App'>
      <Router>
          <div>
            <NavBar></NavBar>
          </div>
          <Routes>
            <Route path ="/" exact element={<HomePage/>}></Route>
            <Route path ="/Warframe" exact element={<WarframePage/>}></Route>
            <Route path ="/Weapons" exact element={<WeaponPage/>}></Route>
            <Route path ="/Mod" exact element={<ModPage/>}></Route>
            <Route path ="/PlaceOrder" exact element={<PlaceOrder/>}></Route>

            <Route path ="/Users" exact element={<User/>}></Route>
            <Route path ="/Register" exact element={<Register/>}></Route>
          </Routes>
          <div>
            <Footer></Footer>
          </div>
      </Router>
    </div>
  );
}

export default App;
