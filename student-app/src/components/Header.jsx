import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/', { replace: true })
  }

  return (
    <header className="sma-header">
      <div className="sma-header-brand">
        <span className="sma-header-logo">◆</span>
        <Link to="/students" className="sma-header-title-link">
          Student Management System
        </Link>
      </div>
      <nav className="sma-header-nav">
        <NavLink
          to="/students"
          className={({ isActive }) =>
            isActive ? 'sma-header-nav-item sma-nav-active' : 'sma-header-nav-item'
          }
        >
          Students
        </NavLink>
        <button className="sma-btn-logout" onClick={handleLogout}>
          Sign Out
        </button>
      </nav>
    </header>
  )
}

// Changes from Day 10:
// 1. Removed onLogout prop — Header manages its own logout logic
// 2. Added: const navigate = useNavigate()
// 3. handleLogout now calls navigate('/') instead of calling the prop
// 4. Static span for title replaced with <Link>
// 5. Static span for nav item replaced with <NavLink> for active styling