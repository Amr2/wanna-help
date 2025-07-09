import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const VerificationSection = ({ user, onSave }) => {
  const [verificationData, setVerificationData] = useState({
    identity: user.verification?.identity || { status: 'pending', documents: [] },
    business: user.verification?.business || { status: 'not_started', documents: [] },
    skills: user.verification?.skills || { status: 'not_started', certificates: [] },
    background: user.verification?.background || { status: 'not_started', completed: false }
  });

  const [isUploading, setIsUploading] = useState(false);
  const [activeSection, setActiveSection] = useState('identity');

  const verificationSections = [
    {
      id: 'identity',
      title: 'Identity Verification',
      description: 'Verify your identity with government-issued documents',
      icon: 'Shield',
      required: true
    },
    {
      id: 'business',
      title: 'Business License',
      description: 'Upload business registration and license documents',
      icon: 'Building',
      required: false
    },
    {
      id: 'skills',
      title: 'Skill Certificates',
      description: 'Add professional certifications and qualifications',
      icon: 'Award',
      required: false
    },
    {
      id: 'background',
      title: 'Background Check',
      description: 'Complete background verification for enhanced trust',
      icon: 'UserCheck',
      required: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'text-success-600 bg-success-100';
      case 'pending':
        return 'text-warning-600 bg-warning-100';
      case 'rejected':
        return 'text-error-600 bg-error-100';
      default:
        return 'text-text-secondary bg-secondary-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'rejected':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'verified':
        return 'Verified';
      case 'pending':
        return 'Under Review';
      case 'rejected':
        return 'Rejected';
      case 'not_started':
        return 'Not Started';
      default:
        return 'Unknown';
    }
  };

  const handleFileUpload = async (section, event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newDocuments = files.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        status: 'pending'
      }));

      setVerificationData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          documents: [...(prev[section].documents || []), ...newDocuments],
          status: 'pending'
        }
      }));
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveDocument = (section, documentId) => {
    setVerificationData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        documents: prev[section].documents.filter(doc => doc.id !== documentId)
      }
    }));
  };

  const handleStartBackgroundCheck = () => {
    setVerificationData(prev => ({
      ...prev,
      background: {
        ...prev.background,
        status: 'pending',
        startedAt: new Date().toISOString()
      }
    }));
  };

  const renderIdentitySection = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Document Type
          </label>
          <select className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="passport">Passport</option>
            <option value="drivers_license">Driver's License</option>
            <option value="national_id">National ID Card</option>
            <option value="state_id">State ID</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Document Number
          </label>
          <Input
            type="text"
            placeholder="Enter document number"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Upload Documents
        </label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={(e) => handleFileUpload('identity', e)}
            className="hidden"
            id="identity-upload"
            disabled={isUploading}
          />
          <label htmlFor="identity-upload" className="cursor-pointer">
            <Icon name="Upload" size={32} className="text-text-secondary mx-auto mb-2" />
            <p className="text-sm text-text-secondary mb-1">
              {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-text-muted">
              PNG, JPG, PDF up to 10MB each
            </p>
          </label>
        </div>
      </div>

      {verificationData.identity.documents && verificationData.identity.documents.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-2">Uploaded Documents</h4>
          <div className="space-y-2">
            {verificationData.identity.documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="FileText" size={20} className="text-text-secondary" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">{doc.name}</p>
                    <p className="text-xs text-text-secondary">
                      {(doc.size / 1024 / 1024).toFixed(2)} MB • Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                    {getStatusText(doc.status)}
                  </span>
                  <button
                    onClick={() => handleRemoveDocument('identity', doc.id)}
                    className="text-error hover:text-error-700 transition-colors duration-200"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderBusinessSection = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Business Name
          </label>
          <Input
            type="text"
            placeholder="Enter business name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Registration Number
          </label>
          <Input
            type="text"
            placeholder="Enter registration number"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Business License & Documents
        </label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={(e) => handleFileUpload('business', e)}
            className="hidden"
            id="business-upload"
            disabled={isUploading}
          />
          <label htmlFor="business-upload" className="cursor-pointer">
            <Icon name="Upload" size={32} className="text-text-secondary mx-auto mb-2" />
            <p className="text-sm text-text-secondary mb-1">
              Upload business license, registration, tax documents
            </p>
            <p className="text-xs text-text-muted">
              PNG, JPG, PDF up to 10MB each
            </p>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSkillsSection = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Professional Certificates
        </label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={(e) => handleFileUpload('skills', e)}
            className="hidden"
            id="skills-upload"
            disabled={isUploading}
          />
          <label htmlFor="skills-upload" className="cursor-pointer">
            <Icon name="Upload" size={32} className="text-text-secondary mx-auto mb-2" />
            <p className="text-sm text-text-secondary mb-1">
              Upload certificates, diplomas, and qualifications
            </p>
            <p className="text-xs text-text-muted">
              PNG, JPG, PDF up to 10MB each
            </p>
          </label>
        </div>
      </div>

      <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-accent-800 mb-1">
              Skill Verification Tips
            </h4>
            <ul className="text-sm text-accent-700 space-y-1">
              <li>• Upload clear, high-quality images of certificates</li>
              <li>• Include certificates from recognized institutions</li>
              <li>• Add professional licenses and industry certifications</li>
              <li>• Verification typically takes 2-3 business days</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBackgroundSection = () => (
    <div className="space-y-4">
      <div className="bg-surface-hover border border-border rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="UserCheck" size={24} className="text-primary-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-text-primary mb-2">
              Background Verification
            </h3>
            <p className="text-text-secondary mb-4">
              Complete a comprehensive background check to build trust with clients. This includes criminal history, employment verification, and reference checks.
            </p>
            
            {verificationData.background.status === 'not_started' ? (
              <div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-text-primary mb-2">What's included:</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Criminal background check</li>
                    <li>• Employment history verification</li>
                    <li>• Professional reference checks</li>
                    <li>• Identity confirmation</li>
                  </ul>
                </div>
                <Button
                  variant="primary"
                  iconName="Play"
                  onClick={handleStartBackgroundCheck}
                >
                  Start Background Check ($29.99)
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Icon
                  name={getStatusIcon(verificationData.background.status)}
                  size={20}
                  className={`${getStatusColor(verificationData.background.status).split(' ')[0]}`}
                />
                <span className="text-sm font-medium text-text-primary">
                  {getStatusText(verificationData.background.status)}
                </span>
                {verificationData.background.status === 'pending' && (
                  <span className="text-sm text-text-secondary">
                    • Started {new Date(verificationData.background.startedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'identity':
        return renderIdentitySection();
      case 'business':
        return renderBusinessSection();
      case 'skills':
        return renderSkillsSection();
      case 'background':
        return renderBackgroundSection();
      default:
        return null;
    }
  };

  return (
    <div className="bg-surface rounded-xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary font-heading">
          Account Verification
        </h2>
        <div className="flex items-center gap-2">
          <Icon name="Shield" size={20} className="text-success-600" />
          <span className="text-sm font-medium text-success-600">
            Trust & Safety
          </span>
        </div>
      </div>

      {/* Verification Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {verificationSections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              activeSection === section.id
                ? 'border-primary bg-primary-50' :'border-border bg-surface hover:bg-surface-hover'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <Icon
                name={section.icon}
                size={20}
                className={activeSection === section.id ? 'text-primary' : 'text-text-secondary'}
              />
              <span className={`text-sm font-medium ${
                activeSection === section.id ? 'text-primary' : 'text-text-primary'
              }`}>
                {section.title}
              </span>
              {section.required && (
                <span className="text-xs text-error-600 bg-error-100 px-1.5 py-0.5 rounded">
                  Required
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                getStatusColor(verificationData[section.id].status)
              }`}>
                {getStatusText(verificationData[section.id].status)}
              </span>
              <Icon
                name={getStatusIcon(verificationData[section.id].status)}
                size={16}
                className={getStatusColor(verificationData[section.id].status).split(' ')[0]}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Active Section Content */}
      <div className="bg-surface-hover rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-text-primary mb-1">
            {verificationSections.find(s => s.id === activeSection)?.title}
          </h3>
          <p className="text-sm text-text-secondary">
            {verificationSections.find(s => s.id === activeSection)?.description}
          </p>
        </div>
        
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default VerificationSection;