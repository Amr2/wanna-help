import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ForgotPasswordLink = () => {
  return (
    <div className="text-center">
      <Link to="/forgot-password">
        <Button 
          variant="link" 
          className="text-sm text-text-secondary hover:text-primary transition-colors duration-200 p-0 h-auto"
        >
          <Icon name="Key" size={16} className="mr-1" />
          Forgot your password?
        </Button>
      </Link>
    </div>
  );
};

export default ForgotPasswordLink;