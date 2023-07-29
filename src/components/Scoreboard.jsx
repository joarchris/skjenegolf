import React, { useState, useEffect } from 'react';

const Scoreboard = () => {
  const [trackName, setTrackName] = useState('');
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const savedTrackName = localStorage.getItem('trackName') || '';
    setTrackName(savedTrackName);

    const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(savedPlayers);
  }, []);

  const handleThrowChange = (playerIndex, hole, value) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, index) =>
        index === playerIndex
          ? {
              ...player,
              throws: player.throws.map((t, i) => (i === hole ? value : t)),
            }
          : player
      )
    );
  };

  // Function to calculate the total score for a player
  const calculateTotalScore = (throws) => throws.reduce((acc, curr) => acc + curr, 0);

  return (
    <div>
      <h2>{trackName || 'Scoreboard'}</h2>

      <table>
        <thead>
          <tr>
            <th>Hole</th>
            {players.map((player) => (
              <th key={player.id}>{player.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 18 }, (_, hole) => (
            <tr key={hole}>
              <td>{hole + 1}</td>
              {players.map((player, index) => (
                <td key={player.id}>
                  <input
                    type="number"
                    value={player.throws[hole]}
                    onChange={(e) => handleThrowChange(index, hole, parseInt(e.target.value))}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {players.length > 0 && (
        <div>
          <h2>Scoreboard</h2>
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Total Throws</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id}>
                  <td>{player.name}</td>
                  <td>{calculateTotalScore(player.throws)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {players.length === 0 && <p>No players added yet.</p>}
    </div>
  );
};

export default Scoreboard;