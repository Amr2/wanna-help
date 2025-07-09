import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ProfessionalInfoForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    title: user.professionalInfo?.title || '',
    company: user.professionalInfo?.company || '',
    experience: user.professionalInfo?.experience || '',
    hourlyRate: user.professionalInfo?.hourlyRate || '',
    availability: user.professionalInfo?.availability || 'full-time',
    skills: user.professionalInfo?.skills || [],
    services: user.professionalInfo?.services || [],
    languages: user.professionalInfo?.languages || [],
    education: user.professionalInfo?.education || []
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newService, setNewService] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const availabilityOptions = [
    { value: 'full-time', label: 'Full-time (40+ hours/week)' },
    { value: 'part-time', label: 'Part-time (20-40 hours/week)' },
    { value: 'freelance', label: 'Freelance (Project-based)' },
    { value: 'weekends', label: 'Weekends only' }
  ];

  const serviceCategories = [
    'Web Development', 'Mobile Development', 'Design', 'Writing', 'Marketing',
    'Consulting', 'Photography', 'Video Editing', 'Translation', 'Tutoring',
    'Home Services', 'Business Services', 'Creative Services', 'Technical Support'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddService = () => {
    if (newService.trim() && !formData.services.includes(newService.trim())) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
      setNewService('');
    }
  };

  const handleRemoveService = (serviceToRemove) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(service => service !== serviceToRemove)
    }));
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim() && !formData.languages.includes(newLanguage.trim())) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage('');
    }
  };

  const handleRemoveLanguage = (languageToRemove) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(language => language !== languageToRemove)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave({ professionalInfo: formData });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving professional info:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: user.professionalInfo?.title || '',
      company: user.professionalInfo?.company || '',
      experience: user.professionalInfo?.experience || '',
      hourlyRate: user.professionalInfo?.hourlyRate || '',
      availability: user.professionalInfo?.availability || 'full-time',
      skills: user.professionalInfo?.skills || [],
      services: user.professionalInfo?.services || [],
      languages: user.professionalInfo?.languages || [],
      education: user.professionalInfo?.education || []
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-surface rounded-xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary font-heading">
          Professional Information
        </h2>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              loading={isSaving}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Professional Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Professional Title
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Senior Web Developer"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Company/Organization
            </label>
            <Input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="Current or previous company"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Years of Experience
            </label>
            <Input
              type="number"
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              placeholder="Years of professional experience"
              disabled={!isEditing}
              min="0"
              max="50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Hourly Rate (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
                $
              </span>
              <Input
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                placeholder="50"
                disabled={!isEditing}
                className="pl-8"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Availability
            </label>
            <select
              value={formData.availability}
              onChange={(e) => handleInputChange('availability', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface disabled:bg-secondary-50 disabled:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {availabilityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Skills and Services */}
        <div className="space-y-6">
          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Skills & Expertise
            </label>
            {isEditing && (
              <div className="flex gap-2 mb-3">
                <Input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Plus"
                  onClick={handleAddSkill}
                >
                  Add
                </Button>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 hover:text-primary-900"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  )}
                </span>
              ))}
              {formData.skills.length === 0 && (
                <p className="text-sm text-text-secondary">No skills added yet</p>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Services Offered
            </label>
            {isEditing && (
              <div className="flex gap-2 mb-3">
                <select
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select a service category</option>
                  {serviceCategories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Plus"
                  onClick={handleAddService}
                  disabled={!newService}
                >
                  Add
                </Button>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {formData.services.map((service, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm"
                >
                  {service}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveService(service)}
                      className="ml-1 hover:text-accent-900"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  )}
                </span>
              ))}
              {formData.services.length === 0 && (
                <p className="text-sm text-text-secondary">No services added yet</p>
              )}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Languages
            </label>
            {isEditing && (
              <div className="flex gap-2 mb-3">
                <Input
                  type="text"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder="Add a language"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddLanguage()}
                />
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Plus"
                  onClick={handleAddLanguage}
                >
                  Add
                </Button>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {formData.languages.map((language, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm"
                >
                  {language}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveLanguage(language)}
                      className="ml-1 hover:text-success-900"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  )}
                </span>
              ))}
              {formData.languages.length === 0 && (
                <p className="text-sm text-text-secondary">No languages added yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfoForm;