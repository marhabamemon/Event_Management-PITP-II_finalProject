const Services = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Our Services</h1>
          <p>Comprehensive event management solutions tailored to meet your needs.</p>
        </div>
      </section>

      {/* Services Section */}
      <div className="container">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎭</div>
            <h3>Event Creation & Management</h3>
            <p>Easily create and manage events with our intuitive tools. Set dates, locations, descriptions, and more.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎪</div>
            <h3>Event Discovery</h3>
            <p>Browse through a wide variety of events with advanced search and filtering options.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Templates & Reusability</h3>
            <p>Save and reuse event templates for quick event creation and consistent branding.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Admin Dashboard</h3>
            <p>Powerful admin tools for managing users, events, and platform-wide settings.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Reviews & Ratings</h3>
            <p>Allow attendees to leave reviews and ratings for events to build trust and credibility.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3>Favorites</h3>
            <p>Save your favorite events for easy access and personalized recommendations.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services