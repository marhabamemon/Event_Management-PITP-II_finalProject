import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api'
import LoadingSpinner from '../components/LoadingSpinner'

const CreateEditEvent = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    startDate: '',
    endDate: '',
    capacity: '',
    price: '',
    tags: ''
  })
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(isEditing)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [templates, setTemplates] = useState([])
  const [showTemplates, setShowTemplates] = useState(false)
  const [templateName, setTemplateName] = useState('')

  const categories = [
    'Music', 'Sports', 'Technology', 'Business', 'Arts', 'Education',
    'Health', 'Food', 'Travel', 'Entertainment', 'Other'
  ]

  useEffect(() => {
    if (isEditing) {
      fetchEvent()
    }
    fetchTemplates()
  }, [id])

  const fetchEvent = async () => {
    try {
      const response = await api.get(`/events/${id}`)
      const event = response.data
      setFormData({
        title: event.title,
        description: event.description,
        category: event.category,
        location: event.location,
        startDate: event.startDate ? new Date(event.startDate).toISOString().slice(0, 16) : '',
        endDate: event.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : '',
        capacity: event.capacity,
        price: event.price,
        tags: event.tags ? event.tags.join(', ') : ''
      })
    } catch (err) {
      setError('Failed to load event')
    } finally {
      setFetchLoading(false)
    }
  }

  const fetchTemplates = async () => {
    try {
      const response = await api.get('/templates')
      setTemplates(response.data)
    } catch (err) {
      console.error('Failed to load templates')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSaveTemplate = async () => {
    if (!templateName.trim()) {
      setError('Please enter a template name')
      return
    }
    try {
      const templateData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        capacity: parseInt(formData.capacity),
        price: parseFloat(formData.price),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }
      await api.post('/templates', { name: templateName, templateData })
      setSuccess('Template saved successfully!')
      setTemplateName('')
      fetchTemplates()
    } catch (err) {
      setError('Failed to save template')
    }
  }

  const handleLoadTemplate = (template) => {
    setFormData({
      ...formData,
      title: template.templateData.title || '',
      description: template.templateData.description || '',
      category: template.templateData.category || '',
      location: template.templateData.location || '',
      capacity: template.templateData.capacity || '',
      price: template.templateData.price || '',
      tags: template.templateData.tags ? template.templateData.tags.join(', ') : ''
    })
    setShowTemplates(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const eventData = {
        ...formData,
        capacity: parseInt(formData.capacity),
        price: parseFloat(formData.price),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }

      if (isEditing) {
        await api.put(`/events/${id}`, eventData)
        setSuccess('Event updated successfully!')
      } else {
        await api.post('/events', eventData)
        setSuccess('Event created successfully!')
      }

      setTimeout(() => {
        navigate('/organizer')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save event')
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) return <LoadingSpinner message="Loading event..." />

  return (
    <div className="container">
      <h1>{isEditing ? 'Edit Event' : 'Create New Event'}</h1>

      <div className="card">
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Event Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter event title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Describe your event"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Event location"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label htmlFor="startDate">Start Date & Time *</label>
              <input
                type="datetime-local"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date & Time *</label>
              <input
                type="datetime-local"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label htmlFor="capacity">Capacity *</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                min="1"
                placeholder="Maximum attendees"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price ($)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="music, concert, live"
            />
          </div>

          <div className="form-group">
            <label>Templates</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowTemplates(!showTemplates)}
              >
                {showTemplates ? 'Hide Templates' : 'Load Template'}
              </button>
              <input
                type="text"
                placeholder="Template name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                style={{ flex: 1 }}
              />
              <button
                type="button"
                className="btn btn-info"
                onClick={handleSaveTemplate}
              >
                Save as Template
              </button>
            </div>
            {showTemplates && (
              <div style={{ marginTop: '10px', maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
                {templates.length === 0 ? (
                  <p>No templates saved yet.</p>
                ) : (
                  templates.map(template => (
                    <div key={template._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                      <span>{template.name}</span>
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => handleLoadTemplate(template)}
                      >
                        Load
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? 'Saving...' : (isEditing ? 'Update Event' : 'Create Event')}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/organizer')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEditEvent