import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AuthenticationGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const publicRoutes = ['/user-login', '/user-registration'];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('user');
      
      if (token && user) {
        try {
          const userData = JSON.parse(user);
          if (userData && userData.id) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
          }
        } catch (error) {
          setIsAuthenticated(false);
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      } else {
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
    };

    checkAuthStatus();

    const handleStorageChange = (e) => {
      if (e.key === 'authToken' || e.key === 'user') {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isPublicRoute) {
      window.location.href = '/user-login';
    }
  }, [isAuthenticated, isLoading, isPublicRoute]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-text-secondary text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && !isPublicRoute) {
    return null;
  }

  return React.cloneElement(children, { 
    isAuthenticated,
    isPublicRoute 
  });
};

export default AuthenticationGuard;