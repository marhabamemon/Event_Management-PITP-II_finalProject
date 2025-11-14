const Support = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Support Center</h1>
          <p>Get help with using Online Event Manager. Find answers to common questions and get support.</p>
        </div>
      </section>

      {/* Support Section */}
      <div className="container">
        <div className="support-content">
          <div className="support-card">
            <div className="feature-icon">❓</div>
            <h3>Frequently Asked Questions</h3>
            <p>Find answers to the most common questions about creating, managing, and attending events.</p>
            <ul>
              <li>How do I create an event?</li>
              <li>How can I edit my event details?</li>
              <li>How do I manage bookings?</li>
              <li>What are event templates?</li>
            </ul>
          </div>
          <div className="support-card">
            <div className="feature-icon">📞</div>
            <h3>Contact Support</h3>
            <p>Need personalized help? Our support team is here to assist you.</p>
            <p>Email: support@eventmanager.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Hours: Monday - Friday, 9 AM - 6 PM EST</p>
          </div>
          <div className="support-card">
            <div className="feature-icon">📚</div>
            <h3>User Guides</h3>
            <p>Detailed guides to help you make the most of our platform.</p>
            <ul>
              <li>Getting Started Guide</li>
              <li>Organizer Handbook</li>
              <li>Admin Dashboard Tutorial</li>
              <li>Best Practices for Events</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support