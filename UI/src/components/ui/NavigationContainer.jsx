import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthenticationGuard from './AuthenticationGuard';
import Header from './Header';

const NavigationContainer = ({ children }) => {
  return (
    <Router>
      <AuthenticationGuard>
        {({ isAuthenticated, isPublicRoute }) => (
          <div className="min-h-screen bg-background">
            <Header 
              isAuthenticated={isAuthenticated}
              isPublicRoute={isPublicRoute}
            />
            
            <main className={`${isAuthenticated ? 'pt-16' : 'pt-16'}`}>
              {children}
            </main>
          </div>
        )}
      </AuthenticationGuard>
    </Router>
  );
};

export default NavigationContainer;