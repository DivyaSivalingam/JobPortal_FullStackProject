import React from 'react';

const JobDetails = ({ job, onBack, isSaved, onSave, onApply, hasApplied }) => {
  return (
    <div className="job-details">
      <button className="btn-back" onClick={onBack}>← Back to listings</button>
      
      <div className="job-details-header">
        <h2>{job.title}</h2>
        <p className="company">{job.company}</p>
        <p className="location">{job.location}</p>
        <p className="salary">{job.salary}</p>
        <p className="posted-date">Posted: {job.postedDate} | Expires: {job.expiryDate}</p>
      </div>

      <div className="job-details-content">
        <div className="section">
          <h3>Job Description</h3>
          <p>{job.description}</p>
        </div>

        <div className="section">
          <h3>Requirements</h3>
          <p>{job.requirements}</p>
        </div>
      </div>

      <div className="job-details-actions">
        <button 
          className={`btn-save ${isSaved ? 'saved' : ''}`}
          onClick={() => onSave(job.id)}
        >
          {isSaved ? 'Saved' : 'Save Job'}
        </button>
        
        {hasApplied ? (
          <span className="applied-label">You've already applied to this job</span>
        ) : (
          <button 
            className="btn-apply" 
            onClick={() => {
              onApply(job.id);
              onBack();
            }}
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
};

export default JobDetails;