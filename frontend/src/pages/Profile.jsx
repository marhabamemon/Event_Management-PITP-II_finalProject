import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import api from '../api'
import LoadingSpinner from '../components/LoadingSpinner'

const Profile = () => {
  const { user } = useSelector(state => state.auth)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
    reminderDaysBefore: 1
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await api.get('/auth/profile')
      setProfile(response.data)
      setFormData({
        name: response.data.name,
        phone: response.data.phone || '',
        bio: response.data.bio || '',
        reminderDaysBefore: response.data.reminderDaysBefore || 1
      })
    } catch (err) {
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const response = await api.put('/auth/profile', formData)
      setProfile(response.data.user)
      setSuccess('Profile updated successfully!')
      setEditing(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
    }
  }

  if (loading) return <LoadingSpinner message="Loading profile..." />

  return (
    <div className="container">
      <h1>My Profile</h1>

      <div className="card">
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        {editing ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about yourself..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="reminderDaysBefore">Reminder Days Before Event</label>
              <input
                type="number"
                id="reminderDaysBefore"
                name="reminderDaysBefore"
                value={formData.reminderDaysBefore}
                onChange={handleChange}
                min="0"
                max="30"
              />
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button type="submit" className="btn btn-success">Save Changes</button>
              <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h3>{profile.name}</h3>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Role:</strong> {profile.role}</p>
              {profile.phone && <p><strong>Phone:</strong> {profile.phone}</p>}
              {profile.bio && <p><strong>Bio:</strong> {profile.bio}</p>}
              <p><strong>Reminder Days Before Event:</strong> {profile.reminderDaysBefore}</p>
              <p><strong>Member since:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
            </div>
            <button className="btn" onClick={() => setEditing(true)}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile