import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import SocialRegistration from './components/SocialRegistration';
import RegistrationForm from './components/RegistrationForm';
import RoleSelection from './components/RoleSelection';
import ProviderDetails from './components/ProviderDetails';
import TermsAgreement from './components/TermsAgreement';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    roles: [],
    businessName: '',
    serviceCategories: [],
    businessDescription: '',
    yearsExperience: ''
  });
  const [errors, setErrors] = useState({});
  const [termsAgreed, setTermsAgreed] = useState(false);

  // Mock credentials for testing
  const mockCredentials = {
    existingEmails: ['john.doe@example.com', 'jane.smith@example.com', 'test@wannahelp.com']
  };

  const steps = [
    { id: 1, title: 'Account Details', icon: 'User' },
    { id: 2, title: 'Choose Role', icon: 'UserCheck' },
    { id: 3, title: 'Provider Info', icon: 'Briefcase', conditional: true },
    { id: 4, title: 'Terms & Finish', icon: 'CheckCircle' }
  ];

  const getVisibleSteps = () => {
    return steps.filter(step => !step.conditional || formData.roles.includes('provider'));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) {
          newErrors.fullName = 'Full name is required';
        }
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        } else if (mockCredentials.existingEmails.includes(formData.email.toLowerCase())) {
          newErrors.email = 'This email is already registered. Please use a different email or sign in.';
        }
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters long';
        }
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        if (formData.phoneNumber && !/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phoneNumber)) {
          newErrors.phoneNumber = 'Please enter a valid phone number format: (555) 123-4567';
        }
        break;

      case 2:
        if (formData.roles.length === 0) {
          newErrors.roles = 'Please select at least one role';
        }
        break;

      case 3:
        if (formData.roles.includes('provider')) {
          if (!formData.businessName.trim()) {
            newErrors.businessName = 'Business name is required';
          }
          if (!formData.serviceCategories || formData.serviceCategories.length === 0) {
            newErrors.serviceCategories = 'Please select at least one service category';
          }
          if (!formData.businessDescription.trim()) {
            newErrors.businessDescription = 'Business description is required';
          } else if (formData.businessDescription.trim().length < 50) {
            newErrors.businessDescription = 'Description must be at least 50 characters long';
          }
          if (formData.yearsExperience && (isNaN(formData.yearsExperience) || formData.yearsExperience < 0)) {
            newErrors.yearsExperience = 'Please enter a valid number of years';
          }
        }
        break;

      case 4:
        if (!termsAgreed) {
          newErrors.agreement = 'You must agree to the Terms of Service and Privacy Policy';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleRoleChange = (roles) => {
    setFormData(prev => ({
      ...prev,
      roles
    }));
    
    if (errors.roles) {
      setErrors(prev => ({
        ...prev,
        roles: ''
      }));
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      const visibleSteps = getVisibleSteps();
      const currentIndex = visibleSteps.findIndex(step => step.id === currentStep);
      
      if (currentIndex < visibleSteps.length - 1) {
        const nextStep = visibleSteps[currentIndex + 1];
        setCurrentStep(nextStep.id);
      }
    }
  };

  const handlePrevStep = () => {
    const visibleSteps = getVisibleSteps();
    const currentIndex = visibleSteps.findIndex(step => step.id === currentStep);
    
    if (currentIndex > 0) {
      const prevStep = visibleSteps[currentIndex - 1];
      setCurrentStep(prevStep.id);
    }
  };

  const handleSocialRegister = async (provider) => {
    setIsLoading(true);
    
    // Simulate social registration
    setTimeout(() => {
      console.log(`Registering with ${provider}`);
      // In real app, this would handle OAuth flow
      setIsLoading(false);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      const userData = {
        id: Date.now(),
        fullName: formData.fullName,
        email: formData.email,
        roles: formData.roles,
        businessName: formData.businessName,
        serviceCategories: formData.serviceCategories,
        isVerified: false,
        createdAt: new Date().toISOString()
      };

      // Store user data and auth token
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('userRole', formData.roles[0]);

      // Navigate to dashboard
      navigate('/dashboard', { 
        state: { 
          message: 'Registration successful! Welcome to Wanna Help.',
          isNewUser: true 
        }
      });
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <RegistrationForm
            formData={formData}
            onInputChange={handleInputChange}
            errors={errors}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
        );
      
      case 2:
        return (
          <RoleSelection
            selectedRoles={formData.roles}
            onRoleChange={handleRoleChange}
          />
        );
      
      case 3:
        return formData.roles.includes('provider') ? (
          <ProviderDetails
            formData={formData}
            onInputChange={handleInputChange}
            errors={errors}
          />
        ) : null;
      
      case 4:
        return (
          <TermsAgreement
            agreed={termsAgreed}
            onAgreementChange={setTermsAgreed}
            errors={errors}
          />
        );
      
      default:
        return null;
    }
  };

  const visibleSteps = getVisibleSteps();
  const currentStepIndex = visibleSteps.findIndex(step => step.id === currentStep);
  const isLastStep = currentStepIndex === visibleSteps.length - 1;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Heart" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-text-primary font-heading">
                Wanna Help
              </span>
            </Link>
            
            <Link
              to="/user-login"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-all duration-200"
            >
              <Icon name="LogIn" size={18} />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {visibleSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                    ${currentStep >= step.id
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'bg-surface border-border text-text-secondary'
                    }
                  `}>
                    <Icon name={step.icon} size={18} />
                  </div>
                  {index < visibleSteps.length - 1 && (
                    <div className={`
                      w-8 h-0.5 mx-2 transition-all duration-200
                      ${currentStep > step.id ? 'bg-primary' : 'bg-border'}
                    `} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                {visibleSteps.find(step => step.id === currentStep)?.title}
              </h1>
              <p className="text-sm text-text-secondary">
                Step {currentStepIndex + 1} of {visibleSteps.length}
              </p>
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-surface rounded-lg shadow-lg p-6 sm:p-8">
            {currentStep === 1 && (
              <SocialRegistration
                onSocialRegister={handleSocialRegister}
                isLoading={isLoading}
              />
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {renderStepContent()}

              {/* Error Message */}
              {errors.submit && (
                <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0" />
                    <p className="text-sm text-error">{errors.submit}</p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-6">
                {currentStepIndex > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    className="flex-1"
                  >
                    <Icon name="ArrowLeft" size={18} />
                    Previous
                  </Button>
                )}
                
                <Button
                  type={isLastStep ? "submit" : "button"}
                  variant="primary"
                  onClick={isLastStep ? undefined : handleNextStep}
                  loading={isLoading}
                  className="flex-1"
                >
                  {isLastStep ? (
                    <>
                      <Icon name="UserPlus" size={18} />
                      Create Account
                    </>
                  ) : (
                    <>
                      Next
                      <Icon name="ArrowRight" size={18} />
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-6 pt-6 border-t border-border">
              <p className="text-sm text-text-secondary">
                Already have an account?{' '}
                <Link
                  to="/user-login"
                  className="text-primary hover:text-primary-700 font-medium transition-colors duration-200"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserRegistration;