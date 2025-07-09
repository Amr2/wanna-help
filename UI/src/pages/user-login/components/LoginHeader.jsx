import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <Link 
        to="/"
        className="inline-flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity duration-200"
      >
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <Icon name="Heart" size={24} color="white" />
        </div>
        <span className="text-2xl font-bold text-text-primary font-heading">
          Wanna Help
        </span>
      </Link>

      {/* Welcome Text */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Welcome Back
        </h1>
        <p className="text-text-secondary text-lg">
          Sign in to your account to continue
        </p>
      </div>

      {/* Sign Up Link */}
      <div className="flex items-center justify-center gap-2 text-sm">
        <span className="text-text-secondary">
          Don't have an account?
        </span>
        <Link to="/user-registration">
          <Button variant="link" className="p-0 h-auto font-medium">
            Sign up here
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginHeader;