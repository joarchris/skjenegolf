import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ArchivePage = () => {
  const [selectedScoreboard, setSelectedScoreboard] = useState(null);

  // Retrieve the archived scoreboards from local storage
  const archivedScoreboards = JSON.parse(localStorage.getItem('scoreboardArchive')) || [];

  // Function to open the modal and show the selected scoreboard
  const openModal = (scoreboard) => {
    setSelectedScoreboard(scoreboard);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedScoreboard(null);
  };

  // Function to calculate player rankings based on total throws
  const calculateRankings = (scoreboard) => {
    const playersWithRanking = scoreboard.players.map((player) => {
      return {
        ...player,
        totalThrows: player.throws.reduce((total, num) => total + num, 0),
      };
    });

    playersWithRanking.sort((a, b) => a.totalThrows - b.totalThrows);

    return playersWithRanking;
  };

  return (
    <div>
      <h2>Archived Scoreboards</h2>
      {archivedScoreboards.length > 0 ? (
        <ul>
          {archivedScoreboards.map((scoreboard, index) => (
            <div key={index}>
              <button onClick={() => openModal(scoreboard)}>
                {scoreboard.trackName} - {scoreboard.savedDate}
              </button>
            </div>
          ))}
        </ul>
      ) : (
        <p>No archived scoreboards yet.</p>
      )}

      {/* The Modal */}
      <Modal show={!!selectedScoreboard} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedScoreboard && selectedScoreboard.trackName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedScoreboard && (
            <div>
              <p>Date: {selectedScoreboard.savedDate}</p>
              <h3>Player Rankings:</h3>
              <ol>
                {calculateRankings(selectedScoreboard).map((player, index) => (
                  <li key={player.id}>
                    {player.name} - {player.totalThrows} throws
                  </li>
                ))}
              </ol>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ArchivePage;
