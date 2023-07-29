import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Scoreboard from './components/Scoreboard';
import Player from './components/Player';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route exact path="/" element={<Scoreboard />} />
            <Route path="/add-players" element={<Player />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
