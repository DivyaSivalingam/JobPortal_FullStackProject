import React from 'react';

const UserApplications = ({ applications, jobs, onJobClick }) => {
  const getJobById = (id) => jobs.find(job => job.id === id);

  return (
    <div className="applications-list">
      <h3>My Applications</h3>
      
      {applications.length === 0 ? (
        <p>You haven't applied to any jobs yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => {
              const job = getJobById(app.jobId);
              if (!job) return null;
              
              return (
                <tr key={index}>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>{app.appliedDate}</td>
                  <td className={`status-${app.status.toLowerCase()}`}>{app.status}</td>
                  <td>
                    <button 
                      className="btn-view"
                      onClick={() => onJobClick(job)}
                    >
                      View Job
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserApplications;