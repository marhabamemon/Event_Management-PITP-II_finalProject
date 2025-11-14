import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import EventList from './pages/EventList'
import Dashboard from './pages/Dashboard'
import OrganizerDashboard from './pages/OrganizerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import CreateEditEvent from './pages/CreateEditEvent'
import AboutUs from './pages/AboutUs'
import Services from './pages/Services'
import Support from './pages/Support'
import Contact from './pages/Contact'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/organizer" element={<ProtectedRoute roles={['organizer']}><OrganizerDashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/create-event" element={<ProtectedRoute roles={['organizer']}><CreateEditEvent /></ProtectedRoute>} />
          <Route path="/edit-event/:id" element={<ProtectedRoute roles={['organizer']}><CreateEditEvent /></ProtectedRoute>} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App