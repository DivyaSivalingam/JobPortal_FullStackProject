import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Hardcoded data for admin
const allUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'jobseeker',
    status: 'active',
    registeredDate: '2025-01-15'
  },
  {
    id: 2,
    name: 'Tech Company Inc.',
    email: 'tech@example.com',
    role: 'employer',
    status: 'active',
    company: 'Tech Company Inc.',
    registeredDate: '2025-02-20'
  },
  {
    id: 3,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'jobseeker',
    status: 'blocked',
    registeredDate: '2025-03-10'
  },
  {
    id: 4,
    name: 'Data Systems',
    email: 'data@example.com',
    role: 'employer',
    status: 'active',
    company: 'Data Systems',
    registeredDate: '2025-04-05'
  }
];

const allJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Company Inc.',
    postedBy: 2,
    postedDate: '2023-05-01',
    status: 'active',
    reported: false
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'Data Systems',
    postedBy: 4,
    postedDate: '2023-05-10',
    status: 'active',
    reported: false
  },
  {
    id: 3,
    title: 'Fake Job Scam',
    company: 'Suspicious Company',
    postedBy: 5,
    postedDate: '2023-05-15',
    status: 'active',
    reported: true
  }
];

const AdminDashboard = () => {
  const [users, setUsers] = useState(allUsers);
  const [jobs, setJobs] = useState(allJobs);
  const [view, setView] = useState('users'); // 'users', 'jobs'
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useContext(AuthContext);

  const toggleUserStatus = (userId) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' } : u
    ));
  };

  const removeJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <p>Welcome, {user.name}</p>
      </div>

      <div className="dashboard-actions">
        <button 
          className={view === 'users' ? 'active' : ''} 
          onClick={() => setView('users')}
        >
          Manage Users
        </button>
        <button 
          className={view === 'jobs' ? 'active' : ''} 
          onClick={() => setView('jobs')}
        >
          Manage Jobs
        </button>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {view === 'users' && (
        <div className="admin-users">
          <h3>User Management</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Registered</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td className={`status-${u.status}`}>{u.status}</td>
                  <td>{u.registeredDate}</td>
                  <td>
                    <button 
                      className={u.status === 'active' ? 'btn-block' : 'btn-unblock'}
                      onClick={() => toggleUserStatus(u.id)}
                    >
                      {u.status === 'active' ? 'Block' : 'Unblock'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === 'jobs' && (
        <div className="admin-jobs">
          <h3>Job Listings Management</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Company</th>
                <th>Posted By</th>
                <th>Posted Date</th>
                <th>Status</th>
                <th>Reported</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map(job => (
                <tr key={job.id} className={job.reported ? 'reported' : ''}>
                  <td>{job.id}</td>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.postedBy}</td>
                  <td>{job.postedDate}</td>
                  <td>{job.status}</td>
                  <td>{job.reported ? 'Yes' : 'No'}</td>
                  <td>
                    <button 
                      className="btn-remove"
                      onClick={() => removeJob(job.id)}
                    >
                      Remove
                    </button>
                    {job.reported && (
                      <button className="btn-review">
                        Review
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;