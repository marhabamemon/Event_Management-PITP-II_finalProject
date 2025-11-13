import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import LoadingSpinner from '../components/LoadingSpinner'

const EventList = () => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('date')

  useEffect(() => {
    fetchEvents()
  }, [])

  useEffect(() => {
    filterAndSortEvents()
  }, [events, searchTerm, selectedCategory, sortBy])

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events')
      setEvents(response.data)
    } catch (err) {
      setError('Failed to load events')
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortEvents = () => {
    let filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || event.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.startDate) - new Date(b.startDate)
        case 'price':
          return a.price - b.price
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    setFilteredEvents(filtered)
  }

  const categories = [...new Set(events.map(event => event.category).filter(Boolean))]

  if (loading) return <LoadingSpinner message="Loading events..." />
  if (error) return <div className="container"><div className="error">{error}</div></div>

  return (
    <div className="container">
      <h1>Discover Events</h1>

      <div className="search-bar">
        <div className="form-group">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Sort by Date</option>
            <option value="price">Sort by Price</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      <div className="grid">
        {filteredEvents.map(event => (
          <Link key={event._id} to={`/events/${event._id}`} className="event-card">
            <div className="event-card-content">
              <h3>{event.title}</h3>
              <p>{event.description.substring(0, 100)}...</p>
              <p><strong>Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <div className="event-price">${event.price}</div>
              {event.category && <span className="badge badge-primary">{event.category}</span>}
            </div>
          </Link>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>No events found</h3>
          <p>Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  )
}

export default EventList