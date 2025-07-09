import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const TermsAgreement = ({ agreed, onAgreementChange, errors, className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-start gap-3 p-4 bg-secondary-50 rounded-lg">
        <div className="flex-shrink-0 mt-0.5">
          <input
            type="checkbox"
            id="termsAgreement"
            checked={agreed}
            onChange={(e) => onAgreementChange(e.target.checked)}
            className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="termsAgreement" className="text-sm text-text-primary cursor-pointer">
            I agree to the{' '}
            <Link 
              to="/terms-of-service" 
              className="text-primary hover:text-primary-700 underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link 
              to="/privacy-policy" 
              className="text-primary hover:text-primary-700 underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>
          </label>
          {errors.agreement && (
            <p className="mt-2 text-sm text-error flex items-center gap-1">
              <Icon name="AlertCircle" size={14} />
              {errors.agreement}
            </p>
          )}
        </div>
      </div>

      <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div className="text-sm text-text-primary">
            <h4 className="font-medium mb-2">What you're agreeing to:</h4>
            <ul className="space-y-1 text-text-secondary">
              <li className="flex items-center gap-2">
                <Icon name="Check" size={12} className="text-success flex-shrink-0" />
                <span>Fair and honest service transactions</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" size={12} className="text-success flex-shrink-0" />
                <span>Respectful communication with all users</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" size={12} className="text-success flex-shrink-0" />
                <span>Accurate representation of services and needs</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" size={12} className="text-success flex-shrink-0" />
                <span>Compliance with platform guidelines</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-text-muted">
          By creating an account, you'll receive email notifications about your account activity. 
          You can manage these preferences in your account settings.
        </p>
      </div>
    </div>
  );
};

export default TermsAgreement;