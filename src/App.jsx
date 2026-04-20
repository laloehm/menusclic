import React, { useState, useEffect, lazy, Suspense } from 'react'

// Carga diferida para TODAS las vistas — el chunk inicial queda mínimo
const LandingPage = lazy(() => import('./LandingPage'))
const BarDemo = lazy(() => import('./BarDemo'))
const SnackDemo = lazy(() => import('./SnackDemo'))
const RestaurantDemo = lazy(() => import('./RestaurantDemo'))
const AdminDashboard = lazy(() => import('./AdminDashboard'))

function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D0F0E]">
      <div className="w-10 h-10 border-4 border-white/10 border-t-orange-500 rounded-full animate-spin mb-4"></div>
      <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Cargando...</p>
    </div>
  )
}

function App() {
  const [currentView, setCurrentView] = useState('landing')

  // Handle hash changes for navigation and scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['restaurant', 'snack', 'bar', 'restaurant_admin', 'snack_admin', 'bar_admin'].includes(hash)) {
        setCurrentView(hash);
      }
    };
    
    // Check initial hash on load
    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const view = currentView.toLowerCase().trim()

  return (
    <Suspense fallback={<LoadingScreen />}>
      {view === 'bar' && <BarDemo onBack={() => setCurrentView('landing')} onAdmin={() => setCurrentView('bar_admin')} />}
      {view === 'snack' && <SnackDemo onBack={() => setCurrentView('landing')} onAdmin={() => setCurrentView('snack_admin')} />}
      {view === 'restaurant' && <RestaurantDemo onBack={() => setCurrentView('landing')} onAdmin={() => setCurrentView('restaurant_admin')} />}
      {view === 'restaurant_admin' && <AdminDashboard domain="restaurant" onBack={() => setCurrentView('restaurant')} />}
      {view === 'snack_admin' && <AdminDashboard domain="snack" onBack={() => setCurrentView('snack')} />}
      {view === 'bar_admin' && <AdminDashboard domain="bar" onBack={() => setCurrentView('bar')} />}
      {view === 'landing' && <LandingPage onOpenDemo={(id) => setCurrentView(id)} />}
    </Suspense>
  )
}

export default App

