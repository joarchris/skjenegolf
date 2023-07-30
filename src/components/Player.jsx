import React, { useState, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

const Player = () => {
  const [trackName, setTrackName] = useState('');
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [numHoles, setNumHoles] = useState(''); // Default to 18 holes

  useEffect(() => {
    const savedTrackName = localStorage.getItem('trackName') || '';
    setTrackName(savedTrackName);

    const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(savedPlayers);

    const savedNumHoles = parseInt(localStorage.getItem('numHoles')) || '18';
    setNumHoles(savedNumHoles);
  }, []);

  useEffect(() => {
    localStorage.setItem('numHoles', numHoles.toString());
  }, [numHoles]);

  const handleTrackNameChange = (event) => {
    setTrackName(event.target.value);
  };

  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handleAddPlayer = () => {
    setPlayers((prevPlayers) => [...prevPlayers, { id: Date.now(), name: playerName, throws: Array(numHoles).fill(0) }]);
    setPlayerName('');
  };

  const handleDeletePlayer = (playerId) => {
    setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== playerId));
  };

  const handleSaveScoreboard = () => {
    localStorage.setItem('trackName', trackName);
    localStorage.setItem('players', JSON.stringify(players));
  };

  const handleNumHolesChange = (event) => {
    const value = parseInt(event.target.value);
    setNumHoles(value);
  };

  return (
    <div>
      <h2>Add Players and Track Name</h2>
      <div>
        <input type="text" value={trackName} onChange={handleTrackNameChange} placeholder="Disc Golf Track Name" />
      </div>
      <div>
        <input type="number" value={numHoles} onChange={handleNumHolesChange} placeholder="Add number of holes" />
      </div>
      <div>
        <input type="text" value={playerName} onChange={handlePlayerNameChange} placeholder="Player name" />
        <button onClick={handleAddPlayer}>Add Player</button>
      </div>
      <table>
        <thead>
          <h4>Players added:</h4>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>
                <span onClick={() => handleDeletePlayer(player.id)}>
                  <TrashIcon height={15} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSaveScoreboard}>Create Scoreboard</button>
      {players.length === 0 && <p>No players added yet.</p>}
    </div>
  );
};

export default Player;
