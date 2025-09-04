import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicators = () => {
  const securityFeatures = [
    {
      id: 1,
      name: 'SSL Certificate',
      status: 'active',
      description: 'End-to-end encryption for all data transmission',
      icon: 'Shield',
      lastVerified: '2025-01-04T15:30:00Z'
    },
    {
      id: 2,
      name: 'OAuth 2.0',
      status: 'active',
      description: 'Secure authorization for social platform connections',
      icon: 'Lock',
      lastVerified: '2025-01-04T15:30:00Z'
    },
    {
      id: 3,
      name: 'API Rate Limiting',
      status: 'active',
      description: 'Protection against abuse and unauthorized access',
      icon: 'Zap',
      lastVerified: '2025-01-04T15:30:00Z'
    },
    {
      id: 4,
      name: 'Data Encryption',
      status: 'active',
      description: 'AES-256 encryption for stored credentials',
      icon: 'Key',
      lastVerified: '2025-01-04T15:30:00Z'
    }
  ];

  const complianceStandards = [
    {
      name: 'SOC 2 Type II',
      status: 'certified',
      icon: 'Award'
    },
    {
      name: 'GDPR Compliant',
      status: 'certified',
      icon: 'Shield'
    },
    {
      name: 'ISO 27001',
      status: 'certified',
      icon: 'CheckCircle'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': case'certified':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatLastVerified = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return date?.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Security & Trust
        </h3>
        <p className="text-muted-foreground">
          Your data is protected by enterprise-grade security
        </p>
      </div>
      {/* Security Features */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">
          Security Features
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {securityFeatures?.map((feature) => (
            <div key={feature?.id} className="p-3 border border-border rounded-lg bg-card">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  feature?.status === 'active' ? 'bg-success/10' : 'bg-muted/50'
                }`}>
                  <Icon 
                    name={feature?.icon} 
                    size={16} 
                    className={getStatusColor(feature?.status)}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="text-sm font-medium text-foreground">
                      {feature?.name}
                    </h5>
                    <div className={`w-2 h-2 rounded-full ${
                      feature?.status === 'active' ? 'bg-success' : 'bg-muted-foreground'
                    }`} />
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">
                    {feature?.description}
                  </p>
                  
                  <p className="text-xs text-muted-foreground">
                    Verified {formatLastVerified(feature?.lastVerified)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Compliance Standards */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">
          Compliance & Certifications
        </h4>
        
        <div className="flex flex-wrap gap-3">
          {complianceStandards?.map((standard, index) => (
            <div key={index} className="flex items-center space-x-2 px-3 py-2 bg-success/10 border border-success/20 rounded-lg">
              <Icon 
                name={standard?.icon} 
                size={14} 
                className="text-success"
              />
              <span className="text-sm font-medium text-success">
                {standard?.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Indicators */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="ShieldCheck" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              Trusted by 10,000+ Businesses
            </h4>
            <p className="text-sm text-muted-foreground mb-2">
              Join thousands of companies that trust Ayrshare with their social media management
            </p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span>• 99.9% Uptime SLA</span>
              <span>• 24/7 Security Monitoring</span>
              <span>• Regular Security Audits</span>
            </div>
          </div>
        </div>
      </div>
      {/* Security Best Practices */}
      <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              Security Best Practices
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Never share your API key with unauthorized users</li>
              <li>• Rotate API keys regularly (every 90 days recommended)</li>
              <li>• Use environment variables to store credentials</li>
              <li>• Monitor API usage for unusual activity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityIndicators;