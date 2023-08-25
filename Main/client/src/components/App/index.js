import * as React from 'react';
import Review from '../Review';
import Landing from '../Landing'
import MyPage from '../MyPage'
import Search from '../Search'
import Navigation from '../Navigation'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App = () => {


  return (

    <Router>
    < Navigation/>
    <div>
      <Routes>
        <Route path="/Review" element={<Review />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/" element={<Landing />} />
        <Route path="/Trailers" element={<MyPage />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
