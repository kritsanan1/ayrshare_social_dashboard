import React, { useState, useEffect } from 'react';
import PrimarySidebar from '../../components/ui/PrimarySidebar';
import NavigationHeader from '../../components/ui/NavigationHeader';
import ApiKeyForm from './components/ApiKeyForm';
import ProfileKeyManager from './components/ProfileKeyManager';
import QuickSetupGuide from './components/QuickSetupGuide';
import SecurityIndicators from './components/SecurityIndicators';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Authentication = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('api-key');
  const [isMobile, setIsMobile] = useState(false);
  const [apiKeyValidated, setApiKeyValidated] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleApiKeyValidated = (apiKey) => {
    setApiKeyValidated(true);
    console.log('API Key validated:', apiKey);
  };

  const tabs = [
    {
      id: 'api-key',
      label: 'API Key Setup',
      icon: 'Key',
      description: 'Configure your primary API credentials'
    },
    {
      id: 'profile-keys',
      label: 'Profile Keys',
      icon: 'Users',
      description: 'Manage Business & Enterprise profiles'
    },
    {
      id: 'setup-guide',
      label: 'Setup Guide',
      icon: 'BookOpen',
      description: 'Step-by-step configuration help'
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      description: 'Trust indicators and compliance'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'api-key':
        return <ApiKeyForm onApiKeyValidated={handleApiKeyValidated} />;
      case 'profile-keys':
        return <ProfileKeyManager />;
      case 'setup-guide':
        return <QuickSetupGuide />;
      case 'security':
        return <SecurityIndicators />;
      default:
        return <ApiKeyForm onApiKeyValidated={handleApiKeyValidated} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PrimarySidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={handleToggleSidebar}
      />
      <div className={`transition-all duration-300 ${
        isMobile ? 'ml-0 pb-16' : sidebarCollapsed ? 'ml-16' : 'ml-60'
      }`}>
        <NavigationHeader />
        
        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Success Banner */}
            {apiKeyValidated && (
              <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <div>
                    <h3 className="text-sm font-medium text-success">
                      Authentication Successful!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your API key has been validated. You can now connect social accounts and start posting.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="ml-auto"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-8">
                <div className="bg-card border border-border rounded-lg shadow-sm">
                  {/* Tab Navigation */}
                  <div className="border-b border-border">
                    {isMobile ? (
                      // Mobile Dropdown
                      (<div className="p-4">
                        <select
                          value={activeTab}
                          onChange={(e) => setActiveTab(e?.target?.value)}
                          className="w-full p-2 bg-background border border-border rounded-lg text-foreground"
                        >
                          {tabs?.map((tab) => (
                            <option key={tab?.id} value={tab?.id}>
                              {tab?.label}
                            </option>
                          ))}
                        </select>
                      </div>)
                    ) : (
                      // Desktop Tabs
                      (<div className="flex overflow-x-auto">
                        {tabs?.map((tab) => (
                          <button
                            key={tab?.id}
                            onClick={() => setActiveTab(tab?.id)}
                            className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                              activeTab === tab?.id
                                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                            }`}
                          >
                            <Icon name={tab?.icon} size={16} />
                            <span className="font-medium">{tab?.label}</span>
                          </button>
                        ))}
                      </div>)
                    )}
                  </div>

                  {/* Tab Content */}
                  <div className="p-6">
                    {renderTabContent()}
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-4 space-y-6">
                {/* Connection Status */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-foreground mb-3">
                    Connection Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        apiKeyValidated ? 'bg-success' : 'bg-muted-foreground'
                      }`} />
                      <span className="text-sm text-muted-foreground">
                        API Authentication
                      </span>
                      {apiKeyValidated && (
                        <Icon name="CheckCircle" size={14} className="text-success" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Social Accounts
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Webhook Configuration
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-foreground mb-3">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ExternalLink"
                      iconPosition="right"
                      className="w-full justify-between"
                    >
                      Ayrshare Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Book"
                      iconPosition="right"
                      className="w-full justify-between"
                    >
                      API Documentation
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MessageCircle"
                      iconPosition="right"
                      className="w-full justify-between"
                    >
                      Get Support
                    </Button>
                  </div>
                </div>

                {/* API Limits */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-foreground mb-3">
                    API Usage
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Posts This Month</span>
                        <span className="text-foreground">12 / 100</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '12%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">API Calls Today</span>
                        <span className="text-foreground">245 / 1000</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: '24.5%' }} />
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="link"
                    size="sm"
                    className="w-full mt-3 text-primary"
                  >
                    Upgrade Plan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Authentication;