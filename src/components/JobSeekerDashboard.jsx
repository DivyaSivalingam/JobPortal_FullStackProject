import React, { useContext, useState } from 'react';
import JobCard from './JobCard';
import JobDetails from './JobDetails';
import UserApplications from './UserApplications';
import { AuthContext } from '../context/AuthContext';

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Corp',
    location: 'New York, NY',
    salary: '$80,000 - $100,000',
    description: 'We are looking for a skilled Frontend Developer...',
    requirements: '3+ years of React experience...',
    postedDate: '2025-05-01',
    expiryDate: '2025-06-30'
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'Data Systems',
    location: 'Remote',
    salary: '$90,000 - $110,000',
    description: 'Join our backend team...',
    requirements: 'Node.js, MongoDB, AWS...',
    postedDate: '2025-05-05',
    expiryDate: '2025-07-10'
  },
  {
    id: 3,
    title: 'UX Designer',
    company: 'Creative Solutions',
    location: 'San Francisco, CA',
    salary: '$75,000 - $95,000',
    description: 'Looking for a creative UX Designer...',
    requirements: 'Figma, Adobe XD, user research...',
    postedDate: '2025-05-03',
    expiryDate: '2025-07-15'
  }
];

const JobSeekerDashboard = () => {
  const { user, login } = useContext(AuthContext);
  const [selectedJob, setSelectedJob] = useState(null);
  const [view, setView] = useState('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [savedJobs, setSavedJobs] = useState([1]);
  const [applications, setApplications] = useState([
    { jobId: 1, status: 'Submitted', appliedDate: '2023-05-20' }
  ]);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showJobAlerts, setShowJobAlerts] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: user.name || '',
    email: user.email || '',
    skills: user.skills?.join(', ') || '',
    company: user.company || '',
    experience: user.experience || '',
    phoneNumber: user.phoneNumber || '',
    resume: null,
    profilePic: user.profilePic || null
  });

  const [alertPreferences, setAlertPreferences] = useState({
    frequency: 'daily',
    categories: ['Frontend', 'Fullstack'],
    emailNotifications: true,
    pushNotifications: false
  });

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setView('details');
  };

  const handleSaveJob = (jobId) => {
    setSavedJobs(prev =>
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const handleApply = (jobId) => {
    if (!applications.some(app => app.jobId === jobId)) {
      setApplications([
        ...applications,
        { jobId, status: 'Submitted', appliedDate: new Date().toISOString().split('T')[0] }
      ]);
      alert('Application submitted successfully!');
    } else {
      alert('You have already applied to this job.');
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handleResumeChange = (e) => {
    setProfileForm(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileForm(prev => ({ ...prev, profilePic: URL.createObjectURL(file) }));
    }
  };

  const saveProfile = () => {
    const updatedUser = {
      ...user,
      name: profileForm.name,
      email: profileForm.email,
      skills: profileForm.skills.split(',').map(s => s.trim()),
      company: profileForm.company,
      experience: profileForm.experience,
      phoneNumber: profileForm.phoneNumber,
      profilePic: profileForm.profilePic
    };
    login(updatedUser);
    setShowEditProfile(false);
    alert('Profile updated successfully!');
  };

  const saveAlertPreferences = () => {
    setShowJobAlerts(false);
    alert('Alert preferences saved!');
  };

  const toggleAlertCategory = (category) => {
    setAlertPreferences(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter
      ? job.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true;
    return matchesSearch && matchesLocation;
  });

  const savedJobDetails = jobs.filter(job => savedJobs.includes(job.id));

  return (
    <div className="dashboard">
      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Profile</h3>
            <div className="form-group">
              <label>Full Name:</label>
              <input name="name" value={profileForm.name} onChange={handleProfileChange} required />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input name="email" value={profileForm.email} onChange={handleProfileChange} required />
            </div>
            <div className="form-group">
              <label>Skills:</label>
              <input name="skills" value={profileForm.skills} onChange={handleProfileChange} />
            </div>
            <div className="form-group">
              <label>Current Company:</label>
              <input name="company" value={profileForm.company} onChange={handleProfileChange} />
            </div>
            <div className="form-group">
              <label>Experience:</label>
              <input name="experience" value={profileForm.experience} onChange={handleProfileChange} />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input name="phoneNumber" value={profileForm.phoneNumber} onChange={handleProfileChange} />
            </div>
            <div className="form-group">
              <label>Upload Resume:</label>
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} />
            </div>
            <div className="form-group">
              <label>Upload Profile Picture:</label>
              <input type="file" accept="image/*" onChange={handleProfilePicChange} />
            </div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={saveProfile}>Save Changes</button>
              <button className="btn-secondary" onClick={() => setShowEditProfile(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Job Alerts Modal */}
      {showJobAlerts && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Job Alert Preferences</h3>
            <div className="form-group">
              <label>Frequency:</label>
              <select
                name="frequency"
                value={alertPreferences.frequency}
                onChange={(e) => setAlertPreferences({ ...alertPreferences, frequency: e.target.value })}
              >
                <option value="instant">Instant</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            <div className="form-group">
              <label>Job Categories:</label>
              <div className="category-tags">
                {['Frontend', 'Backend', 'Fullstack', 'DevOps', 'Data Science'].map(category => (
                  <span
                    key={category}
                    className={`tag ${alertPreferences.categories.includes(category) ? 'active' : ''}`}
                    onClick={() => toggleAlertCategory(category)}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label><input type="checkbox" checked={alertPreferences.emailNotifications}
                onChange={(e) => setAlertPreferences({ ...alertPreferences, emailNotifications: e.target.checked })} /> Email Notifications</label>
            </div>
            <div className="form-group">
              <label><input type="checkbox" checked={alertPreferences.pushNotifications}
                onChange={(e) => setAlertPreferences({ ...alertPreferences, pushNotifications: e.target.checked })} /> Push Notifications</label>
            </div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={saveAlertPreferences}>Save Preferences</button>
              <button className="btn-secondary" onClick={() => setShowJobAlerts(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h2>Job Seeker Dashboard</h2>
        <div onClick={() => setShowEditProfile(true)} style={{ cursor: 'pointer' }}>
          {user.profilePic ? (
            <img src={user.profilePic} alt="Profile" className="profile-pic" />
          ) : (
            <div className="profile-placeholder">Edit Profile</div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="dashboard-actions">
        <button className={view === 'browse' ? 'active' : ''} onClick={() => setView('browse')}>Browse Jobs</button>
        <button className={view === 'saved' ? 'active' : ''} onClick={() => setView('saved')}>Saved Jobs</button>
        <button className={view === 'applications' ? 'active' : ''} onClick={() => setView('applications')}>My Applications</button>
        <button onClick={() => setShowEditProfile(true)}>Edit Profile</button>
        <button onClick={() => setShowJobAlerts(true)}>Job Alerts</button>
      </div>

      {/* Main Views */}
      {view === 'browse' && (
        <div className="job-browse">
          <div className="search-filters">
            <input
              type="text"
              placeholder="Search by job title or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="text"
              placeholder="Filter by location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>
          <div className="job-listings">
            {filteredJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onJobClick={handleJobClick}
                isSaved={savedJobs.includes(job.id)}
                onSave={handleSaveJob}
                hasApplied={applications.some(app => app.jobId === job.id)}
              />
            ))}
          </div>
        </div>
      )}

      {view === 'saved' && (
        <div className="job-listings">
          {savedJobDetails.length === 0 ? (
            <p>No saved jobs.</p>
          ) : (
            savedJobDetails.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onJobClick={handleJobClick}
                isSaved={true}
                onSave={handleSaveJob}
                hasApplied={applications.some(app => app.jobId === job.id)}
              />
            ))
          )}
        </div>
      )}

      {view === 'details' && selectedJob && (
        <JobDetails
          job={selectedJob}
          onBack={() => setView('browse')}
          isSaved={savedJobs.includes(selectedJob.id)}
          onSave={handleSaveJob}
          onApply={handleApply}
          hasApplied={applications.some(app => app.jobId === selectedJob.id)}
        />
      )}

      {view === 'applications' && (
        <UserApplications
          applications={applications}
          jobs={jobs}
          onJobClick={handleJobClick}
        />
      )}
    </div>
  );
};

export default JobSeekerDashboard;
