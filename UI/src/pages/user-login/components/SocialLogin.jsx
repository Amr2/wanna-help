import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLogin = ({ onSocialLogin, isLoading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white',
      textColor: 'text-text-primary',
      borderColor: 'border-border'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    }
  ];

  const handleSocialLogin = (provider) => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-surface text-text-secondary">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            onClick={() => handleSocialLogin(provider.id)}
            disabled={isLoading}
            className={`
              h-12 flex items-center justify-center gap-3
              ${provider.bgColor} ${provider.textColor} ${provider.borderColor}
              hover:opacity-90 transition-opacity duration-200
            `}
          >
            <Icon name={provider.icon} size={20} />
            <span className="font-medium">
              {provider.name}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;