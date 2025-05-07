import React from 'react';

const JobCard = ({ job, onJobClick, isSaved, onSave, hasApplied }) => {
  return (
    <div className="job-card">
      <div className="job-card-header" onClick={() => onJobClick(job)}>
        <h3>{job.title}</h3>
        <p className="company">{job.company}</p>
        <p className="location">{job.location}</p>
        <p className="salary">{job.salary}</p>
      </div>
      <div className="job-card-actions">
        <button 
          className={`btn-save ${isSaved ? 'saved' : ''}`}
          onClick={() => onSave(job.id)}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
        {hasApplied ? (
          <span className="applied-label">Applied</span>
        ) : (
          <button 
            className="btn-apply" 
            onClick={(e) => {
              e.stopPropagation();
              onJobClick(job);
            }}
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;