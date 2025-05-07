import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('jobseeker');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Hardcoded authentication - replace with real API call in production
      let userData = null;
      
      if (role === 'jobseeker' && email === 'jobseeker@example.com' && password === 'password') {
        userData = {
          id: 1,
          name: 'John Doe',
          email: 'jobseeker@example.com',
          role: 'jobseeker',
          token: 'fake-jwt-token-jobseeker' // Adding mock token
        };
      } 
      else if (role === 'employer' && email === 'employer@example.com' && password === 'password') {
        userData = {
          id: 1,
          name: 'Tech Company Inc.',
          email: 'employer@example.com',
          role: 'employer',
          token: 'fake-jwt-token-employer'
        };
      }
      else if (role === 'admin' && email === 'admin@example.com' && password === 'password') {
        userData = {
          id: 1,
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          token: 'fake-jwt-token-admin'
        };
      }
      else {
        throw new Error('Invalid credentials');
      }

      // Call login function from context
      await login(userData);
      
      // Navigate based on role
      switch(userData.role) {
        case 'jobseeker':
          navigate('/jobseeker');
          break;
        case 'employer':
          navigate('/employer');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/');
      }
      
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Role:</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        
        <button type="submit" className="btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;