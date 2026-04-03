import React, { useState, useEffect } from 'react'
import LandingPage from './LandingPage'
import BarDemo from './BarDemo'
import SnackDemo from './SnackDemo'
import RestaurantDemo from './RestaurantDemo'
import AdminDashboard from './AdminDashboard'

function App() {
  const [currentView, setCurrentView] = useState('landing')

  // Scroll to top when changing views
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentView])

  const view = currentView.toLowerCase().trim()

  if (view === 'bar') {
    return <BarDemo onBack={() => setCurrentView('landing')} onAdmin={() => setCurrentView('bar_admin')} />
  }

  if (view === 'snack') {
    return <SnackDemo onBack={() => setCurrentView('landing')} onAdmin={() => setCurrentView('snack_admin')} />
  }

  if (view === 'restaurant') {
    return <RestaurantDemo onBack={() => setCurrentView('landing')} onAdmin={() => setCurrentView('restaurant_admin')} />
  }

  if (view === 'restaurant_admin') {
    return <AdminDashboard domain="restaurant" onBack={() => setCurrentView('restaurant')} />
  }
  if (view === 'snack_admin') {
    return <AdminDashboard domain="snack" onBack={() => setCurrentView('snack')} />
  }
  if (view === 'bar_admin') {
    return <AdminDashboard domain="bar" onBack={() => setCurrentView('bar')} />
  }

  return <LandingPage onOpenDemo={(id) => setCurrentView(id)} />
}

export default App
