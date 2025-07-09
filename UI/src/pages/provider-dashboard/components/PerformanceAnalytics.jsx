import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceAnalytics = ({ data }) => {
  const metricsConfig = [
    {
      key: 'proposalSuccessRate',
      title: 'Proposal Success Rate',
      icon: 'Target',
      color: 'success',
      suffix: '%'
    },
    {
      key: 'clientSatisfaction',
      title: 'Client Satisfaction',
      icon: 'Star',
      color: 'warning',
      suffix: '/5'
    },
    {
      key: 'averageProjectValue',
      title: 'Avg Project Value',
      icon: 'DollarSign',
      color: 'primary',
      prefix: '$'
    }
  ];

  const formatValue = (value, prefix = '', suffix = '') => {
    if (typeof value === 'number') {
      return `${prefix}${value.toLocaleString()}${suffix}`;
    }
    return `${prefix}${value}${suffix}`;
  };

  const getColorByType = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-success-50',
          text: 'text-success',
          chart: '#059669'
        };
      case 'warning':
        return {
          bg: 'bg-warning-50',
          text: 'text-warning',
          chart: '#D97706'
        };
      case 'primary':
        return {
          bg: 'bg-primary-50',
          text: 'text-primary',
          chart: '#1E40AF'
        };
      default:
        return {
          bg: 'bg-secondary-50',
          text: 'text-secondary',
          chart: '#64748B'
        };
    }
  };

  return (
    <div className="bg-surface rounded-xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary font-heading">
          Performance Analytics
        </h2>
        <div className="flex items-center gap-2">
          <Icon name="TrendingUp" size={20} className="text-success" />
          <span className="text-sm text-success font-medium">+15% this month</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {metricsConfig.map((metric) => {
          const value = data?.[metric.key] || 0;
          const colors = getColorByType(metric.color);
          
          return (
            <div key={metric.key} className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${colors.bg}
                `}>
                  <Icon 
                    name={metric.icon} 
                    size={16} 
                    className={colors.text}
                  />
                </div>
                <span className="text-sm font-medium text-text-primary">
                  {metric.title}
                </span>
              </div>
              <p className="text-lg font-semibold text-text-primary">
                {formatValue(value, metric.prefix, metric.suffix)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Monthly Earnings Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-text-primary mb-4">Monthly Earnings Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data?.monthlyTrend || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Earnings']}
                labelStyle={{ color: '#1F2937' }}
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="earnings" 
                stroke="#1E40AF" 
                strokeWidth={2}
                dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#1E40AF' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Project Count Chart */}
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4">Monthly Projects</h3>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.monthlyTrend || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
              />
              <Tooltip 
                formatter={(value) => [value, 'Projects']}
                labelStyle={{ color: '#1F2937' }}
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="projects" 
                fill="#0EA5E9"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;