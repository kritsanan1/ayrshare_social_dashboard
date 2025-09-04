import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const ConnectionStatus = ({ isCollapsed = false }) => {
  const [status, setStatus] = useState('connected');
  const [isExpanded, setIsExpanded] = useState(false);
  const [connections, setConnections] = useState([
    { platform: 'Twitter', status: 'connected', lastSync: '2 min ago' },
    { platform: 'Facebook', status: 'connected', lastSync: '5 min ago' },
    { platform: 'Instagram', status: 'warning', lastSync: '1 hour ago' },
    { platform: 'LinkedIn', status: 'connected', lastSync: '3 min ago' },
    { platform: 'YouTube', status: 'error', lastSync: '2 hours ago' },
  ]);

  useEffect(() => {
    const checkOverallStatus = () => {
      const hasError = connections?.some(conn => conn?.status === 'error');
      const hasWarning = connections?.some(conn => conn?.status === 'warning');
      
      if (hasError) {
        setStatus('error');
      } else if (hasWarning) {
        setStatus('warning');
      } else {
        setStatus('connected');
      }
    };

    checkOverallStatus();
  }, [connections]);

  const getStatusColor = (status) => {
    switch (status) {
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'connected':
        return 'All systems operational';
      case 'warning':
        return 'Some issues detected';
      case 'error':
        return 'Connection errors';
      default:
        return 'Checking status...';
    }
  };

  const handleRetryConnection = (platform) => {
    setConnections(prev => 
      prev?.map(conn => 
        conn?.platform === platform 
          ? { ...conn, status: 'connected', lastSync: 'Just now' }
          : conn
      )
    );
  };

  const toggleExpanded = () => {
    if (!isCollapsed) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="relative">
      {/* Main Status Display */}
      <button
        onClick={toggleExpanded}
        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-muted/50 ${
          isCollapsed ? 'justify-center' : ''
        }`}
        title={isCollapsed ? getStatusText(status) : 'Click to view details'}
      >
        <div className={`w-2 h-2 rounded-full ${
          status === 'connected' ? 'bg-success' : 
          status === 'warning' ? 'bg-warning' : 'bg-error'
        }`} />
        
        {!isCollapsed && (
          <>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-foreground">API Status</p>
              <p className={`text-xs ${getStatusColor(status)}`}>
                {getStatusText(status)}
              </p>
            </div>
            <Icon 
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
              size={16} 
              className="text-muted-foreground"
            />
          </>
        )}
      </button>
      {/* Expanded Details Panel */}
      {isExpanded && !isCollapsed && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-popover border border-border rounded-lg shadow-lg elevation-modal animate-slide-up">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-foreground">Platform Connections</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            
            <div className="space-y-2">
              {connections?.map((connection) => (
                <div key={connection?.platform} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={getStatusIcon(connection?.status)} 
                      size={16} 
                      className={getStatusColor(connection?.status)}
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {connection?.platform}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Last sync: {connection?.lastSync}
                      </p>
                    </div>
                  </div>
                  
                  {connection?.status !== 'connected' && (
                    <button
                      onClick={() => handleRetryConnection(connection?.platform)}
                      className="text-xs text-primary hover:text-primary/80 font-medium"
                    >
                      Retry
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-3 border-t border-border">
              <button className="w-full text-xs text-primary hover:text-primary/80 font-medium">
                View Full Status Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;