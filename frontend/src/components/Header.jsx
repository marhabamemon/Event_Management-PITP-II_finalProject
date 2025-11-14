import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'

const Header = () => {
  const { user, token } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header style={{ backgroundColor: '#333', color: 'white', padding: '1rem' }}>
      <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Online Event Manager
        </Link>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>
            About Us
          </Link>
          <Link to="/services" style={{ color: 'white', textDecoration: 'none' }}>
            Services
          </Link>
          <Link to="/support" style={{ color: 'white', textDecoration: 'none' }}>
            Support
          </Link>
          <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>
            Contact
          </Link>
          {token ? (
            <>
              <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
                Dashboard
              </Link>
              <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
                Profile
              </Link>
              {user?.role === 'organizer' && (
                <Link to="/organizer" style={{ color: 'white', textDecoration: 'none' }}>
                  Organizer
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>
                  Admin
                </Link>
              )}
              <span>Welcome, {user?.name}</span>
              <button onClick={handleLogout} className="btn btn-secondary" style={{ margin: 0 }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                Login
              </Link>
              <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header