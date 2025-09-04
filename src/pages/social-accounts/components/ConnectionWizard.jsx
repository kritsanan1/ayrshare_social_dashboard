import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ConnectionWizard = ({ isOpen, onClose, platform, onConnect }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  const steps = [
    {
      id: 1,
      title: 'Platform Selection',
      description: 'Confirm the platform you want to connect'
    },
    {
      id: 2,
      title: 'Authorization',
      description: 'Authorize Ayrshare to access your account'
    },
    {
      id: 3,
      title: 'Permissions',
      description: 'Configure posting and access permissions'
    },
    {
      id: 4,
      title: 'Completion',
      description: 'Account successfully connected'
    }
  ];

  const handleConnect = async () => {
    setIsConnecting(true);
    setConnectionError(null);
    
    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate potential error
      if (Math.random() > 0.8) {
        throw new Error('Authorization was denied by the user');
      }
      
      setCurrentStep(4);
      setTimeout(() => {
        onConnect(platform?.id);
        onClose();
        setCurrentStep(1);
      }, 2000);
    } catch (error) {
      setConnectionError(error?.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setConnectionError(null);
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <Image
                src={platform?.logo}
                alt={`${platform?.name} logo`}
                className="w-10 h-10 object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Connect to {platform?.name}
            </h3>
            <p className="text-muted-foreground mb-6">
              You're about to connect your {platform?.name} account to Ayrshare. This will allow you to:
            </p>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <Icon name="Check" size={16} className="text-success" />
                <span className="text-sm text-foreground">Post content to your {platform?.name} account</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Check" size={16} className="text-success" />
                <span className="text-sm text-foreground">Schedule posts for optimal engagement</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Check" size={16} className="text-success" />
                <span className="text-sm text-foreground">View analytics and engagement metrics</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Check" size={16} className="text-success" />
                <span className="text-sm text-foreground">Manage comments and messages</span>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              {isConnecting ? (
                <Icon name="Loader2" size={24} className="text-primary animate-spin" />
              ) : (
                <Icon name="Shield" size={24} className="text-primary" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {isConnecting ? 'Connecting...' : 'Authorization Required'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {isConnecting 
                ? `We're connecting to your ${platform?.name} account. This may take a few moments.`
                : `Click the button below to authorize Ayrshare to access your ${platform?.name} account.`
              }
            </p>
            
            {connectionError && (
              <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-error">Connection Failed</p>
                    <p className="text-xs text-error/80 mt-1">{connectionError}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
              <Icon name="Settings" size={24} className="text-success" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Configure Permissions
            </h3>
            <p className="text-muted-foreground mb-6">
              Your account is connected! Configure your posting preferences and permissions.
            </p>
            <div className="space-y-4 text-left">
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Post Content</p>
                    <p className="text-xs text-muted-foreground">Allow posting text, images, and videos</p>
                  </div>
                  <Icon name="Check" size={16} className="text-success" />
                </div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Read Analytics</p>
                    <p className="text-xs text-muted-foreground">Access engagement metrics and insights</p>
                  </div>
                  <Icon name="Check" size={16} className="text-success" />
                </div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Manage Comments</p>
                    <p className="text-xs text-muted-foreground">Respond to and moderate comments</p>
                  </div>
                  <Icon name="Check" size={16} className="text-success" />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
              <Icon name="CheckCircle" size={24} className="text-success" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Successfully Connected!
            </h3>
            <p className="text-muted-foreground mb-6">
              Your {platform?.name} account has been connected to Ayrshare. You can now start posting and managing your content.
            </p>
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <p className="text-sm text-success font-medium">
                🎉 You're all set! Your account will appear in the connected accounts list.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderStepActions = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="default" onClick={() => setCurrentStep(2)}>
              Continue
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => setCurrentStep(1)} disabled={isConnecting}>
              Back
            </Button>
            <Button
              variant="default"
              onClick={handleConnect}
              loading={isConnecting}
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting...' : `Connect to ${platform?.name}`}
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => setCurrentStep(2)}>
              Back
            </Button>
            <Button variant="default" onClick={() => setCurrentStep(4)}>
              Save Settings
            </Button>
          </div>
        );

      case 4:
        return (
          <Button variant="default" onClick={handleClose}>
            Done
          </Button>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={handleClose} />
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-card border border-border rounded-lg shadow-lg elevation-modal">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Connect Account</h2>
            <p className="text-sm text-muted-foreground">Step {currentStep} of {steps?.length}</p>
          </div>
          <Button variant="ghost" size="sm" iconName="X" onClick={handleClose} />
        </div>

        {/* Progress */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center space-x-2">
            {steps?.map((step, index) => (
              <React.Fragment key={step?.id}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  currentStep > step?.id ? 'bg-success text-success-foreground' :
                  currentStep === step?.id ? 'bg-primary text-primary-foreground': 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step?.id ? (
                    <Icon name="Check" size={14} />
                  ) : (
                    step?.id
                  )}
                </div>
                {index < steps?.length - 1 && (
                  <div className={`flex-1 h-0.5 ${
                    currentStep > step?.id ? 'bg-success' : 'bg-muted'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderStepContent()}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          {renderStepActions()}
        </div>
      </div>
    </div>
  );
};

export default ConnectionWizard;