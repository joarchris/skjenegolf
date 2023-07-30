import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { TrashIcon } from '@heroicons/react/24/outline';

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

  // Function to delete a scoreboard from the archived list
  const deleteScoreboard = (index) => {
    const updatedScoreboards = [...archivedScoreboards];
    updatedScoreboards.splice(index, 1);
    localStorage.setItem('scoreboardArchive', JSON.stringify(updatedScoreboards));
    setSelectedScoreboard(null); // Close the modal if it's open for the deleted scoreboard
  };
  const handleDelete = () => {
    // Display an alert before deleting the scoreboard
    if (window.confirm('YO YO! Are you sure you want to delete this scoreboard?')) {
      deleteScoreboard();
    }
  };
  return (
    <div className="archive">
      <h2>Archived Scoreboards</h2>
      {archivedScoreboards.length > 0 ? (
        <span>
          {archivedScoreboards.map((scoreboard, index) => (
            <div key={index}>
              <button style={{ marginRight: '10px' }} onClick={() => openModal(scoreboard)}>
                {scoreboard.trackName} - {scoreboard.savedDate}
              </button>
              <span onClick={() => handleDelete(index)}>
                <TrashIcon height={15} />
              </span>
            </div>
          ))}
        </span>
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
