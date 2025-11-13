import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Online Event Manager</h1>
          <p>Create and manage amazing events. Connect with organizers and administrators for seamless event management.</p>
          <div className="hero-buttons">
            <Link to="/events" className="btn btn-primary">
              Browse Events
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="container">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎭</div>
            <h3>Browse Events</h3>
            <p>Browse through a wide variety of events with advanced search and filtering options.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎪</div>
            <h3>Create Events</h3>
            <p>Organizers can easily create and manage their own events with comprehensive tools.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Use Templates</h3>
            <p>Save and reuse event templates for quick event creation.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Admin Control</h3>
            <p>Admins have full control with powerful dashboards for event and user management.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home