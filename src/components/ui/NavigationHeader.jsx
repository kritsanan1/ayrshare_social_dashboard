import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationHeader = () => {
  const location = useLocation();

  const getPageInfo = () => {
    switch (location?.pathname) {
      case '/authentication':
        return {
          title: 'Authentication',
          description: 'Manage API keys and authentication settings',
          breadcrumbs: [{ label: 'Setup', path: null }, { label: 'Authentication', path: '/authentication' }],
          actions: [
            { label: 'Generate API Key', icon: 'Key', variant: 'default' },
            { label: 'Test Connection', icon: 'Zap', variant: 'outline' }
          ]
        };
      case '/social-accounts':
        return {
          title: 'Social Accounts',
          description: 'Connect and manage your social media platforms',
          breadcrumbs: [{ label: 'Setup', path: null }, { label: 'Social Accounts', path: '/social-accounts' }],
          actions: [
            { label: 'Add Account', icon: 'Plus', variant: 'default' },
            { label: 'Refresh All', icon: 'RefreshCw', variant: 'outline' }
          ]
        };
      case '/post-creation':
        return {
          title: 'Post Creation',
          description: 'Create and compose posts for multiple platforms',
          breadcrumbs: [{ label: 'Content', path: null }, { label: 'Post Creation', path: '/post-creation' }],
          actions: [
            { label: 'Create Post', icon: 'PenTool', variant: 'default' },
            { label: 'Save Draft', icon: 'Save', variant: 'outline' }
          ]
        };
      case '/content-calendar':
        return {
          title: 'Content Calendar',
          description: 'Schedule and manage your content pipeline',
          breadcrumbs: [{ label: 'Content', path: null }, { label: 'Content Calendar', path: '/content-calendar' }],
          actions: [
            { label: 'Schedule Post', icon: 'Calendar', variant: 'default' },
            { label: 'Bulk Actions', icon: 'MoreHorizontal', variant: 'outline' }
          ]
        };
      case '/media-library':
        return {
          title: 'Media Library',
          description: 'Organize and manage your media assets',
          breadcrumbs: [{ label: 'Content', path: null }, { label: 'Media Library', path: '/media-library' }],
          actions: [
            { label: 'Upload Media', icon: 'Upload', variant: 'default' },
            { label: 'Create Folder', icon: 'FolderPlus', variant: 'outline' }
          ]
        };
      case '/messages-center':
        return {
          title: 'Messages Center',
          description: 'Monitor and respond to social media messages',
          breadcrumbs: [{ label: 'Messages', path: null }, { label: 'Messages Center', path: '/messages-center' }],
          actions: [
            { label: 'Mark All Read', icon: 'CheckCheck', variant: 'outline' },
            { label: 'Filter Messages', icon: 'Filter', variant: 'outline' }
          ]
        };
      default:
        return {
          title: 'Dashboard',
          description: 'Welcome to Ayrshare Social Dashboard',
          breadcrumbs: [{ label: 'Dashboard', path: '/' }],
          actions: []
        };
    }
  };

  const pageInfo = getPageInfo();

  const handleActionClick = (action) => {
    console.log(`${action?.label} clicked`);
  };

  return (
    <header className="bg-background border-b border-border">
      <div className="px-6 py-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm mb-4">
          {pageInfo?.breadcrumbs?.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              )}
              <span
                className={`${
                  index === pageInfo?.breadcrumbs?.length - 1
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground cursor-pointer'
                }`}
              >
                {crumb?.label}
              </span>
            </React.Fragment>
          ))}
        </nav>

        {/* Header Content */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              {pageInfo?.title}
            </h1>
            <p className="text-muted-foreground text-base">
              {pageInfo?.description}
            </p>
          </div>

          {/* Actions */}
          {pageInfo?.actions?.length > 0 && (
            <div className="flex items-center space-x-3 ml-6">
              {pageInfo?.actions?.map((action, index) => (
                <Button
                  key={index}
                  variant={action?.variant}
                  iconName={action?.icon}
                  iconPosition="left"
                  onClick={() => handleActionClick(action)}
                  className="whitespace-nowrap"
                >
                  {action?.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats or Status Indicators */}
        {location?.pathname === '/social-accounts' && (
          <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-sm text-muted-foreground">5 Connected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-warning rounded-full" />
              <span className="text-sm text-muted-foreground">2 Pending</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-error rounded-full" />
              <span className="text-sm text-muted-foreground">1 Error</span>
            </div>
          </div>
        )}

        {location?.pathname === '/messages-center' && (
          <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Icon name="MessageSquare" size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">12 Unread</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-sm text-muted-foreground">3 Pending Response</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-muted-foreground">45 Resolved Today</span>
            </div>
          </div>
        )}

        {location?.pathname === '/content-calendar' && (
          <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">8 Scheduled Today</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-sm text-muted-foreground">15 This Week</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Edit" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">3 Drafts</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavigationHeader;