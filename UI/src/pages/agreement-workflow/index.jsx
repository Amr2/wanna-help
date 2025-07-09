import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ParticipantProfiles from './components/ParticipantProfiles';
import ProjectScopeSection from './components/ProjectScopeSection';
import PricingTimeline from './components/PricingTimeline';
import TermsConditions from './components/TermsConditions';
import DigitalSignature from './components/DigitalSignature';
import ProgressIndicator from './components/ProgressIndicator';
import CompletionActions from './components/CompletionActions';

const AgreementWorkflow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole] = useState(() => localStorage.getItem('userRole') || 'requester');
  
  // Agreement state management
  const [agreementState, setAgreementState] = useState({
    requesterTermsAccepted: false,
    providerTermsAccepted: false,
    requesterSigned: null,
    providerSigned: null,
    currentStep: 'scope',
    isComplete: false
  });

  // Mock data for participants
  const [participants] = useState({
    requester: {
      id: "req_001",
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      location: "San Francisco, CA",
      memberSince: "2022"
    },
    provider: {
      id: "prov_001", 
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      completedProjects: 127,
      memberSince: "2021"
    }
  });

  // Mock project scope data
  const [projectScope, setProjectScope] = useState({
    title: "E-commerce Website Development with Payment Integration",
    description: `Develop a modern, responsive e-commerce website with the following specifications:\n\n• Custom design with mobile-first approach\n• Product catalog with search and filtering\n• Shopping cart and checkout functionality\n• Secure payment gateway integration (Stripe/PayPal)\n• User account management system\n• Admin dashboard for inventory management\n• SEO optimization and performance optimization\n• Cross-browser compatibility testing\n• SSL certificate setup and security measures`,
    deliverables: [
      "Fully functional e-commerce website",
      "Mobile-responsive design",
      "Payment gateway integration",
      "Admin dashboard",
      "User documentation",
      "Source code and deployment"
    ],
    technicalRequirements: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Stripe API",
      "AWS Hosting",
      "SSL Certificate"
    ]
  });

  // Mock pricing and timeline data
  const [pricingData, setPricingData] = useState({
    totalAmount: 8500,
    estimatedDuration: "8 weeks",
    milestones: [
      {
        id: 1,
        title: "Project Setup & Design Mockups",
        description: "Initial project setup, wireframes, and design mockups for approval",
        amount: 1500,
        dueDate: "2024-02-15",
        status: "pending"
      },
      {
        id: 2,
        title: "Frontend Development",
        description: "Complete frontend development with responsive design implementation",
        amount: 2500,
        dueDate: "2024-03-01",
        status: "pending"
      },
      {
        id: 3,
        title: "Backend Development & Database",
        description: "API development, database setup, and server-side functionality",
        amount: 2000,
        dueDate: "2024-03-15",
        status: "pending"
      },
      {
        id: 4,
        title: "Payment Integration & Testing",
        description: "Payment gateway integration, security implementation, and comprehensive testing",
        amount: 1500,
        dueDate: "2024-03-29",
        status: "pending"
      },
      {
        id: 5,
        title: "Deployment & Final Delivery",
        description: "Production deployment, final testing, documentation, and project handover",
        amount: 1000,
        dueDate: "2024-04-12",
        status: "pending"
      }
    ]
  });

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/user-login');
      return;
    }
  }, [navigate]);

  // Update current step based on progress
  useEffect(() => {
    const { requesterTermsAccepted, providerTermsAccepted, requesterSigned, providerSigned } = agreementState;
    
    let currentStep = 'scope';
    
    if (!requesterTermsAccepted || !providerTermsAccepted) {
      currentStep = 'terms';
    } else if (!requesterSigned || !providerSigned) {
      currentStep = 'signature';
    } else {
      currentStep = 'complete';
    }
    
    const isComplete = requesterTermsAccepted && providerTermsAccepted && requesterSigned && providerSigned;
    
    setAgreementState(prev => ({
      ...prev,
      currentStep,
      isComplete
    }));
  }, [agreementState.requesterTermsAccepted, agreementState.providerTermsAccepted, agreementState.requesterSigned, agreementState.providerSigned]);

  // Handle terms acceptance
  const handleTermsAccept = (role) => {
    setAgreementState(prev => ({
      ...prev,
      [`${role}TermsAccepted`]: true
    }));
  };

  // Handle signature completion
  const handleSignatureComplete = (signatureInfo) => {
    const signatureData = {
      ...signatureInfo,
      timestamp: new Date().toISOString()
    };
    
    setAgreementState(prev => ({
      ...prev,
      [`${signatureInfo.userRole}Signed`]: signatureData
    }));
  };

  // Handle scope changes
  const handleScopeChange = (newScope) => {
    setProjectScope(newScope);
  };

  // Handle pricing changes
  const handlePricingChange = (newPricing) => {
    setPricingData(newPricing);
  };

  // Get progress data for indicators
  const getProgressData = () => {
    return {
      requester: {
        termsAccepted: agreementState.requesterTermsAccepted,
        signed: !!agreementState.requesterSigned
      },
      provider: {
        termsAccepted: agreementState.providerTermsAccepted,
        signed: !!agreementState.providerSigned
      }
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Agreement Workflow
          </h1>
          <p className="text-text-secondary">
            Finalize project terms and establish formal collaboration between requester and provider
          </p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator
          currentStep={agreementState.currentStep}
          requesterProgress={getProgressData().requester}
          providerProgress={getProgressData().provider}
          isAgreementComplete={agreementState.isComplete}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Agreement Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Participant Profiles */}
            <ParticipantProfiles
              requester={participants.requester}
              provider={participants.provider}
            />

            {/* Project Scope Section */}
            <ProjectScopeSection
              initialScope={projectScope}
              onScopeChange={handleScopeChange}
              isEditable={!agreementState.isComplete}
            />

            {/* Pricing & Timeline */}
            <PricingTimeline
              initialPricing={pricingData}
              onPricingChange={handlePricingChange}
              isEditable={!agreementState.isComplete}
            />

            {/* Terms & Conditions */}
            <TermsConditions
              onTermsAccept={handleTermsAccept}
              requesterAccepted={agreementState.requesterTermsAccepted}
              providerAccepted={agreementState.providerTermsAccepted}
            />

            {/* Digital Signature */}
            <DigitalSignature
              onSignatureComplete={handleSignatureComplete}
              requesterSigned={agreementState.requesterSigned}
              providerSigned={agreementState.providerSigned}
            />
          </div>

          {/* Right Column - Completion Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CompletionActions
                isAgreementComplete={agreementState.isComplete}
                projectId="proj_001"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreementWorkflow;