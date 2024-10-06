import React, { useState } from 'react';
import './App12.css';

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showDescription, setShowDescription] = useState(false);

  const videoBackground = './Videos_trimmed.mp4'; // Add the path to your background video here.
  const videos = [
    'path/to/video1.mp4', 
    'path/to/video2.mp4', 
    'path/to/video3.mp4', 
    'path/to/video4.mp4', 
    'path/to/video5.mp4',
    'path/to/video6.mp4'
  ];

  const handleButtonClick = (index) => {
    setSelectedVideo(videos[index]);
  };

  return (
    <div className="app-container">
      {/* Background Video */}
      <video className="video-background" autoPlay loop muted>
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Invisible Buttons */}
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="invisible-button"
          onClick={() => handleButtonClick(index)}
          style={{ top: `${20 + index * 10}%`, left: `${30 + index * 10}%` }} // Adjust positions as needed
        ></div>
      ))}

      {/* Video Player */}
      {selectedVideo && (
        <div className="video-player">
          <video controls className="video-element">
            <source src={selectedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <button
            className="toggle-description"
            onClick={() => setShowDescription(!showDescription)}
          >
            {showDescription ? 'Hide Description' : 'View Description'}
          </button>

          {showDescription && (
            <div className="description-box">
              <p>This is the description of the video. You can replace it with your own content.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
