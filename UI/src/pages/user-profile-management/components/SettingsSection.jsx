import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SettingsSection = ({ user, onSave }) => {
  const [settings, setSettings] = useState({
    notifications: {
      email: {
        newMessages: user.settings?.notifications?.email?.newMessages ?? true,
        bidUpdates: user.settings?.notifications?.email?.bidUpdates ?? true,
        projectUpdates: user.settings?.notifications?.email?.projectUpdates ?? true,
        marketing: user.settings?.notifications?.email?.marketing ?? false,
        weeklyDigest: user.settings?.notifications?.email?.weeklyDigest ?? true
      },
      push: {
        newMessages: user.settings?.notifications?.push?.newMessages ?? true,
        bidUpdates: user.settings?.notifications?.push?.bidUpdates ?? true,
        projectUpdates: user.settings?.notifications?.push?.projectUpdates ?? true
      },
      sms: {
        urgentOnly: user.settings?.notifications?.sms?.urgentOnly ?? false,
        projectDeadlines: user.settings?.notifications?.sms?.projectDeadlines ?? false
      }
    },
    privacy: {
      profileVisibility: user.settings?.privacy?.profileVisibility ?? 'public',
      showOnlineStatus: user.settings?.privacy?.showOnlineStatus ?? true,
      allowDirectMessages: user.settings?.privacy?.allowDirectMessages ?? true,
      showContactInfo: user.settings?.privacy?.showContactInfo ?? false
    },
    security: {
      twoFactorEnabled: user.settings?.security?.twoFactorEnabled ?? false,
      loginAlerts: user.settings?.security?.loginAlerts ?? true,
      sessionTimeout: user.settings?.security?.sessionTimeout ?? 30
    },
    preferences: {
      language: user.settings?.preferences?.language ?? 'en',
      timezone: user.settings?.preferences?.timezone ?? 'UTC',
      currency: user.settings?.preferences?.currency ?? 'USD',
      dateFormat: user.settings?.preferences?.dateFormat ?? 'MM/DD/YYYY'
    }
  });

  const [activeSection, setActiveSection] = useState('notifications');
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const settingSections = [
    {
      id: 'notifications',
      title: 'Notifications',
      icon: 'Bell',
      description: 'Manage your notification preferences'
    },
    {
      id: 'privacy',
      title: 'Privacy',
      icon: 'Lock',
      description: 'Control your profile visibility and privacy'
    },
    {
      id: 'security',
      title: 'Security',
      icon: 'Shield',
      description: 'Account security and authentication settings'
    },
    {
      id: 'preferences',
      title: 'Preferences',
      icon: 'Settings',
      description: 'Language, timezone, and display preferences'
    }
  ];

  const handleToggle = (section, subsection, key) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [key]: !prev[section][subsection][key]
        }
      }
    }));
  };

  const handleSelectChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave({ settings });
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderToggleSwitch = (checked, onChange, disabled = false) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"></div>
    </label>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Mail" size={20} />
          Email Notifications
        </h3>
        <div className="space-y-4">
          {[
            { key: 'newMessages', label: 'New Messages', description: 'Get notified when you receive new messages' },
            { key: 'bidUpdates', label: 'Bid Updates', description: 'Updates on your bids and proposals' },
            { key: 'projectUpdates', label: 'Project Updates', description: 'Status changes and milestones' },
            { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Summary of your activity and opportunities' },
            { key: 'marketing', label: 'Marketing Emails', description: 'Tips, features, and promotional content' }
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
              <div>
                <p className="text-sm font-medium text-text-primary">{label}</p>
                <p className="text-xs text-text-secondary">{description}</p>
              </div>
              {renderToggleSwitch(
                settings.notifications.email[key],
                () => handleToggle('notifications', 'email', key)
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Smartphone" size={20} />
          Push Notifications
        </h3>
        <div className="space-y-4">
          {[
            { key: 'newMessages', label: 'New Messages', description: 'Instant notifications for new messages' },
            { key: 'bidUpdates', label: 'Bid Updates', description: 'Real-time bid status updates' },
            { key: 'projectUpdates', label: 'Project Updates', description: 'Important project notifications' }
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
              <div>
                <p className="text-sm font-medium text-text-primary">{label}</p>
                <p className="text-xs text-text-secondary">{description}</p>
              </div>
              {renderToggleSwitch(
                settings.notifications.push[key],
                () => handleToggle('notifications', 'push', key)
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SMS Notifications */}
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4 flex items-center gap-2">
          <Icon name="MessageSquare" size={20} />
          SMS Notifications
        </h3>
        <div className="space-y-4">
          {[
            { key: 'urgentOnly', label: 'Urgent Only', description: 'Only critical notifications via SMS' },
            { key: 'projectDeadlines', label: 'Project Deadlines', description: 'Reminders for upcoming deadlines' }
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
              <div>
                <p className="text-sm font-medium text-text-primary">{label}</p>
                <p className="text-xs text-text-secondary">{description}</p>
              </div>
              {renderToggleSwitch(
                settings.notifications.sms[key],
                () => handleToggle('notifications', 'sms', key)
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4">
          Profile & Privacy Settings
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-surface-hover rounded-lg">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Profile Visibility
            </label>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => handleSelectChange('privacy', 'profileVisibility', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="public">Public - Visible to everyone</option>
              <option value="registered">Registered Users Only</option>
              <option value="private">Private - Only you can see</option>
            </select>
            <p className="text-xs text-text-secondary mt-1">
              Control who can view your profile and portfolio
            </p>
          </div>

          {[
            { key: 'showOnlineStatus', label: 'Show Online Status', description: 'Let others see when you\'re online' },
            { key: 'allowDirectMessages', label: 'Allow Direct Messages', description: 'Allow users to message you directly' },
            { key: 'showContactInfo', label: 'Show Contact Information', description: 'Display email and phone in profile' }
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
              <div>
                <p className="text-sm font-medium text-text-primary">{label}</p>
                <p className="text-xs text-text-secondary">{description}</p>
              </div>
              {renderToggleSwitch(
                settings.privacy[key],
                () => handleSelectChange('privacy', key, !settings.privacy[key])
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4">
          Account Security
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-surface-hover rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-text-primary">Two-Factor Authentication</p>
                <p className="text-xs text-text-secondary">Add an extra layer of security to your account</p>
              </div>
              {renderToggleSwitch(
                settings.security.twoFactorEnabled,
                () => handleSelectChange('security', 'twoFactorEnabled', !settings.security.twoFactorEnabled)
              )}
            </div>
            {!settings.security.twoFactorEnabled && (
              <Button variant="outline" size="sm" iconName="Shield">
                Enable 2FA
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
            <div>
              <p className="text-sm font-medium text-text-primary">Login Alerts</p>
              <p className="text-xs text-text-secondary">Get notified of new login attempts</p>
            </div>
            {renderToggleSwitch(
              settings.security.loginAlerts,
              () => handleSelectChange('security', 'loginAlerts', !settings.security.loginAlerts)
            )}
          </div>

          <div className="p-4 bg-surface-hover rounded-lg">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Session Timeout (minutes)
            </label>
            <select
              value={settings.security.sessionTimeout}
              onChange={(e) => handleSelectChange('security', 'sessionTimeout', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={0}>Never</option>
            </select>
            <p className="text-xs text-text-secondary mt-1">
              Automatically log out after period of inactivity
            </p>
          </div>
        </div>
      </div>

      {/* Password Change */}
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4">
          Change Password
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Current Password
            </label>
            <Input type="password" placeholder="Enter current password" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              New Password
            </label>
            <Input type="password" placeholder="Enter new password" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Confirm New Password
            </label>
            <Input type="password" placeholder="Confirm new password" />
          </div>
          <Button variant="primary" size="sm">
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPreferencesSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4">
          Display Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Language
            </label>
            <select
              value={settings.preferences.language}
              onChange={(e) => handleSelectChange('preferences', 'language', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Timezone
            </label>
            <select
              value={settings.preferences.timezone}
              onChange={(e) => handleSelectChange('preferences', 'timezone', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="Europe/London">London</option>
              <option value="Europe/Paris">Paris</option>
              <option value="Asia/Tokyo">Tokyo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Currency
            </label>
            <select
              value={settings.preferences.currency}
              onChange={(e) => handleSelectChange('preferences', 'currency', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD ($)</option>
              <option value="AUD">AUD ($)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Date Format
            </label>
            <select
              value={settings.preferences.dateFormat}
              onChange={(e) => handleSelectChange('preferences', 'dateFormat', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'notifications':
        return renderNotificationsSection();
      case 'privacy':
        return renderPrivacySection();
      case 'security':
        return renderSecuritySection();
      case 'preferences':
        return renderPreferencesSection();
      default:
        return null;
    }
  };

  return (
    <div className="bg-surface rounded-xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary font-heading">
          Account Settings
        </h2>
        <Button
          variant="primary"
          size="sm"
          onClick={handleSave}
          loading={isSaving}
        >
          Save Changes
        </Button>
      </div>

      {/* Settings Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {settingSections.map((section) => (
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
            </div>
            <p className="text-xs text-text-secondary">
              {section.description}
            </p>
          </button>
        ))}
      </div>

      {/* Active Section Content */}
      <div className="bg-surface-hover rounded-lg p-6">
        {renderSectionContent()}
      </div>

      {/* Danger Zone */}
      <div className="mt-8 p-6 bg-error-50 border border-error-200 rounded-lg">
        <h3 className="text-lg font-medium text-error-800 mb-2 flex items-center gap-2">
          <Icon name="AlertTriangle" size={20} />
          Danger Zone
        </h3>
        <p className="text-sm text-error-700 mb-4">
          These actions are irreversible. Please proceed with caution.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            className="border-error-300 text-error-700 hover:bg-error-100"
          >
            Export Data
          </Button>
          <Button
            variant="danger"
            size="sm"
            iconName="Trash2"
            onClick={() => setShowDeleteAccount(true)}
          >
            Delete Account
          </Button>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-1050">
          <div className="bg-surface rounded-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-error-600" />
              <h3 className="text-lg font-semibold text-text-primary">
                Delete Account
              </h3>
            </div>
            <p className="text-text-secondary mb-6">
              Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data, including projects, messages, and reviews.
            </p>
            <div className="flex items-center gap-3">
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  // Handle account deletion
                  console.log('Account deletion requested');
                  setShowDeleteAccount(false);
                }}
              >
                Yes, Delete Account
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteAccount(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsSection;