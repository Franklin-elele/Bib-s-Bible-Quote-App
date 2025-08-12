import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Search from "./Pages/Search";
import About from "./Pages/About";
import Favorites from "./Pages/Favorites";
import NotFound from "./Pages/NotFound";
import Home from "./Pages/Home";
import DailyVerse from "./Pages/DailyVerse";


export default function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="navbar">
          <Link to="/" className="logo">Bib's</Link>
          <Link to="/" className="navlink">
            Home
          </Link>
          <Link to="/search" className="navlink">
            Search
          </Link>
          <Link to="/about" className="navlink">
            About
          </Link>
          <Link to="/favorites" className="navlink">
            Favorites
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element ={<NotFound />}/>
          <Route path="/dailyVerse" element={<DailyVerse />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
