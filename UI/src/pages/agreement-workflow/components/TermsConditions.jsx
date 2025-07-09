import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TermsConditions = ({ onTermsAccept, requesterAccepted, providerAccepted }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [userRole] = useState(() => localStorage.getItem('userRole') || 'requester');

  const termsSection = [
    {
      id: 'project-terms',
      title: 'Project Terms & Conditions',
      icon: 'FileText',
      content: `Both parties agree to the project scope, timeline, and deliverables as outlined in this agreement. Any changes to the project scope must be mutually agreed upon in writing through the platform's messaging system.\n\nThe provider commits to delivering work that meets professional standards and specifications. The requester commits to providing timely feedback and necessary resources for project completion.`
    },
    {
      id: 'payment-terms',title: 'Payment Terms',icon: 'CreditCard',
      content: `Payment will be processed according to the milestone schedule outlined in this agreement. Each milestone payment will be released upon completion and approval of the corresponding deliverables.\n\nPayments are processed securely through the platform. Disputes regarding payment must be raised within 7 days of milestone completion. Late payments may result in project suspension.`
    },
    {
      id: 'communication',title: 'Communication Guidelines',icon: 'MessageCircle',
      content: `All project communication must occur through the platform's messaging system to ensure proper documentation and dispute resolution support.\n\nBoth parties commit to maintaining professional communication and responding to messages within 24 hours during business days. Emergency contact information may be shared at mutual discretion.`
    },
    {
      id: 'dispute-resolution',
      title: 'Dispute Resolution',
      icon: 'Shield',
      content: `In case of disputes, both parties agree to first attempt resolution through direct communication. If resolution cannot be reached, the platform's mediation service will be engaged.\n\nThe platform reserves the right to hold payments in escrow during active disputes. Final decisions by platform mediators are binding and enforceable.`
    },
    {
      id: 'cancellation',title: 'Cancellation Policy',icon: 'XCircle',
      content: `Either party may cancel the project with 48 hours written notice. Cancellation fees may apply based on work completed and resources invested.\n\nIn case of cancellation, payment for completed milestones will be processed. Partial milestone payments will be determined based on work progress and mutual agreement.`
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleAcceptTerms = () => {
    onTermsAccept(userRole);
  };

  const currentUserAccepted = userRole === 'requester' ? requesterAccepted : providerAccepted;
  const otherUserAccepted = userRole === 'requester' ? providerAccepted : requesterAccepted;

  return (
    <div className="bg-surface rounded-xl border border-border p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="FileCheck" size={20} />
        <h3 className="text-lg font-semibold text-text-primary">Terms & Conditions</h3>
      </div>

      {/* Terms Sections */}
      <div className="space-y-3 mb-6">
        {termsSection.map((section) => (
          <div key={section.id} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 bg-background hover:bg-surface-hover transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <Icon name={section.icon} size={18} className="text-primary" />
                <span className="font-medium text-text-primary text-left">{section.title}</span>
              </div>
              <Icon 
                name={expandedSection === section.id ? "ChevronUp" : "ChevronDown"} 
                size={18} 
                className="text-text-secondary"
              />
            </button>
            
            {expandedSection === section.id && (
              <div className="p-4 border-t border-border bg-surface">
                <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Acceptance Status */}
      <div className="bg-background rounded-lg p-4 mb-6">
        <h4 className="font-medium text-text-primary mb-3">Agreement Status</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Search" size={16} className="text-primary" />
              <span className="text-sm text-text-primary">Requester Acceptance</span>
            </div>
            <div className="flex items-center gap-2">
              {requesterAccepted ? (
                <>
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-success font-medium">Accepted</span>
                </>
              ) : (
                <>
                  <Icon name="Clock" size={16} className="text-warning" />
                  <span className="text-sm text-warning font-medium">Pending</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Briefcase" size={16} className="text-success" />
              <span className="text-sm text-text-primary">Provider Acceptance</span>
            </div>
            <div className="flex items-center gap-2">
              {providerAccepted ? (
                <>
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-success font-medium">Accepted</span>
                </>
              ) : (
                <>
                  <Icon name="Clock" size={16} className="text-warning" />
                  <span className="text-sm text-warning font-medium">Pending</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Accept Button */}
      {!currentUserAccepted && (
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-primary font-medium mb-1">
                  Review Required
                </p>
                <p className="text-sm text-primary-700">
                  Please review all terms and conditions above before accepting this agreement. 
                  By accepting, you agree to be legally bound by these terms.
                </p>
              </div>
            </div>
          </div>
          
          <Button
            variant="primary"
            size="lg"
            iconName="FileCheck"
            onClick={handleAcceptTerms}
            fullWidth
          >
            Accept Terms & Conditions
          </Button>
        </div>
      )}

      {/* Both Accepted Message */}
      {requesterAccepted && providerAccepted && (
        <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="CheckCircle2" size={20} className="text-success" />
            <div>
              <p className="text-sm text-success font-medium">
                Agreement Completed
              </p>
              <p className="text-sm text-success-700">
                Both parties have accepted the terms. The project can now proceed to the next phase.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Waiting for Other Party */}
      {currentUserAccepted && !otherUserAccepted && (
        <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="Clock" size={20} className="text-warning" />
            <div>
              <p className="text-sm text-warning font-medium">
                Waiting for {userRole === 'requester' ? 'Provider' : 'Requester'}
              </p>
              <p className="text-sm text-warning-700">
                You have accepted the terms. Waiting for the other party to review and accept.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsConditions;