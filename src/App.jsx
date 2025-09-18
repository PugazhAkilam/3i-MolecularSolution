import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/routes';
import { ThemeContextProvider } from './context/ThemeContext';

function App() {
  return (
    <Router>
      <ThemeContextProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider> 
      </ThemeContextProvider>
    </Router>
  );
}

export default App;