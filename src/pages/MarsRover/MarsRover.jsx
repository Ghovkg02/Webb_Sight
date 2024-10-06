import React, { useState, useEffect } from "react";
import './App1.css';

const App = () => {
  const [countdown, setCountdown] = useState(3);
  const [showVideo, setShowVideo] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const videoFile = "/earth-bg.mp4"; 

  useEffect(() => {
    const nasaCodeTimeout = setTimeout(() => {
      const countdownInterval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(countdownInterval);
        setShowVideo(true);
      }, 3000);
    }, 5000); // NASA code duration

    return () => {
      clearTimeout(nasaCodeTimeout);
    };
  }, []);

  return (
    <div className="app-container">
      {countdown > 0 && !showVideo && (
        <>
          <div className="nasa-code">
            <pre>
              {`
  Loading NASA Launch Code...
  Verifying Systems...
  Initializing Rocket Launch Sequence...
  Ready for Launch!
              `}
            </pre>
          </div>
          <div className="countdown">{countdown}</div>
        </>
      )}

      {showVideo && (
        <div className="video-container">
          <video className="video-background" autoPlay loop muted>
            <source src={videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button 
            className="launch-button" 
            onClick={() => window.open("https://webbvid.vercel.app/", "_blank")}
          >
            Launch Exploration
          </button>
          <button className="toggle-button" onClick={() => setShowDescription(!showDescription)}>
            {showDescription ? "Hide Description" : "View Description"}
          </button>
          <div className={`description-overlay ${showDescription ? 'show' : ''}`}>
            <p>This is the description of the video. You can replace this with your own text.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
