import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ formData, onInputChange, errors, showPassword, onTogglePassword, className = '' }) => {
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const strengthMap = {
      0: { label: 'Very Weak', color: 'bg-error' },
      1: { label: 'Weak', color: 'bg-error' },
      2: { label: 'Fair', color: 'bg-warning' },
      3: { label: 'Good', color: 'bg-warning' },
      4: { label: 'Strong', color: 'bg-success' },
      5: { label: 'Very Strong', color: 'bg-success' }
    };

    return { strength, ...strengthMap[strength] };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-text-primary mb-2">
          Full Name *
        </label>
        <Input
          id="fullName"
          type="text"
          placeholder="Enter your full name"
          value={formData.fullName || ''}
          onChange={(e) => onInputChange('fullName', e.target.value)}
          required
          className={errors.fullName ? 'border-error' : ''}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-error flex items-center gap-1">
            <Icon name="AlertCircle" size={14} />
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address *
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          value={formData.email || ''}
          onChange={(e) => onInputChange('email', e.target.value)}
          required
          className={errors.email ? 'border-error' : ''}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-error flex items-center gap-1">
            <Icon name="AlertCircle" size={14} />
            {errors.email}
          </p>
        )}
        {formData.email && validateEmail(formData.email) && !errors.email && (
          <p className="mt-1 text-sm text-success flex items-center gap-1">
            <Icon name="CheckCircle" size={14} />
            Valid email address
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          Password *
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={formData.password || ''}
            onChange={(e) => onInputChange('password', e.target.value)}
            required
            className={`pr-10 ${errors.password ? 'border-error' : ''}`}
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>
        
        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 bg-secondary-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                  style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-text-secondary">{passwordStrength.label}</span>
            </div>
            <ul className="text-xs text-text-muted space-y-1">
              <li className={`flex items-center gap-1 ${formData.password.length >= 8 ? 'text-success' : ''}`}>
                <Icon name={formData.password.length >= 8 ? "Check" : "X"} size={12} />
                At least 8 characters
              </li>
              <li className={`flex items-center gap-1 ${/[A-Z]/.test(formData.password) ? 'text-success' : ''}`}>
                <Icon name={/[A-Z]/.test(formData.password) ? "Check" : "X"} size={12} />
                One uppercase letter
              </li>
              <li className={`flex items-center gap-1 ${/[0-9]/.test(formData.password) ? 'text-success' : ''}`}>
                <Icon name={/[0-9]/.test(formData.password) ? "Check" : "X"} size={12} />
                One number
              </li>
            </ul>
          </div>
        )}
        
        {errors.password && (
          <p className="mt-1 text-sm text-error flex items-center gap-1">
            <Icon name="AlertCircle" size={14} />
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
          Confirm Password *
        </label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword || ''}
          onChange={(e) => onInputChange('confirmPassword', e.target.value)}
          required
          className={errors.confirmPassword ? 'border-error' : ''}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-error flex items-center gap-1">
            <Icon name="AlertCircle" size={14} />
            {errors.confirmPassword}
          </p>
        )}
        {formData.confirmPassword && formData.password === formData.confirmPassword && !errors.confirmPassword && (
          <p className="mt-1 text-sm text-success flex items-center gap-1">
            <Icon name="CheckCircle" size={14} />
            Passwords match
          </p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-text-primary mb-2">
          Phone Number
        </label>
        <Input
          id="phoneNumber"
          type="tel"
          placeholder="(555) 123-4567"
          value={formData.phoneNumber || ''}
          onChange={(e) => onInputChange('phoneNumber', e.target.value)}
          className={errors.phoneNumber ? 'border-error' : ''}
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-error flex items-center gap-1">
            <Icon name="AlertCircle" size={14} />
            {errors.phoneNumber}
          </p>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;