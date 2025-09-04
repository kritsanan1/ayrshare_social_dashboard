import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlatformFilters = ({ 
  selectedFilter, 
  onFilterChange, 
  platforms, 
  onRefreshAll, 
  isRefreshing 
}) => {
  const filterOptions = [
    {
      id: 'all',
      label: 'All Platforms',
      icon: 'Grid3X3',
      count: platforms?.length
    },
    {
      id: 'connected',
      label: 'Connected',
      icon: 'CheckCircle',
      count: platforms?.filter(p => p?.status === 'connected')?.length
    },
    {
      id: 'disconnected',
      label: 'Available',
      icon: 'Circle',
      count: platforms?.filter(p => p?.status === 'disconnected')?.length
    },
    {
      id: 'issues',
      label: 'Issues',
      icon: 'AlertTriangle',
      count: platforms?.filter(p => p?.status === 'error' || p?.status === 'warning')?.length
    }
  ];

  const platformCategories = [
    {
      id: 'social',
      label: 'Social Media',
      platforms: ['twitter', 'facebook', 'instagram', 'linkedin', 'tiktok', 'snapchat']
    },
    {
      id: 'professional',
      label: 'Professional',
      platforms: ['linkedin', 'youtube', 'pinterest']
    },
    {
      id: 'messaging',
      label: 'Messaging',
      platforms: ['telegram', 'whatsapp']
    },
    {
      id: 'content',
      label: 'Content',
      platforms: ['youtube', 'pinterest', 'reddit']
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Platform Management</h2>
          <p className="text-sm text-muted-foreground">
            Manage connections across all supported social media platforms
          </p>
        </div>
        <Button
          variant="outline"
          iconName="RefreshCw"
          onClick={onRefreshAll}
          loading={isRefreshing}
          disabled={isRefreshing}
        >
          Refresh All
        </Button>
      </div>
      {/* Status Filters */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Filter by Status</h3>
        <div className="flex flex-wrap gap-2">
          {filterOptions?.map((filter) => (
            <button
              key={filter?.id}
              onClick={() => onFilterChange(filter?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                selectedFilter === filter?.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-foreground border-border hover:bg-muted/50'
              }`}
            >
              <Icon name={filter?.icon} size={16} />
              <span className="text-sm font-medium">{filter?.label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedFilter === filter?.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {filter?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Platform Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {platformCategories?.map((category) => {
          const categoryPlatforms = platforms?.filter(p => 
            category?.platforms?.includes(p?.id?.toLowerCase())
          );
          const connectedCount = categoryPlatforms?.filter(p => p?.status === 'connected')?.length;
          
          return (
            <div key={category?.id} className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-foreground">{category?.label}</h4>
                <span className="text-xs text-muted-foreground">
                  {connectedCount}/{categoryPlatforms?.length}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${categoryPlatforms?.length > 0 ? (connectedCount / categoryPlatforms?.length) * 100 : 0}%`
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {connectedCount === categoryPlatforms?.length
                  ? 'All connected'
                  : connectedCount === 0
                  ? 'None connected'
                  : `${categoryPlatforms?.length - connectedCount} remaining`
                }
              </p>
            </div>
          );
        })}
      </div>
      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {platforms?.filter(p => p?.status === 'connected')?.length}
            </div>
            <div className="text-sm text-muted-foreground">Connected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">
              {platforms?.filter(p => p?.status === 'warning')?.length}
            </div>
            <div className="text-sm text-muted-foreground">Warnings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-error">
              {platforms?.filter(p => p?.status === 'error')?.length}
            </div>
            <div className="text-sm text-muted-foreground">Errors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground">
              {platforms?.filter(p => p?.status === 'disconnected')?.length}
            </div>
            <div className="text-sm text-muted-foreground">Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformFilters;