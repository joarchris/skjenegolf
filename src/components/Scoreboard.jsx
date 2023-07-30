import React, { useState, useEffect } from 'react';

const Scoreboard = () => {
  const [trackName, setTrackName] = useState('');
  const [players, setPlayers] = useState([]);
  const [numHoles, setNumHoles] = useState(''); // Default to 18 holes

  useEffect(() => {
    const savedTrackName = localStorage.getItem('trackName') || '';
    setTrackName(savedTrackName);

    const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(savedPlayers);

    const savedNumHoles = parseInt(localStorage.getItem('numHoles')) || '';
    setNumHoles(savedNumHoles);
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

  const handleSaveToLocalStorage = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    // Create a new scoreboard object to save in the archive
    const newScoreboard = {
      trackName: trackName,
      savedDate: formattedDate,
      players: players,
      numHoles: numHoles,
    };

    // Get the existing archive from local storage or create an empty array
    const existingArchive = JSON.parse(localStorage.getItem('scoreboardArchive')) || [];

    // Add the new scoreboard object to the archive
    existingArchive.push(newScoreboard);

    // Save the updated archive back to local storage
    localStorage.setItem('scoreboardArchive', JSON.stringify(existingArchive));

    alert('Scoreboard data saved to archive!');
  };

  const handleSave = () => {
    // Display an alert before deleting the scoreboard
    if (window.confirm('YO YO! Save this scoreboard only if it is finished? Press OK to save')) {
      handleSaveToLocalStorage();
    }
  };

  return (
    <div>
      <p className="infocontainer">
        Stay on this page while entering all the throws, and save scoreboard at the end when you are done with the game.
      </p>
      <h2>{trackName || 'Scoreboard'}</h2>

      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>
                {players.map((player) => (
                  <th key={player.id}>{player.name}</th>
                ))}
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numHoles }, (_, hole) => (
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
      </div>
      {players.length > 0 && (
        <div>
          <h2 style={{ marginTop: '20px' }}>Scoreboard</h2>
          <table>
            <tbody>
              {players.map((player) => (
                <tr key={player.id}>
                  <td style={{ paddingRight: '10px' }}>{player.name}:</td>
                  <td>{calculateTotalScore(player.throws)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button onClick={handleSave}>Save Scoreboard</button>
      {players.length === 0 && <p>No players added yet.</p>}
    </div>
  );
};

export default Scoreboard;
