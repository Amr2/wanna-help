import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickStatsCards = ({ stats }) => {
  const navigate = useNavigate();

  const statsConfig = [
    {
      key: 'pendingProposals',
      title: 'Pending Proposals',
      icon: 'Clock',
      color: 'warning',
      bgColor: 'bg-warning-50',
      iconColor: 'text-warning',
      onClick: () => navigate('/proposals')
    },
    {
      key: 'activeProjects',
      title: 'Active Projects',
      icon: 'Briefcase',
      color: 'success',
      bgColor: 'bg-success-50',
      iconColor: 'text-success',
      onClick: () => navigate('/projects')
    },
    {
      key: 'monthlyEarnings',
      title: 'Monthly Earnings',
      icon: 'DollarSign',
      color: 'primary',
      bgColor: 'bg-primary-50',
      iconColor: 'text-primary',
      prefix: '$',
      onClick: () => navigate('/earnings')
    },
    {
      key: 'proposalSuccessRate',
      title: 'Success Rate',
      icon: 'TrendingUp',
      color: 'accent',
      bgColor: 'bg-accent-50',
      iconColor: 'text-accent',
      suffix: '%',
      onClick: () => navigate('/analytics')
    }
  ];

  const formatValue = (value, prefix = '', suffix = '') => {
    if (typeof value === 'number') {
      return `${prefix}${value.toLocaleString()}${suffix}`;
    }
    return `${prefix}${value}${suffix}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsConfig.map((config) => {
        const value = stats?.[config.key] || 0;
        
        return (
          <div
            key={config.key}
            className="bg-surface rounded-xl p-6 card-shadow hover:shadow-md transition-all duration-200 cursor-pointer border border-border hover:border-border-dark"
            onClick={config.onClick}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`
                w-12 h-12 rounded-lg flex items-center justify-center
                ${config.bgColor}
              `}>
                <Icon 
                  name={config.icon} 
                  size={24} 
                  className={config.iconColor}
                />
              </div>
              <div className="flex items-center gap-1 text-success text-sm">
                <Icon name="TrendingUp" size={16} />
                <span>+12%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-text-secondary">
                {config.title}
              </h3>
              <p className="text-2xl font-bold text-text-primary">
                {formatValue(value, config.prefix, config.suffix)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStatsCards;