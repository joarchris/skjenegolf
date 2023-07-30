import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header>
      <div className="nav-container">
        <Link to="/">
          <img src="skjenegolf-logo.png" alt="logo" />
        </Link>

        <div className={`m-pages ${showMenu ? 'show-menu' : ''}`}>
          <Link to="/">
            <button>Scoreboard</button>
          </Link>
          <Link to="/add-players">
            <button>Setup Scoreboard</button>
          </Link>
          <Link to="/archive">
            <button>Archive</button>
          </Link>
        </div>

        <div className="burger-menu" onClick={toggleMenu}>
          <div className={`bar ${showMenu ? 'bar-open' : ''}`}></div>
          <div className={`bar ${showMenu ? 'bar-open' : ''}`}></div>
          <div className={`bar ${showMenu ? 'bar-open' : ''}`}></div>
          <div className={`menu-items ${showMenu ? 'show' : ''}`}>
            <Link to="/" onClick={toggleMenu}>
              Scoreboard
            </Link>
            <Link to="/add-players" onClick={toggleMenu}>
              Setup Scoreboard
            </Link>
            <Link to="/archive" onClick={toggleMenu}>
              Archive
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
