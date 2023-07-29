import React, { useState, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

const Player = () => {
  const [trackName, setTrackName] = useState('');
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');

  const totalHoles = 18; // Assuming you have 18 holes

  useEffect(() => {
    const savedTrackName = localStorage.getItem('trackName') || '';
    setTrackName(savedTrackName);

    const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(savedPlayers);
  }, []);

  const handleTrackNameChange = (event) => {
    setTrackName(event.target.value);
  };

  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handleAddPlayer = () => {
    setPlayers((prevPlayers) => [...prevPlayers, { id: Date.now(), name: playerName, throws: Array(totalHoles).fill(0) }]);
    setPlayerName('');
  };

  const handleDeletePlayer = (playerId) => {
    setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== playerId));
  };

  const handleUpdateThrows = (playerIndex, hole, throws) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, index) =>
        index === playerIndex
          ? {
              ...player,
              throws: player.throws.map((t, i) => (i === hole ? throws : t)),
            }
          : player
      )
    );
  };

  const handleSaveScoreboard = () => {
    localStorage.setItem('trackName', trackName);
    localStorage.setItem('players', JSON.stringify(players));
  };

  return (
    <div>
      <h2>Add Players and Track Name</h2>
      <div>
        <input type="text" value={trackName} onChange={handleTrackNameChange} placeholder="Disc Golf Track Name" />
      </div>
      <div>
        <input type="text" value={playerName} onChange={handlePlayerNameChange} placeholder="Player name" />
        <button onClick={handleAddPlayer}>Add Player</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <h3>Players added:</h3>
            </th>
          </tr>
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
