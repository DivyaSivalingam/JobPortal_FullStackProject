import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Changed from useHistory
  
  const handleLogout = () => {
    logout();
    navigate('/login'); // Changed from history.push
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">JobPortal</Link>
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