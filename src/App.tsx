import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/ProjectsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AutomationPage from './pages/AutomationPage';
import AIEnginePage from './pages/AIEnginePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Routes>
      {/* Marketing */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<AboutUs />} />

      {/* Dashboard — each page is a full layout (Sidebar + TopBar + content) */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/projects" element={<ProjectsPage />} />
      <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
      <Route path="/dashboard/automation" element={<AutomationPage />} />
      <Route path="/dashboard/ai-engine" element={<AIEnginePage />} />
      <Route path="/dashboard/settings" element={<SettingsPage />} />
    </Routes>
  );
}

export default App;
