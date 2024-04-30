import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import NavBar from './pages/navigation/NavBar';
import SearchSection from './pages/search-section/SearchSection';
import HomePage from './pages/home-page/HomePage'
import Footer from './pages/footer/Footer'
import WarframePage from './pages/component/WarframePage'
function App() {
  return (
    <div className='App'>
      <Router>
          <div>
            <NavBar></NavBar>
          </div>
          <Routes>
            <Route path = "/" exact element={<HomePage/>}></Route>
            <Route path ="/Warframe" exact element={<WarframePage/>}></Route>
          </Routes>
          <div>
            <Footer></Footer>
          </div>
      </Router>
    </div>
  );
}

export default App;
