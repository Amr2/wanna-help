import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Icon from '../AppIcon';
import NotificationBadge from './NotificationBadge';
import UserRoleToggle from './UserRoleToggle';

const Header = ({ isAuthenticated = false, isPublicRoute = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState({
    dashboard: 3,
    messages: 7
  });
  const [userRole, setUserRole] = useState('requester');
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      requiresAuth: true,
      badgeCount: notifications.dashboard,
      roles: ['requester', 'provider']
    },
    {
      label: 'Requests',
      path: '/service-request-creation',
      icon: 'FileText',
      requiresAuth: true,
      badgeCount: 0,
      roles: ['requester', 'provider']
    },
    {
      label: 'Messages',
      path: '/private-chat-system',
      icon: 'MessageCircle',
      requiresAuth: true,
      badgeCount: notifications.messages,
      roles: ['requester', 'provider']
    },
    {
      label: 'Profile',
      path: '/user-profile-management',
      icon: 'User',
      requiresAuth: true,
      badgeCount: 0,
      roles: ['requester', 'provider']
    }
  ];

  const authItems = [
    {
      label: 'Login',
      path: '/user-login',
      icon: 'LogIn',
      requiresAuth: false
    },
    {
      label: 'Register',
      path: '/user-registration',
      icon: 'UserPlus',
      requiresAuth: false
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRoleChange = (newRole) => {
    setUserRole(newRole);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    window.location.href = '/user-login';
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const filteredNavItems = isAuthenticated 
    ? navigationItems.filter(item => item.roles.includes(userRole))
    : authItems;

  return (
    <header className="fixed top-0 left-0 right-0 z-1030 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to={isAuthenticated ? "/dashboard" : "/"}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Heart" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-text-primary font-heading">
              Wanna Help
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200 ease-out
                  ${isActiveRoute(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  }
                `}
                aria-current={isActiveRoute(item.path) ? 'page' : undefined}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
                {item.badgeCount > 0 && (
                  <NotificationBadge 
                    count={item.badgeCount}
                    size="sm"
                    className="absolute -top-1 -right-1"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && (
              <>
                <UserRoleToggle 
                  onRoleChange={handleRoleChange}
                  defaultRole={userRole}
                />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-all duration-200"
                  title="Logout"
                >
                  <Icon name="LogOut" size={18} />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-all duration-200"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-surface">
            <nav className="py-4 space-y-1">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    relative flex items-center gap-3 px-4 py-3 text-base font-medium
                    transition-all duration-200 ease-out
                    ${isActiveRoute(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                    }
                  `}
                  aria-current={isActiveRoute(item.path) ? 'page' : undefined}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="flex-1">{item.label}</span>
                  {item.badgeCount > 0 && (
                    <NotificationBadge 
                      count={item.badgeCount}
                      size="sm"
                    />
                  )}
                </Link>
              ))}
              
              {isAuthenticated && (
                <div className="px-4 py-3 border-t border-border mt-4">
                  <div className="mb-3">
                    <UserRoleToggle 
                      onRoleChange={handleRoleChange}
                      defaultRole={userRole}
                      className="w-full"
                    />
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-all duration-200"
                  >
                    <Icon name="LogOut" size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;