import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom'

// Carga diferida para TODAS las vistas — el chunk inicial queda mínimo
const LandingPage = lazy(() => import('./LandingPage'))
const BarDemo = lazy(() => import('./BarDemo'))
const SnackDemo = lazy(() => import('./SnackDemo'))
const RestaurantDemo = lazy(() => import('./RestaurantDemo'))
const AdminDashboard = lazy(() => import('./AdminDashboard'))
const HorangiMenuDemo = lazy(() => import('./HorangiMenuDemo'))
const SanRemoDemo = lazy(() => import('./SanRemoDemo'))
const TazaVivaDemo = lazy(() => import('./TazaVivaDemo'))
const VeggieMenuDemo = lazy(() => import('./VeggieMenuDemo'))
const SaulEventosDemo = lazy(() => import('./SaulEventosDemo'))
const MalosaHouseDemo = lazy(() => import('./MalosaHouseDemo'))

function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D0F0E]">
      <div className="w-10 h-10 border-4 border-white/10 border-t-orange-500 rounded-full animate-spin mb-4"></div>
      <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Cargando...</p>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <ScrollToTop />
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage onOpenDemo={(id) => navigate(`/${id}`)} />} />
        
        {/* Restaurantes Base */}
        <Route path="/bar" element={<BarDemo onBack={() => navigate('/')} onAdmin={() => navigate('/bar_admin')} />} />
        <Route path="/snack" element={<SnackDemo onBack={() => navigate('/')} onAdmin={() => navigate('/snack_admin')} />} />
        <Route path="/restaurant" element={<RestaurantDemo onBack={() => navigate('/')} onAdmin={() => navigate('/restaurant_admin')} />} />
        
        {/* Paneles de Administración */}
        <Route path="/bar_admin" element={<AdminDashboard domain="bar" onBack={() => navigate('/bar')} />} />
        <Route path="/snack_admin" element={<AdminDashboard domain="snack" onBack={() => navigate('/snack')} />} />
        <Route path="/restaurant_admin" element={<AdminDashboard domain="restaurant" onBack={() => navigate('/restaurant')} />} />
        <Route path="/malosahouse_admin" element={<AdminDashboard domain="malosahouse" onBack={() => navigate('/malosahouse')} />} />
        
        {/* Restaurantes Premium / Estilizados */}
        <Route path="/catmenu" element={<HorangiMenuDemo onBack={() => navigate('/')} />} />
        <Route path="/sanremo" element={<SanRemoDemo onBack={() => navigate('/')} />} />
        <Route path="/tazaviva" element={<TazaVivaDemo onBack={() => navigate('/')} />} />
        <Route path="/veggie" element={<VeggieMenuDemo onBack={() => navigate('/')} />} />
        <Route path="/sauleventos" element={<SaulEventosDemo onBack={() => navigate('/')} />} />
        <Route path="/malosahouse" element={<MalosaHouseDemo onBack={() => navigate('/')} />} />
        
        {/* Fallback Catch-All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
