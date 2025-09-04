import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickSetupGuide = () => {
  const [expandedStep, setExpandedStep] = useState(null);

  const setupSteps = [
    {
      id: 1,
      title: 'Create Ayrshare Account',
      description: 'Sign up for a free or paid Ayrshare account',
      details: `Visit ayrshare.com and create your account. Choose from:\n• Free Plan: 30 posts/month\n• Starter Plan: $9.99/month for 100 posts\n• Growth Plan: $19.99/month for 500 posts\n• Business Plan: $49.99/month with profile keys`,
      icon: 'UserPlus',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Generate API Key',
      description: 'Get your API key from the Ayrshare dashboard',
      details: `1. Log into your Ayrshare dashboard\n2. Navigate to Settings > API Keys\n3. Click "Generate New API Key"\n4. Copy the key (starts with "ayr_")\n5. Keep it secure - treat it like a password`,
      icon: 'Key',
      status: 'current'
    },
    {
      id: 3,
      title: 'Connect Social Accounts',
      description: 'Link your social media platforms',
      details: `After API validation, you can connect:\n• Facebook Pages & Groups\n• Instagram Business Accounts\n• Twitter/X Accounts\n• LinkedIn Pages & Profiles\n• YouTube Channels\n• TikTok Business Accounts\n• And 7 more platforms`,
      icon: 'Link',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Start Posting',
      description: 'Create and schedule your first post',
      details: `Once connected, you can:\n• Create posts with text, images, and videos\n• Schedule posts for optimal engagement\n• Use AI-powered hashtag suggestions\n• Track analytics and performance\n• Manage comments and messages`,
      icon: 'Send',
      status: 'pending'
    }
  ];

  const toggleStep = (stepId) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'current':
        return 'text-primary';
      case 'pending':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'current':
        return 'Circle';
      case 'pending':
        return 'Circle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Quick Setup Guide
        </h3>
        <p className="text-muted-foreground">
          Follow these steps to get started with Ayrshare
        </p>
      </div>
      <div className="space-y-3">
        {setupSteps?.map((step, index) => (
          <div key={step?.id} className="border border-border rounded-lg bg-card">
            <button
              onClick={() => toggleStep(step?.id)}
              className="w-full p-4 text-left hover:bg-muted/20 transition-colors rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    step?.status === 'completed' ? 'bg-success border-success' :
                    step?.status === 'current'? 'bg-primary border-primary' : 'border-muted-foreground'
                  }`}>
                    {step?.status === 'completed' ? (
                      <Icon name="Check" size={16} className="text-white" />
                    ) : (
                      <span className={`text-sm font-medium ${
                        step?.status === 'current' ? 'text-white' : 'text-muted-foreground'
                      }`}>
                        {step?.id}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon 
                      name={step?.icon} 
                      size={16} 
                      className={getStatusColor(step?.status)}
                    />
                    <h4 className="text-sm font-medium text-foreground">
                      {step?.title}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {step?.description}
                  </p>
                </div>
                
                <div className="flex-shrink-0">
                  <Icon 
                    name={expandedStep === step?.id ? 'ChevronUp' : 'ChevronDown'} 
                    size={16} 
                    className="text-muted-foreground"
                  />
                </div>
              </div>
            </button>
            
            {expandedStep === step?.id && (
              <div className="px-4 pb-4">
                <div className="ml-12 p-3 bg-muted/30 rounded-lg">
                  <pre className="text-sm text-foreground whitespace-pre-wrap font-sans">
                    {step?.details}
                  </pre>
                  
                  {step?.id === 2 && (
                    <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-warning mb-1">
                            Test Credentials Available
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Use API key: <code className="bg-muted px-1 rounded">ayr_test_key_12345</code> for testing
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              Need Help?
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Check out our comprehensive documentation and support resources
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" iconName="Book">
                Documentation
              </Button>
              <Button variant="outline" size="sm" iconName="MessageCircle">
                Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickSetupGuide;