import '../styles/progressBar.css';
export default function ProgressBar({ currentStep, totalSteps }) {
  return (
    <>
     
      <div className="progress-bar-wrapper">
        <div className="progress-track">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        </div>
    </>
    );
}
