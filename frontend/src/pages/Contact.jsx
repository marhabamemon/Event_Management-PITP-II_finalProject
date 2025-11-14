const Contact = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>Get in touch with us. We'd love to hear from you.</p>
        </div>
      </section>

      {/* Contact Section */}
      <div className="container">
        <div className="contact-content">
          <div className="contact-form">
            <h2>Send us a message</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
          <div className="contact-info">
            <div className="contact-card">
              <div className="feature-icon">📧</div>
              <h3>Email</h3>
              <p>info@eventmanager.com</p>
              <p>support@eventmanager.com</p>
            </div>
            <div className="contact-card">
              <div className="feature-icon">📞</div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
              <p>Monday - Friday, 9 AM - 6 PM EST</p>
            </div>
            <div className="contact-card">
              <div className="feature-icon">📍</div>
              <h3>Address</h3>
              <p>123 Event Street</p>
              <p>Event City, EC 12345</p>
              <p>United States</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact