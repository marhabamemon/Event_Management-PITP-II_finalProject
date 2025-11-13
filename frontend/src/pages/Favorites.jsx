import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import LoadingSpinner from '../components/LoadingSpinner'

const Favorites = () => {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/favorites')
      setFavorites(response.data)
    } catch (err) {
      setError('Failed to load favorites')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFavorite = async (eventId) => {
    if (!window.confirm('Remove from favorites?')) return

    try {
      await api.delete(`/favorites/${eventId}`)
      setFavorites(favorites.filter(fav => fav.event._id !== eventId))
    } catch (err) {
      setError('Failed to remove favorite')
    }
  }

  if (loading) return <LoadingSpinner message="Loading favorites..." />

  return (
    <div className="container">
      <h1>My Favorite Events</h1>

      {error && <div className="error">{error}</div>}

      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3>No favorite events yet</h3>
          <p>Browse events and add them to your favorites!</p>
          <Link to="/events" className="btn btn-success">
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="grid">
          {favorites.map(favorite => (
            <div key={favorite._id} className="card">
              <h3>{favorite.event.title}</h3>
              <p>{favorite.event.description.substring(0, 100)}...</p>
              <p><strong>Date:</strong> {new Date(favorite.event.startDate).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {favorite.event.location}</p>
              <p><strong>Price:</strong> ${favorite.event.price}</p>

              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <Link to={`/events/${favorite.event._id}`} className="btn btn-primary">
                  View Details
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveFavorite(favorite.event._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites