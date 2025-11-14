const AboutUs = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>About Online Event Manager</h1>
          <p>Your premier platform for organizing and discovering amazing events. We connect event organizers with attendees, making event management seamless and enjoyable.</p>
        </div>
      </section>

      {/* About Section */}
      <div className="container">
        <div className="about-content">
          <div className="about-card">
            <div className="feature-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>To provide a comprehensive event management solution that empowers organizers and delights attendees with innovative tools and seamless experiences.</p>
          </div>
          <div className="about-card">
            <div className="feature-icon">🔮</div>
            <h3>Our Vision</h3>
            <p>To be the leading online platform for event management worldwide, revolutionizing how events are created, managed, and experienced.</p>
          </div>
          <div className="about-card">
            <div className="feature-icon">💡</div>
            <h3>Our Values</h3>
            <p>Innovation, reliability, user-centric design, and community building are at the core of everything we do.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs