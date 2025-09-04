import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PrimarySidebar from '../../components/ui/PrimarySidebar';
import NavigationHeader from '../../components/ui/NavigationHeader';
import PlatformCard from './components/PlatformCard';
import ConnectionWizard from './components/ConnectionWizard';
import PlatformFilters from './components/PlatformFilters';
import BulkActions from './components/BulkActions';
import AccountHealthMonitor from './components/AccountHealthMonitor';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { Checkbox } from '../../components/ui/Checkbox';

const SocialAccounts = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedPlatformForWizard, setSelectedPlatformForWizard] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [platforms, setPlatforms] = useState([
    {
      id: 'twitter',
      name: 'Twitter (X)',
      logo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=100&h=100&fit=crop&crop=center',
      status: 'connected',
      lastSync: '2 minutes ago',
      rateLimit: { used: 45, total: 100 },
      permissions: { status: 'full' },
      accountInfo: {
        displayName: 'John Marketing',
        username: 'johnmarketing',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        followers: 12500,
        following: 890,
        posts: 1250
      }
    },
    {
      id: 'facebook',
      name: 'Facebook',
      logo: 'https://images.unsplash.com/photo-1633675254053-d96c7668c3b8?w=100&h=100&fit=crop&crop=center',
      status: 'connected',
      lastSync: '5 minutes ago',
      rateLimit: { used: 23, total: 200 },
      permissions: { status: 'full' },
      accountInfo: {
        displayName: 'Marketing Agency Pro',
        username: 'marketingagencypro',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
        followers: 8900,
        following: 450,
        posts: 890
      }
    },
    {
      id: 'instagram',
      name: 'Instagram',
      logo: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=100&h=100&fit=crop&crop=center',
      status: 'warning',
      lastSync: '1 hour ago',
      rateLimit: { used: 180, total: 200 },
      permissions: { status: 'limited' },
      warningMessage: 'Rate limit approaching. Consider upgrading your plan.',
      accountInfo: {
        displayName: 'Creative Studio',
        username: 'creativestudio',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        followers: 25600,
        following: 1200,
        posts: 2100
      }
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      logo: 'https://images.unsplash.com/photo-1633675254053-d96c7668c3b8?w=100&h=100&fit=crop&crop=center',
      status: 'connected',
      lastSync: '3 minutes ago',
      rateLimit: { used: 12, total: 50 },
      permissions: { status: 'full' },
      accountInfo: {
        displayName: 'Professional Services Inc',
        username: 'professionalservices',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        followers: 5600,
        following: 890,
        posts: 450
      }
    },
    {
      id: 'youtube',
      name: 'YouTube',
      logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop&crop=center',
      status: 'error',
      lastSync: '2 hours ago',
      rateLimit: { used: 0, total: 10000 },
      permissions: { status: 'none' },
      errorMessage: 'Authentication token expired. Please reconnect your account.'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      logo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=100&h=100&fit=crop&crop=center',
      status: 'connected',
      lastSync: '10 minutes ago',
      rateLimit: { used: 5, total: 100 },
      permissions: { status: 'full' },
      accountInfo: {
        displayName: 'Viral Content Creator',
        username: 'viralcreator',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        followers: 45600,
        following: 230,
        posts: 890
      }
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      logo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=100&h=100&fit=crop&crop=center',
      status: 'disconnected',
      lastSync: null,
      rateLimit: { used: 0, total: 1000 },
      permissions: { status: 'none' }
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      logo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=100&h=100&fit=crop&crop=center',
      status: 'disconnected',
      lastSync: null,
      rateLimit: { used: 0, total: 100 },
      permissions: { status: 'none' }
    },
    {
      id: 'reddit',
      name: 'Reddit',
      logo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=100&h=100&fit=crop&crop=center',
      status: 'disconnected',
      lastSync: null,
      rateLimit: { used: 0, total: 60 },
      permissions: { status: 'none' }
    },
    {
      id: 'telegram',
      name: 'Telegram',
      logo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=100&h=100&fit=crop&crop=center',
      status: 'disconnected',
      lastSync: null,
      rateLimit: { used: 0, total: 30 },
      permissions: { status: 'none' }
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      logo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=100&h=100&fit=crop&crop=center',
      status: 'disconnected',
      lastSync: null,
      rateLimit: { used: 0, total: 1000 },
      permissions: { status: 'none' }
    },
    {
      id: 'discord',
      name: 'Discord',
      logo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=100&h=100&fit=crop&crop=center',
      status: 'disconnected',
      lastSync: null,
      rateLimit: { used: 0, total: 50 },
      permissions: { status: 'none' }
    },
    {
      id: 'mastodon',
      name: 'Mastodon',
      logo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=100&h=100&fit=crop&crop=center',
      status: 'disconnected',
      lastSync: null,
      rateLimit: { used: 0, total: 300 },
      permissions: { status: 'none' }
    }
  ]);

  const filteredPlatforms = platforms?.filter(platform => {
    switch (selectedFilter) {
      case 'connected':
        return platform?.status === 'connected';
      case 'disconnected':
        return platform?.status === 'disconnected';
      case 'issues':
        return platform?.status === 'error' || platform?.status === 'warning';
      default:
        return true;
    }
  });

  const handleConnect = async (platformId) => {
    const platform = platforms?.find(p => p?.id === platformId);
    if (platform) {
      setSelectedPlatformForWizard(platform);
      setIsWizardOpen(true);
    }
  };

  const handleDisconnect = async (platformId) => {
    setPlatforms(prev => prev?.map(platform => 
      platform?.id === platformId 
        ? { 
            ...platform, 
            status: 'disconnected', 
            lastSync: null, 
            accountInfo: null,
            rateLimit: { ...platform?.rateLimit, used: 0 },
            permissions: { status: 'none' }
          }
        : platform
    ));
  };

  const handleRefresh = async (platformId) => {
    setPlatforms(prev => prev?.map(platform => 
      platform?.id === platformId && platform?.status === 'connected'
        ? { 
            ...platform, 
            lastSync: 'Just now',
            rateLimit: { ...platform?.rateLimit, used: Math.max(0, platform?.rateLimit?.used - 5) }
          }
        : platform
    ));
  };

  const handleManagePermissions = (platformId) => {
    console.log(`Managing permissions for platform: ${platformId}`);
  };

  const handleWizardConnect = (platformId) => {
    setPlatforms(prev => prev?.map(platform => 
      platform?.id === platformId 
        ? { 
            ...platform, 
            status: 'connected',
            lastSync: 'Just now',
            accountInfo: {
              displayName: 'New Connected Account',
              username: 'newaccount',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
              followers: 1000,
              following: 500,
              posts: 100
            },
            permissions: { status: 'full' }
          }
        : platform
    ));
  };

  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPlatforms(prev => prev?.map(platform => 
        platform?.status === 'connected'
          ? { ...platform, lastSync: 'Just now' }
          : platform
      ));
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSelectPlatform = (platformId, checked) => {
    if (checked) {
      setSelectedPlatforms(prev => [...prev, platformId]);
    } else {
      setSelectedPlatforms(prev => prev?.filter(id => id !== platformId));
    }
  };

  const handleSelectAll = () => {
    setSelectedPlatforms(filteredPlatforms?.map(p => p?.id));
  };

  const handleDeselectAll = () => {
    setSelectedPlatforms([]);
  };

  const handleBulkDisconnect = async (platformIds) => {
    setPlatforms(prev => prev?.map(platform => 
      platformIds?.includes(platform?.id) && platform?.status === 'connected'
        ? { 
            ...platform, 
            status: 'disconnected', 
            lastSync: null, 
            accountInfo: null,
            permissions: { status: 'none' }
          }
        : platform
    ));
    setSelectedPlatforms([]);
  };

  const handleBulkRefresh = async (platformIds) => {
    setPlatforms(prev => prev?.map(platform => 
      platformIds?.includes(platform?.id) && platform?.status === 'connected'
        ? { ...platform, lastSync: 'Just now' }
        : platform
    ));
    setSelectedPlatforms([]);
  };

  return (
    <>
      <Helmet>
        <title>Social Accounts - Ayrshare Dashboard</title>
        <meta name="description" content="Manage OAuth connections and profile configurations across all 13 supported social media platforms" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <PrimarySidebar 
          isCollapsed={sidebarCollapsed} 
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-60'}`}>
          <NavigationHeader />
          
          <main className="p-6">
            {/* Account Health Monitor */}
            <AccountHealthMonitor platforms={platforms} />

            {/* Platform Filters */}
            <PlatformFilters
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
              platforms={platforms}
              onRefreshAll={handleRefreshAll}
              isRefreshing={isRefreshing}
            />

            {/* Bulk Actions */}
            <BulkActions
              selectedPlatforms={selectedPlatforms}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
              onBulkDisconnect={handleBulkDisconnect}
              onBulkRefresh={handleBulkRefresh}
              platforms={filteredPlatforms}
            />

            {/* Quick Actions */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {selectedFilter === 'all' ? 'All Platforms' :
                   selectedFilter === 'connected' ? 'Connected Accounts' :
                   selectedFilter === 'disconnected' ? 'Available Platforms' :
                   'Platforms with Issues'}
                </h2>
                <p className="text-muted-foreground">
                  {filteredPlatforms?.length} platform{filteredPlatforms?.length !== 1 ? 's' : ''} found
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  onClick={() => console.log('Export configuration')}
                >
                  Export Config
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  onClick={() => {
                    const disconnectedPlatform = platforms?.find(p => p?.status === 'disconnected');
                    if (disconnectedPlatform) {
                      handleConnect(disconnectedPlatform?.id);
                    }
                  }}
                >
                  Connect New Account
                </Button>
              </div>
            </div>

            {/* Platforms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlatforms?.map((platform) => (
                <div key={platform?.id} className="relative">
                  {/* Selection Checkbox */}
                  <div className="absolute top-4 left-4 z-10">
                    <Checkbox
                      checked={selectedPlatforms?.includes(platform?.id)}
                      onChange={(e) => handleSelectPlatform(platform?.id, e?.target?.checked)}
                    />
                  </div>
                  
                  <PlatformCard
                    platform={platform}
                    onConnect={handleConnect}
                    onDisconnect={handleDisconnect}
                    onRefresh={handleRefresh}
                    onManagePermissions={handleManagePermissions}
                  />
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredPlatforms?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No platforms found</h3>
                <p className="text-muted-foreground mb-6">
                  No platforms match your current filter criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSelectedFilter('all')}
                >
                  Show All Platforms
                </Button>
              </div>
            )}
          </main>
        </div>

        {/* Connection Wizard */}
        <ConnectionWizard
          isOpen={isWizardOpen}
          onClose={() => {
            setIsWizardOpen(false);
            setSelectedPlatformForWizard(null);
          }}
          platform={selectedPlatformForWizard}
          onConnect={handleWizardConnect}
        />
      </div>
    </>
  );
};

export default SocialAccounts;