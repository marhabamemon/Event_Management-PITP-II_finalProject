import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../api'
import LoadingSpinner from '../components/LoadingSpinner'

const EventDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token } = useSelector(state => state.auth)
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isBooked, setIsBooked] = useState(false)
  const [isAttended, setIsAttended] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [reviews, setReviews] = useState([])
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })

  useEffect(() => {
    fetchEvent()
    fetchReviews()
    checkIfBooked()
    checkIfFavorited()
  }, [id])

  const checkIfBooked = async () => {
    if (!token) return
    try {
      const response = await api.get('/bookings')
      const booking = response.data.find(booking => booking.event._id === id)
      setIsBooked(booking ? true : false)
      // For review, check if attended
      setIsAttended(booking && booking.attended)
    } catch (err) {
      console.error('Failed to check booking status')
    }
  }

  const checkIfFavorited = async () => {
    if (!token) return
    try {
      const response = await api.get('/favorites')
      const favorited = response.data.some(favorite => favorite.event._id === id)
      setIsFavorited(favorited)
    } catch (err) {
      console.error('Failed to check favorite status')
    }
  }

  const fetchEvent = async () => {
    try {
      const response = await api.get(`/events/${id}`)
      setEvent(response.data)
    } catch (err) {
      setError('Failed to load event')
    } finally {
      setLoading(false)
    }
  }

  const fetchReviews = async () => {
    try {
      const response = await api.get(`/reviews/event/${id}`)
      setReviews(response.data)
    } catch (err) {
      console.error('Failed to load reviews')
    }
  }

  const handleBooking = async () => {
    if (!token) {
      navigate('/login')
      return
    }

    setBookingLoading(true)
    setError('')
    setSuccess('')

    try {
      await api.post('/bookings', { eventId: id })
      setSuccess('Booking confirmed! Check your dashboard for details.')
      setIsBooked(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed')
    } finally {
      setBookingLoading(false)
    }
  }

  const handleFavorite = async () => {
    if (!token) {
      navigate('/login')
      return
    }

    try {
      if (isFavorited) {
        await api.delete(`/favorites/${id}`)
        setIsFavorited(false)
      } else {
        await api.post('/favorites', { eventId: id })
        setIsFavorited(true)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update favorite')
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (!token) {
      navigate('/login')
      return
    }

    try {
      await api.post('/reviews', { eventId: id, ...reviewForm })
      setSuccess('Review submitted successfully!')
      setShowReviewForm(false)
      setReviewForm({ rating: 5, comment: '' })
      fetchReviews()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review')
    }
  }

  if (loading) return <LoadingSpinner message="Loading event..." />
  if (error && !event) return <div className="container"><div className="error">{error}</div></div>
  if (!event) return <div className="container">Event not found</div>

  const eventDate = new Date(event.startDate)
  const isPastEvent = new Date(event.endDate) < new Date()

  return (
    <div className="container">
      <div className="card">
        <h1>{event.title}</h1>
        {event.category && <span className="badge badge-primary">{event.category}</span>}

        <div style={{ margin: '20px 0' }}>
          <p style={{ fontSize: '18px', lineHeight: '1.6' }}>{event.description}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div>
            <h3>📅 Date & Time</h3>
            <p>{eventDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
            <p>{eventDate.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>

          <div>
            <h3>📍 Location</h3>
            <p>{event.location}</p>
          </div>

          <div>
            <h3>💰 Price</h3>
            <p className="event-price">${event.price}</p>
          </div>

          <div>
            <h3>👥 Capacity</h3>
            <p>{event.capacity} attendees</p>
          </div>
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {!isPastEvent && !isBooked && (
            <button
              className="btn btn-success"
              onClick={handleBooking}
              disabled={bookingLoading}
            >
              {bookingLoading ? 'Booking...' : 'Book Now'}
            </button>
          )}

          {isBooked && (
            <button className="btn btn-secondary" disabled>
              ✓ Already Booked
            </button>
          )}

          {isPastEvent && (
            <button className="btn btn-secondary" disabled>
              Event Passed
            </button>
          )}

          <button
            className={`btn ${isFavorited ? 'btn-danger' : 'btn-warning'}`}
            onClick={handleFavorite}
          >
            {isFavorited ? '❤️ Favorited' : '🤍 Add to Favorites'}
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => navigate('/events')}
          >
            Back to Events
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="card">
        <h2>Reviews</h2>

        {token && isAttended && (
          <div style={{ marginBottom: '20px' }}>
            <button
              className="btn"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              {showReviewForm ? 'Cancel Review' : 'Write a Review'}
            </button>
          </div>
        )}

        {showReviewForm && (
          <form onSubmit={handleSubmitReview} style={{ marginBottom: '20px' }}>
            <div className="form-group">
              <label>Rating</label>
              <select
                value={reviewForm.rating}
                onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                required
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                <option value={4}>⭐⭐⭐⭐ (4)</option>
                <option value={3}>⭐⭐⭐ (3)</option>
                <option value={2}>⭐⭐ (2)</option>
                <option value={1}>⭐ (1)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Comment</label>
              <textarea
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                required
                rows="4"
                placeholder="Share your experience..."
              />
            </div>
            <button type="submit" className="btn btn-success">Submit Review</button>
          </form>
        )}

        <div>
          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first to review this event!</p>
          ) : (
            reviews.map(review => (
              <div key={review._id} style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>{review.user.name}</strong>
                  <span>{'⭐'.repeat(review.rating)}</span>
                </div>
                <p>{review.comment}</p>
                <small style={{ color: '#666' }}>{new Date(review.createdAt).toLocaleDateString()}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default EventDetails