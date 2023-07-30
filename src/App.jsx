import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Scoreboard from './components/Scoreboard';
import Player from './components/Player';
import Navbar from './components/Navbar';
import ArchivePage from './components/Archive';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route exact path="/" element={<Scoreboard />} />
            <Route path="/add-players" element={<Player />} />
            <Route path="/archive" element={<ArchivePage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
