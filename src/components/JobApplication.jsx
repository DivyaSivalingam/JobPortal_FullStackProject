import React from 'react';

const JobApplication = ({ application, job, onUpdateStatus, onSendInterviewInvite }) => {
  const handleStatusChange = (e) => {
    onUpdateStatus(job.id, application.id, e.target.value);
  };

  return (
    <div className="job-application">
      <div className="application-info">
        <h4>{application.applicantName}</h4>
        <p>Email: {application.applicantEmail}</p>
        <p>Applied: {application.appliedDate}</p>
        <a href={`#${application.resume}`} className="resume-link">
          Download Resume
        </a>
      </div>
      
      <div className="application-actions">
        <div className="status-select">
          <label>Status:</label>
          <select 
            value={application.status} 
            onChange={handleStatusChange}
          >
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Rejected">Rejected</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
          </select>
        </div>
        
        {application.status !== 'Interview Scheduled' && (
          <button 
            className="btn-interview"
            onClick={() => onSendInterviewInvite(application)}
          >
            Send Interview Invite
          </button>
        )}
      </div>
    </div>
  );
};

export default JobApplication;