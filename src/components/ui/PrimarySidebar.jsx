import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const PrimarySidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigationItems = [
    {
      section: 'Setup',
      items: [
        {
          label: 'Authentication',
          path: '/authentication',
          icon: 'Shield',
          description: 'Manage API keys and authentication'
        },
        {
          label: 'Social Accounts',
          path: '/social-accounts',
          icon: 'Users',
          description: 'Connect and manage social platforms'
        }
      ]
    },
    {
      section: 'Content',
      items: [
        {
          label: 'Post Creation',
          path: '/post-creation',
          icon: 'PenTool',
          description: 'Create and compose posts'
        },
        {
          label: 'Content Calendar',
          path: '/content-calendar',
          icon: 'Calendar',
          description: 'Schedule and manage content'
        },
        {
          label: 'Media Library',
          path: '/media-library',
          icon: 'Image',
          description: 'Manage media assets'
        }
      ]
    },
    {
      section: 'Messages',
      items: [
        {
          label: 'Messages Center',
          path: '/messages-center',
          icon: 'MessageSquare',
          description: 'Monitor and respond to messages'
        }
      ]
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-100 bg-card border-t border-border">
        <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
          {navigationItems?.[1]?.items?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200 min-w-0 flex-1 ${
                isActiveRoute(item?.path)
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={item?.icon} size={20} className="mb-1" />
              <span className="text-xs font-medium truncate">{item?.label}</span>
            </button>
          ))}
          <button
            onClick={() => handleNavigation('/messages-center')}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200 min-w-0 flex-1 ${
              isActiveRoute('/messages-center')
                ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name="MessageSquare" size={20} className="mb-1" />
            <span className="text-xs font-medium truncate">Messages</span>
          </button>
        </div>
      </nav>
    );
  }

  return (
    <aside className={`fixed left-0 top-0 z-100 h-full bg-card border-r border-border transition-all duration-300 ease-out ${
      isCollapsed ? 'w-16' : 'w-60'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Share2" size={20} color="white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-semibold text-foreground">Ayrshare</h1>
                <p className="text-xs text-muted-foreground">Social Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin p-4">
          <div className="space-y-6">
            {navigationItems?.map((section) => (
              <div key={section?.section}>
                {!isCollapsed && (
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    {section?.section}
                  </h3>
                )}
                <div className="space-y-1">
                  {section?.items?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-out group ${
                        isActiveRoute(item?.path)
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                      title={isCollapsed ? item?.label : item?.description}
                    >
                      <Icon 
                        name={item?.icon} 
                        size={20} 
                        className={`flex-shrink-0 ${
                          isActiveRoute(item?.path) ? 'text-primary-foreground' : ''
                        }`}
                      />
                      {!isCollapsed && (
                        <span className="font-medium truncate">{item?.label}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* Connection Status */}
        <div className="p-4 border-t border-border">
          <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' ? 'bg-success' : 
              connectionStatus === 'warning' ? 'bg-warning' : 'bg-error'
            }`} />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">API Status</p>
                <p className={`text-xs ${getConnectionStatusColor()}`}>
                  {connectionStatus === 'connected' ? 'All systems operational' :
                   connectionStatus === 'warning' ? 'Some issues detected' : 'Connection error'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse Toggle */}
        <div className="p-4 border-t border-border">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon 
              name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} 
              size={20} 
            />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default PrimarySidebar;