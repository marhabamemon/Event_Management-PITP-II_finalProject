import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import LoadingSpinner from '../components/LoadingSpinner'

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([])
  const [attendees, setAttendees] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchMyEvents()
  }, [])

  const fetchMyEvents = async () => {
    try {
      const response = await api.get('/events/my-events')
      setEvents(response.data.events)
    } catch (err) {
      setError('Failed to load events')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return

    try {
      await api.delete(`/events/${eventId}`)
      setEvents(events.filter(event => event._id !== eventId))
    } catch (err) {
      setError('Failed to delete event')
    }
  }

  const handleViewAttendees = async (eventId) => {
    if (attendees[eventId]) {
      setAttendees({ ...attendees, [eventId]: null })
      return
    }

    try {
      const response = await api.get(`/events/${eventId}/attendees`)
      setAttendees({ ...attendees, [eventId]: response.data })
    } catch (err) {
      setError('Failed to load attendees')
    }
  }

  if (loading) return <LoadingSpinner message="Loading your events..." />

  return (
    <div className="container">
      <h1>Organizer Dashboard</h1>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>My Events</h2>
          <Link to="/create-event" className="btn btn-success">Create New Event</Link>
        </div>

        {error && <div className="error">{error}</div>}

        {events.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h3>You haven't created any events yet</h3>
            <p>Start organizing events to engage with your community!</p>
            <Link to="/create-event" className="btn btn-success" style={{ marginTop: '20px' }}>
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid">
            {events.map(event => (
              <div key={event._id} className="card">
                <h3>{event.title}</h3>
                <p>{event.description.substring(0, 100)}...</p>
                <p><strong>Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Capacity:</strong> {event.capacity}</p>
                <p><strong>Price:</strong> ${event.price}</p>

                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <Link to={`/edit-event/${event._id}`} className="btn btn-secondary">
                    Edit
                  </Link>
                  <button
                    className="btn btn-info"
                    onClick={() => handleViewAttendees(event._id)}
                  >
                    {attendees[event._id] ? 'Hide Attendees' : 'View Attendees'}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteEvent(event._id)}
                  >
                    Delete
                  </button>
                </div>
  
                {attendees[event._id] && (
                  <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
                    <h4>Attendees ({attendees[event._id].length})</h4>
                    {attendees[event._id].length === 0 ? (
                      <p>No attendees yet.</p>
                    ) : (
                      <ul>
                        {attendees[event._id].map(booking => (
                          <li key={booking._id}>
                            {booking.user.name} - {booking.user.email} {booking.user.phone && `(${booking.user.phone})`}
                            {booking.attended && ' ✓ Attended'}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h2>Analytics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <h3>{events.length}</h3>
            <p>Total Events</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3>{events.reduce((sum, event) => sum + event.capacity, 0)}</h3>
            <p>Total Capacity</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3>${events.reduce((sum, event) => sum + (event.price * event.capacity), 0)}</h3>
            <p>Potential Revenue</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganizerDashboard