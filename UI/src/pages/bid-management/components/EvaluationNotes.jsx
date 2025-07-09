import React, { useState } from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const EvaluationNotes = ({ notes, onUpdateNote }) => {
  const [showNotes, setShowNotes] = useState(false);
  const [generalNotes, setGeneralNotes] = useState('');

  const hasNotes = Object.keys(notes).length > 0 || generalNotes;

  if (!hasNotes && !showNotes) {
    return (
      <div className="mt-6 p-4 bg-surface-hover rounded-lg border border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="FileText" size={20} className="text-text-muted" />
            <div>
              <h3 className="font-semibold text-text-primary">Evaluation Notes</h3>
              <p className="text-sm text-text-secondary">
                Keep track of your thoughts and comparisons
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            onClick={() => setShowNotes(true)}
          >
            Add Notes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 bg-surface rounded-lg border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-text-primary flex items-center gap-2">
          <Icon name="FileText" size={20} />
          Evaluation Notes
        </h3>
        <Button
          variant="ghost"
          size="sm"
          iconName={showNotes ? "ChevronUp" : "ChevronDown"}
          onClick={() => setShowNotes(!showNotes)}
        >
          {showNotes ? 'Hide' : 'Show'} Notes
        </Button>
      </div>

      {showNotes && (
        <div className="space-y-4">
          {/* General Notes */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              General Evaluation Notes
            </label>
            <textarea
              value={generalNotes}
              onChange={(e) => setGeneralNotes(e.target.value)}
              placeholder="Add your overall thoughts about the evaluation process..."
              className="w-full px-3 py-2 border border-border rounded-lg text-sm resize-vertical"
              rows="3"
            />
          </div>

          {/* Individual Bid Notes */}
          {Object.keys(notes).length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-2">
                Individual Bid Notes
              </h4>
              <div className="space-y-2">
                {Object.entries(notes).map(([bidId, note]) => (
                  <div key={bidId} className="p-3 bg-surface-hover rounded-lg">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary mb-1">
                          Bid #{bidId}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {note}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Edit"
                        onClick={() => {
                          const newNote = prompt('Edit note:', note);
                          if (newNote !== null) {
                            onUpdateNote?.(bidId, newNote);
                          }
                        }}
                        className="text-text-muted hover:text-text-primary"
                      >
                        <span className="sr-only">Edit note</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save General Notes */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              iconName="Save"
              onClick={() => {
                // Handle saving general notes
                console.log('Saving general notes:', generalNotes);
              }}
            >
              Save Notes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationNotes;