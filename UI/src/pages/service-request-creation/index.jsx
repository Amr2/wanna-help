import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ServiceCategorySelector from './components/ServiceCategorySelector';
import ServiceDetailsForm from './components/ServiceDetailsForm';
import ImageUploadSection from './components/ImageUploadSection';
import RequestPreview from './components/RequestPreview';
import ProgressIndicator from './components/ProgressIndicator';
import ConfirmationModal from './components/ConfirmationModal';

const ServiceRequestCreation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    shareExactLocation: false,
    minBudget: '',
    maxBudget: '',
    urgency: '',
    additionalRequirements: '',
    contactPreference: 'platform'
  });
  const [images, setImages] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const totalSteps = 4;

  useEffect(() => {
    // Check if user is authenticated and has requester role
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'requester') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!selectedCategory) {
          newErrors.category = 'Please select a service category';
        }
        break;
      case 2:
        if (!formData.title?.trim()) {
          newErrors.title = 'Service title is required';
        }
        if (!formData.description?.trim()) {
          newErrors.description = 'Service description is required';
        }
        if (!formData.location?.trim()) {
          newErrors.location = 'Service location is required';
        }
        if (!formData.urgency) {
          newErrors.urgency = 'Please select when you need this service';
        }
        break;
      case 3:
        // Images are optional, no validation needed
        break;
      case 4:
        // Final validation
        if (!selectedCategory || !formData.title?.trim() || !formData.description?.trim() || !formData.location?.trim() || !formData.urgency) {
          newErrors.general = 'Please complete all required fields';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowConfirmationModal(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setErrors({});
  };

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
    setErrors({});
  };

  const handleImagesChange = (newImages) => {
    setImages(newImages);
  };

  const handleSubmitRequest = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful submission
      const requestId = 'REQ-' + Date.now();
      
      // Store request in localStorage for demo purposes
      const existingRequests = JSON.parse(localStorage.getItem('userRequests') || '[]');
      const newRequest = {
        id: requestId,
        category: selectedCategory,
        ...formData,
        images: images.map(img => ({ id: img.id, name: img.name, preview: img.preview })),
        status: 'active',
        bidsCount: 0,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days from now
      };
      
      existingRequests.push(newRequest);
      localStorage.setItem('userRequests', JSON.stringify(existingRequests));
      
      // Close modal and navigate to dashboard
      setShowConfirmationModal(false);
      navigate('/dashboard', { 
        state: { 
          message: 'Your service request has been posted successfully!',
          requestId: requestId
        }
      });
      
    } catch (error) {
      console.error('Error submitting request:', error);
      setErrors({ general: 'Failed to submit request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceCategorySelector
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        );
      case 2:
        return (
          <ServiceDetailsForm
            formData={formData}
            onFormDataChange={handleFormDataChange}
            selectedCategory={selectedCategory}
          />
        );
      case 3:
        return (
          <ImageUploadSection
            images={images}
            onImagesChange={handleImagesChange}
          />
        );
      case 4:
        return (
          <RequestPreview
            selectedCategory={selectedCategory}
            formData={formData}
            images={images}
          />
        );
      default:
        return null;
    }
  };

  const getRequestData = () => ({
    title: formData.title,
    category: selectedCategory?.name,
    location: formData.location,
    budget: formData.minBudget && formData.maxBudget 
      ? `$${formData.minBudget} - $${formData.maxBudget}`
      : formData.minBudget 
        ? `From $${formData.minBudget}`
        : formData.maxBudget 
          ? `Up to $${formData.maxBudget}`
          : 'Not specified'
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Create Service Request
          </h1>
          <p className="text-text-secondary">
            Tell us what you need and get quotes from qualified service providers
          </p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

        {/* Error Display */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Icon name="AlertCircle" size={20} className="text-error-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-error-700 mb-1">
                  Please fix the following errors:
                </h4>
                <ul className="text-sm text-error-600 space-y-1">
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-surface rounded-xl shadow-sm border border-border p-6 lg:p-8 mb-8">
          {getStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Previous
          </Button>

          <div className="flex items-center gap-2 text-sm text-text-muted">
            <span>Step {currentStep} of {totalSteps}</span>
          </div>

          <Button
            variant="primary"
            onClick={handleNext}
            iconName={currentStep === totalSteps ? "Send" : "ArrowRight"}
            iconPosition="right"
          >
            {currentStep === totalSteps ? 'Post Request' : 'Next'}
          </Button>
        </div>

        {/* Back to Dashboard Link */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleSubmitRequest}
        isSubmitting={isSubmitting}
        requestData={getRequestData()}
      />
    </div>
  );
};

export default ServiceRequestCreation;