import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo_jobportal.png';


export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo-link">
          <img
            src={logo}
            alt="JobGenie Logo"
            className="logo"
            style={{ height: '60px', marginRight: '10px', verticalAlign: 'middle' }}
          />
          <span style={{ verticalAlign: 'middle', fontWeight: 'bold' }}>JobGenie</span>
        </Link>
      </div>

      <div className="navbar-links">
        {user ? (
          <>
            <span className="welcome">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
