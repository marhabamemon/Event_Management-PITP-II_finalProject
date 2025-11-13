import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import api from '../api'
import LoadingSpinner from '../components/LoadingSpinner'

const Dashboard = () => {
  const { user } = useSelector(state => state.auth)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  if (loading) return <LoadingSpinner message="Loading dashboard..." />

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <div className="card">
        <h2>Welcome back, {user?.name}!</h2>
        <p><strong>Role:</strong> {user?.role}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>


      {user?.role === 'organizer' && (
        <div className="card">
          <h2>Organizer Actions</h2>
          <Link to="/organizer" className="btn">Manage My Events</Link>
        </div>
      )}

      {user?.role === 'admin' && (
        <div className="card">
          <h2>Admin Actions</h2>
          <Link to="/admin" className="btn">Admin Dashboard</Link>
        </div>
      )}
    </div>
  )
}

export default Dashboard