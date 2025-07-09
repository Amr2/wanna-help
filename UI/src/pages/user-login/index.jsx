import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import SocialLogin from './components/SocialLogin';
import LoginForm from './components/LoginForm';
import ForgotPasswordLink from './components/ForgotPasswordLink';

const UserLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [lockoutTime, setLockoutTime] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const navigate = useNavigate();

  // Mock credentials for demonstration
  const mockCredentials = {
    requester: {
      email: "requester@wannahelp.com",
      password: "requester123"
    },
    provider: {
      email: "provider@wannahelp.com",
      password: "provider123"
    },
    admin: {
      email: "admin@wannahelp.com",
      password: "admin123"
    }
  };

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/dashboard');
    }

    // Check for lockout
    const lockout = localStorage.getItem('loginLockout');
    if (lockout) {
      const lockoutData = JSON.parse(lockout);
      const now = new Date().getTime();
      if (now < lockoutData.until) {
        setLockoutTime(lockoutData.until);
        setError(`Account temporarily locked. Try again in ${Math.ceil((lockoutData.until - now) / 60000)} minutes.`);
      } else {
        localStorage.removeItem('loginLockout');
      }
    }

    // Get attempt count
    const attempts = localStorage.getItem('loginAttempts');
    if (attempts) {
      setAttemptCount(parseInt(attempts));
    }
  }, [navigate]);

  const handleLogin = async (formData) => {
    if (lockoutTime && new Date().getTime() < lockoutTime) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check credentials against mock data
      const isValidCredentials = Object.values(mockCredentials).some(
        cred => cred.email === formData.email && cred.password === formData.password
      );

      if (isValidCredentials) {
        // Determine user type
        let userType = 'requester';
        if (formData.email === mockCredentials.provider.email) {
          userType = 'provider';
        } else if (formData.email === mockCredentials.admin.email) {
          userType = 'admin';
        }

        // Create user data
        const userData = {
          id: Date.now(),
          email: formData.email,
          name: userType === 'requester' ? 'John Doe' : userType === 'provider' ? 'Jane Smith' : 'Admin User',
          type: userType,
          avatar: `https://randomuser.me/api/portraits/${userType === 'provider' ? 'women' : 'men'}/32.jpg`,
          joinedDate: new Date().toISOString(),
          isVerified: true
        };

        // Store authentication data
        const authToken = `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userRole', userType);

        // Set remember me
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        // Clear login attempts
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('loginLockout');

        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        // Handle failed login
        const newAttemptCount = attemptCount + 1;
        setAttemptCount(newAttemptCount);
        localStorage.setItem('loginAttempts', newAttemptCount.toString());

        if (newAttemptCount >= 5) {
          // Lock account for 15 minutes
          const lockoutUntil = new Date().getTime() + (15 * 60 * 1000);
          localStorage.setItem('loginLockout', JSON.stringify({ until: lockoutUntil }));
          setLockoutTime(lockoutUntil);
          setError('Too many failed attempts. Account locked for 15 minutes.');
        } else {
          setError(`Invalid email or password. ${5 - newAttemptCount} attempts remaining.`);
        }
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate social login delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock social login success
      const userData = {
        id: Date.now(),
        email: `user@${provider}.com`,
        name: provider === 'google' ? 'Google User' : 'Facebook User',
        type: 'requester',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        joinedDate: new Date().toISOString(),
        isVerified: true,
        socialProvider: provider
      };

      const authToken = `social_${provider}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userRole', 'requester');

      navigate('/dashboard');
    } catch (err) {
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <LoginHeader />
          
          <div className="bg-surface rounded-2xl shadow-lg border border-border p-8">
            <SocialLogin 
              onSocialLogin={handleSocialLogin}
              isLoading={isLoading}
            />
            
            <div className="mt-6">
              <LoginForm
                onSubmit={handleLogin}
                isLoading={isLoading}
                error={error}
              />
            </div>
            
            <div className="mt-6">
              <ForgotPasswordLink />
            </div>
          </div>

          {/* Mock Credentials Info */}
          <div className="mt-8 p-4 bg-accent-50 border border-accent-200 rounded-lg">
            <h3 className="text-sm font-medium text-accent-700 mb-2">Demo Credentials:</h3>
            <div className="text-xs text-accent-600 space-y-1">
              <div><strong>Requester:</strong> requester@wannahelp.com / requester123</div>
              <div><strong>Provider:</strong> provider@wannahelp.com / provider123</div>
              <div><strong>Admin:</strong> admin@wannahelp.com / admin123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;