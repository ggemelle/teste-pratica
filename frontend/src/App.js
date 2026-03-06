import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import Technicians from './pages/Technicians';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('auth') === 'true'
  );

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <Technicians onLogout={handleLogout} />
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;