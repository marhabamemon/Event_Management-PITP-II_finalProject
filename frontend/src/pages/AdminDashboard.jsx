import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import LoadingSpinner from '../components/LoadingSpinner'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    eventCount: 0,
    bookingCount: 0
  })
  const [users, setUsers] = useState([])
  const [events, setEvents] = useState([])
  const [reviews, setReviews] = useState([])
  const [activeTab, setActiveTab] = useState('stats')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchStats()
    fetchUsers()
    fetchEvents()
    fetchReviews()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/analytics')
      setStats(response.data)
    } catch (err) {
      setError('Failed to load stats')
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users')
      setUsers(response.data.users)
    } catch (err) {
      console.error('Failed to load users')
    }
  }

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events/admin/all')
      setEvents(response.data.events)
    } catch (err) {
      console.error('Failed to load events')
    }
  }

  const fetchReviews = async () => {
    try {
      const response = await api.get('/reviews/admin/all')
      setReviews(response.data.reviews)
    } catch (err) {
      console.error('Failed to load reviews')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return

    try {
      await api.delete(`/admin/users/${userId}`)
      setUsers(users.filter(user => user._id !== userId))
    } catch (err) {
      setError('Failed to delete user')
    }
  }

  const handleApproveEvent = async (eventId) => {
    try {
      await api.put(`/events/${eventId}/approve`)
      setEvents(events.map(event =>
        event._id === eventId ? { ...event, status: 'approved' } : event
      ))
    } catch (err) {
      setError('Failed to approve event')
    }
  }

  const handleRejectEvent = async (eventId) => {
    try {
      await api.put(`/events/${eventId}/reject`)
      setEvents(events.map(event =>
        event._id === eventId ? { ...event, status: 'rejected' } : event
      ))
    } catch (err) {
      setError('Failed to reject event')
    }
  }

  if (loading) return <LoadingSpinner message="Loading admin dashboard..." />

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      {error && <div className="error">{error}</div>}

      <div className="card">
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <button
            className={`btn ${activeTab === 'stats' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('stats')}
          >
            Statistics
          </button>
          <button
            className={`btn ${activeTab === 'users' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('users')}
          >
            Manage Users
          </button>
          <button
            className={`btn ${activeTab === 'events' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('events')}
          >
            Manage Events
          </button>
          <button
            className={`btn ${activeTab === 'reviews' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('reviews')}
          >
            View Reviews
          </button>
        </div>

        {activeTab === 'stats' && (
          <div>
            <h2>Platform Statistics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
              <div style={{ textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
                <h3 style={{ color: '#007bff', fontSize: '2rem' }}>{stats.userCount}</h3>
                <p>Total Users</p>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
                <h3 style={{ color: '#28a745', fontSize: '2rem' }}>{stats.eventCount}</h3>
                <p>Total Events</p>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
                <h3 style={{ color: '#ffc107', fontSize: '2rem' }}>{stats.bookingCount}</h3>
                <p>Total Bookings</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h2>Manage Users</h2>
            <div className="grid">
              {users.map(user => (
                <div key={user._id} className="card">
                  <h3>{user.name}</h3>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(user._id)}
                    style={{ marginTop: '10px' }}
                  >
                    Delete User
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <h2>Manage Events</h2>
            <div className="grid">
              {events.map(event => (
                <div key={event._id} className="card">
                  <h3>{event.title}</h3>
                  <p>{event.description.substring(0, 100)}...</p>
                  <p><strong>Status:</strong>
                    <span className={`badge ${event.status === 'approved' ? 'badge-success' : event.status === 'rejected' ? 'badge-danger' : 'badge-warning'}`}>
                      {event.status}
                    </span>
                  </p>
                  <p><strong>Created by:</strong> {event.createdBy.name}</p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    {event.status === 'pending' && (
                      <>
                        <button
                          className="btn btn-success"
                          onClick={() => handleApproveEvent(event._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRejectEvent(event._id)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h2>Customer Reviews</h2>
            <div className="grid">
              {reviews.map(review => (
                <div key={review._id} className="card">
                  <h3>{review.event.title}</h3>
                  <p><strong>By:</strong> {review.user.name}</p>
                  <p><strong>Rating:</strong> {'⭐'.repeat(review.rating)}</p>
                  <p>{review.comment}</p>
                  <p><strong>Date:</strong> {new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard