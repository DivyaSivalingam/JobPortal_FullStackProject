import React, { useState, useContext } from 'react';
import JobPostingForm from './JobPostingForm';
import JobCard from './JobCard';
import JobApplication from './JobApplication';
import { AuthContext } from '../context/AuthContext';

const companyJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Innovators Inc.',
    location: 'New York, NY',
    salary: '$80,000 - $100,000',
    jobType: 'Full-time',
    postedDate: '2024-04-01',
    description: 'We are looking for a skilled Frontend Developer proficient in React.',
    requirements: [
      '3+ years experience in frontend development',
      'Proficient in HTML, CSS, JavaScript, and React'
    ],
    applications: [
      {
        id: 1,
        applicantName: 'John Doe',
        applicantEmail: 'johndoe@example.com',
        resumeUrl: 'https://example.com/resumes/john-doe.pdf',
        status: 'Applied'
      }
    ]
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'NextGen Solutions',
    location: 'Remote',
    salary: '$90,000 - $120,000',
    jobType: 'Full-time',
    postedDate: '2024-04-10',
    description: 'Seeking a backend developer experienced in Node.js and MongoDB.',
    requirements: [
      'Strong understanding of REST APIs',
      'Experience with cloud services (AWS/GCP)'
    ],
    applications: []
  }
];

const EmployerDashboard = () => {
  const { user, login } = useContext(AuthContext);
  const [jobs, setJobs] = useState(companyJobs);
  const [showJobForm, setShowJobForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [view, setView] = useState('jobs');
  const [showCompanyProfile, setShowCompanyProfile] = useState(false);

  const [companyForm, setCompanyForm] = useState({
    profilePic: user.profilePic || '',
    name: user.name || '',
    experience: user.experience || '',
    currentCompany: user.currentCompany || '',
    linkedIn: user.linkedIn || '',
    email: user.email || ''
  });

  const handleCompanyChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePic') {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCompanyForm(prev => ({ ...prev, profilePic: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setCompanyForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const saveCompanyProfile = () => {
    const updatedUser = {
      ...user,
      ...companyForm
    };
    login(updatedUser);
    setShowCompanyProfile(false);
    alert('Profile updated successfully!');
  };

  const handleAddJob = (newJob) => {
    setJobs([...jobs, {
      ...newJob,
      id: Math.max(...jobs.map(j => j.id)) + 1,
      postedDate: new Date().toISOString().split('T')[0],
      applications: []
    }]);
    setShowJobForm(false);
  };

  const handleUpdateJob = (updatedJob) => {
    setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job));
    setSelectedJob(null);
    setShowJobForm(false);
  };

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  const handleUpdateApplicationStatus = (jobId, applicationId, newStatus) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          applications: job.applications.map(app =>
            app.id === applicationId ? { ...app, status: newStatus } : app
          )
        };
      }
      return job;
    }));
  };

  const handleSendInterviewInvite = (application) => {
    alert(`Interview invite sent to ${application.applicantName} at ${application.applicantEmail}`);
    handleUpdateApplicationStatus(selectedJob.id, application.id, 'Interview Scheduled');
  };

  return (
    <div className="dashboard">
      {showCompanyProfile && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Profile</h3>

            <div className="form-group">
              <label>Profile Picture:</label>
              <input
                type="file"
                name="profilePic"
                accept="image/*"
                onChange={handleCompanyChange}
              />
              {companyForm.profilePic && (
                <img
                  src={companyForm.profilePic}
                  alt="Preview"
                  style={{ width: '80px', height: '80px', borderRadius: '50%', marginTop: '10px' }}
                />
              )}
            </div>

            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={companyForm.name}
                onChange={handleCompanyChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Experience (in years):</label>
              <input
                type="number"
                name="experience"
                value={companyForm.experience}
                onChange={handleCompanyChange}
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Current Working Company:</label>
              <input
                type="text"
                name="currentCompany"
                value={companyForm.currentCompany}
                onChange={handleCompanyChange}
              />
            </div>

            <div className="form-group">
              <label>LinkedIn Profile:</label>
              <input
                type="url"
                name="linkedIn"
                value={companyForm.linkedIn}
                onChange={handleCompanyChange}
                placeholder="https://linkedin.com/in/your-profile"
              />
            </div>

            <div className="form-group">
              <label>Email ID:</label>
              <input
                type="email"
                name="email"
                value={companyForm.email}
                onChange={handleCompanyChange}
              />
            </div>

            <div className="modal-actions">
              <button className="btn-primary" onClick={saveCompanyProfile}>
                Save Changes
              </button>
              <button
                className="btn-secondary"
                onClick={() => setShowCompanyProfile(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-header">
        <h2>Employer Dashboard</h2>
        <div className="company-info">
          {user.profilePic && (
            <img
              src={user.profilePic}
              alt="Profile"
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
          )}
          <h3>{user.name}</h3>
          {user.currentCompany && <p>Company: {user.currentCompany}</p>}
          {user.experience && <p>Experience: {user.experience} years</p>}
          {user.email && <p>Email: {user.email}</p>}
          {user.linkedIn && (
            <p>
              LinkedIn: <a href={user.linkedIn} target="_blank" rel="noopener noreferrer">{user.linkedIn}</a>
            </p>
          )}
        </div>
      </div>

      <div className="dashboard-actions">
        <button
          className={view === 'jobs' ? 'active' : ''}
          onClick={() => {
            setView('jobs');
            setSelectedJob(null);
          }}
        >
          My Job Postings
        </button>
        <button onClick={() => setShowJobForm(true)}>
          Post New Job
        </button>
        <button onClick={() => setShowCompanyProfile(true)}>
          Edit Profile
        </button>
      </div>

      {showJobForm && (
        <JobPostingForm
          job={selectedJob}
          onSave={selectedJob ? handleUpdateJob : handleAddJob}
          onCancel={() => {
            setShowJobForm(false);
            setSelectedJob(null);
          }}
        />
      )}

      {view === 'jobs' && !showJobForm && (
        <div className="job-postings">
          {jobs.length === 0 ? (
            <p>You haven't posted any jobs yet.</p>
          ) : (
            <div className="job-listings">
              {jobs.map(job => (
                <div key={job.id} className="employer-job-card">
                  <JobCard
                    job={job}
                    onJobClick={() => {
                      setSelectedJob(job);
                      setView('applications');
                    }}
                  />
                  <div className="job-actions">
                    <button
                      className="btn-edit"
                      onClick={() => {
                        setSelectedJob(job);
                        setShowJobForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteJob(job.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn-view-apps"
                      onClick={() => {
                        setSelectedJob(job);
                        setView('applications');
                      }}
                    >
                      View Applications ({job.applications.length})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {view === 'applications' && selectedJob && (
        <div className="job-applications">
          <button
            className="btn-back"
            onClick={() => {
              setSelectedJob(null);
              setView('jobs');
            }}
          >
            ← Back to Job Postings
          </button>
          <h3>Applications for {selectedJob.title}</h3>
          {selectedJob.applications.length === 0 ? (
            <p>No applications received yet.</p>
          ) : (
            <div className="applications-list">
              {selectedJob.applications.map(application => (
                <JobApplication
                  key={application.id}
                  application={application}
                  job={selectedJob}
                  onUpdateStatus={handleUpdateApplicationStatus}
                  onSendInterviewInvite={handleSendInterviewInvite}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;
