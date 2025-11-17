import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import HomePage from './components/HomePage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import AboutPage from './components/AboutPage';
import DetailPage from './components/DetailPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/competition/:id" element={<DetailPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}