import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PricingTimeline = ({ initialPricing, onPricingChange, isEditable = true }) => {
  const [pricing, setPricing] = useState(initialPricing);
  const [isEditing, setIsEditing] = useState(false);

  const handlePricingUpdate = () => {
    onPricingChange(pricing);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPricing(initialPricing);
    setIsEditing(false);
  };

  const addMilestone = () => {
    const newMilestone = {
      id: Date.now(),
      title: '',
      description: '',
      amount: 0,
      dueDate: '',
      status: 'pending'
    };
    setPricing({
      ...pricing,
      milestones: [...pricing.milestones, newMilestone]
    });
  };

  const updateMilestone = (index, field, value) => {
    const updatedMilestones = pricing.milestones.map((milestone, i) =>
      i === index ? { ...milestone, [field]: value } : milestone
    );
    setPricing({ ...pricing, milestones: updatedMilestones });
  };

  const removeMilestone = (index) => {
    const updatedMilestones = pricing.milestones.filter((_, i) => i !== index);
    setPricing({ ...pricing, milestones: updatedMilestones });
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
          <Icon name="DollarSign" size={20} />
          Pricing & Timeline
        </h3>
        
        {isEditable && !isEditing && (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            onClick={() => setIsEditing(true)}
          >
            Edit Pricing
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Total Project Value */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="DollarSign" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Total Value</span>
            </div>
            <p className="text-2xl font-bold text-primary">${pricing.totalAmount.toLocaleString()}</p>
          </div>
          
          <div className="p-4 bg-accent-50 rounded-lg border border-accent-200">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Calendar" size={16} className="text-accent" />
              <span className="text-sm font-medium text-accent">Duration</span>
            </div>
            <p className="text-2xl font-bold text-accent">{pricing.estimatedDuration}</p>
          </div>
          
          <div className="p-4 bg-success-50 rounded-lg border border-success-200">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Target" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Milestones</span>
            </div>
            <p className="text-2xl font-bold text-success">{pricing.milestones.length}</p>
          </div>
        </div>

        {/* Payment Milestones */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-text-primary">Payment Milestones</h4>
            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                onClick={addMilestone}
              >
                Add Milestone
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {pricing.milestones.map((milestone, index) => (
              <div key={milestone.id} className="p-4 bg-background rounded-lg border border-border-light">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <div className="md:col-span-4">
                    {isEditing ? (
                      <Input
                        type="text"
                        value={milestone.title}
                        onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                        placeholder="Milestone title"
                        className="w-full"
                      />
                    ) : (
                      <h5 className="font-medium text-text-primary">{milestone.title}</h5>
                    )}
                  </div>
                  
                  <div className="md:col-span-3">
                    {isEditing ? (
                      <Input
                        type="number"
                        value={milestone.amount}
                        onChange={(e) => updateMilestone(index, 'amount', parseFloat(e.target.value) || 0)}
                        placeholder="Amount"
                        className="w-full"
                      />
                    ) : (
                      <p className="text-lg font-semibold text-primary">${milestone.amount.toLocaleString()}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-3">
                    {isEditing ? (
                      <Input
                        type="date"
                        value={milestone.dueDate}
                        onChange={(e) => updateMilestone(index, 'dueDate', e.target.value)}
                        className="w-full"
                      />
                    ) : (
                      <p className="text-text-secondary">{new Date(milestone.dueDate).toLocaleDateString()}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2 flex items-center justify-end gap-2">
                    {!isEditing && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        milestone.status === 'completed' ? 'bg-success-100 text-success-700' :
                        milestone.status === 'in-progress'? 'bg-warning-100 text-warning-700' : 'bg-secondary-100 text-secondary-700'
                      }`}>
                        {milestone.status}
                      </span>
                    )}
                    
                    {isEditing && (
                      <Button
                        variant="danger"
                        size="sm"
                        iconName="Trash2"
                        onClick={() => removeMilestone(index)}
                      />
                    )}
                  </div>
                </div>
                
                {milestone.description && (
                  <div className="mt-3 pt-3 border-t border-border-light">
                    {isEditing ? (
                      <textarea
                        value={milestone.description}
                        onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                        placeholder="Milestone description..."
                        rows={2}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
                      />
                    ) : (
                      <p className="text-sm text-text-secondary">{milestone.description}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Edit Actions */}
        {isEditing && (
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Button
              variant="primary"
              size="sm"
              iconName="Save"
              onClick={handlePricingUpdate}
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingTimeline;