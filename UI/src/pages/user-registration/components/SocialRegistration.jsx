import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialRegistration = ({ onSocialRegister, isLoading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
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

  return (
    <div className="space-y-3">
      <div className="text-center">
        <p className="text-sm text-text-secondary mb-4">Quick registration with</p>
      </div>
      
      {socialProviders.map((provider) => (
        <Button
          key={provider.id}
          variant="outline"
          fullWidth
          onClick={() => onSocialRegister(provider.id)}
          disabled={isLoading}
          className={`
            ${provider.bgColor} ${provider.textColor} ${provider.borderColor}
            hover:opacity-90 transition-opacity duration-200
            py-3 text-base font-medium
          `}
        >
          <div className="flex items-center justify-center gap-3">
            <Icon name={provider.icon} size={20} />
            <span>Continue with {provider.name}</span>
          </div>
        </Button>
      ))}
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-text-secondary">Or register with email</span>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;