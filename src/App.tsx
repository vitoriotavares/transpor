import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Transcriptions from './pages/Transcriptions';
import Settings from './pages/Settings';
import Pricing from './pages/Pricing';
import AdminDashboard from './pages/admin/AdminDashboard';
import ResourceUsage from './pages/admin/ResourceUsage';
import BusinessMetrics from './pages/admin/BusinessMetrics';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock authentication state - in a real app, this would come from your auth context/provider
  const isAuthenticated = true;
  const isAdmin = true; // For testing admin routes

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Admin routes */}
          <Route path="/admin" element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/" replace />}>
            <Route path="resources" element={<ResourceUsage />} />
            <Route path="business-metrics" element={<BusinessMetrics />} />
            {/* Additional admin routes will go here */}
          </Route>
          
          {/* Standard app routes with sidebar and header */}
          <Route 
            path="/*" 
            element={
              <div className="flex h-screen overflow-hidden">
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <Header openSidebar={() => setSidebarOpen(true)} />
                  <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/transcriptions" element={<Transcriptions />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                </div>
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
