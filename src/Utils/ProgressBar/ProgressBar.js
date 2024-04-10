  const ProgressBar = ({ label, progress }) => {
    console.log("UserStory");
    return (  
      <div className="progress-bar">
        <div className="progress-bar-label">{label}</div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  }

export default ProgressBar;