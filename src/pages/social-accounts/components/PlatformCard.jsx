import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PlatformCard = ({ platform, onConnect, onDisconnect, onRefresh, onManagePermissions }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await onConnect(platform?.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setIsLoading(true);
    try {
      await onDisconnect(platform?.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await onRefresh(platform?.id);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      case 'disconnected':
        return 'text-muted-foreground';
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
      case 'disconnected':
        return 'Circle';
      default:
        return 'Circle';
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000)?.toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'K';
    }
    return num?.toString() || '0';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200">
      {/* Platform Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            <Image
              src={platform?.logo}
              alt={`${platform?.name} logo`}
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{platform?.name}</h3>
            <div className="flex items-center space-x-2">
              <Icon
                name={getStatusIcon(platform?.status)}
                size={16}
                className={getStatusColor(platform?.status)}
              />
              <span className={`text-sm font-medium ${getStatusColor(platform?.status)}`}>
                {platform?.status === 'connected' ? 'Connected' :
                 platform?.status === 'warning' ? 'Issues Detected' :
                 platform?.status === 'error' ? 'Connection Error' : 'Not Connected'}
              </span>
            </div>
          </div>
        </div>

        {platform?.status === 'connected' && (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="RefreshCw"
              onClick={handleRefresh}
              loading={isLoading}
              disabled={isLoading}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Settings"
              onClick={() => onManagePermissions(platform?.id)}
            />
          </div>
        )}
      </div>
      {/* Account Information */}
      {platform?.status === 'connected' && platform?.accountInfo && (
        <div className="mb-4 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-background">
              <Image
                src={platform?.accountInfo?.avatar}
                alt={`${platform?.accountInfo?.username} avatar`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-foreground">{platform?.accountInfo?.displayName}</p>
              <p className="text-sm text-muted-foreground">@{platform?.accountInfo?.username}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">
                {formatNumber(platform?.accountInfo?.followers)}
              </p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">
                {formatNumber(platform?.accountInfo?.following)}
              </p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">
                {formatNumber(platform?.accountInfo?.posts)}
              </p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
          </div>
        </div>
      )}
      {/* Connection Details */}
      {platform?.status === 'connected' && (
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last Sync:</span>
            <span className="text-foreground">{platform?.lastSync}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">API Rate Limit:</span>
            <span className="text-foreground">{platform?.rateLimit?.used}/{platform?.rateLimit?.total}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Permissions:</span>
            <span className={`font-medium ${platform?.permissions?.status === 'full' ? 'text-success' : 'text-warning'}`}>
              {platform?.permissions?.status === 'full' ? 'Full Access' : 'Limited Access'}
            </span>
          </div>
        </div>
      )}
      {/* Error Message */}
      {platform?.status === 'error' && platform?.errorMessage && (
        <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
            <div>
              <p className="text-sm font-medium text-error">Connection Error</p>
              <p className="text-xs text-error/80 mt-1">{platform?.errorMessage}</p>
            </div>
          </div>
        </div>
      )}
      {/* Warning Message */}
      {platform?.status === 'warning' && platform?.warningMessage && (
        <div className="mb-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">Attention Required</p>
              <p className="text-xs text-warning/80 mt-1">{platform?.warningMessage}</p>
            </div>
          </div>
        </div>
      )}
      {/* Actions */}
      <div className="flex items-center space-x-2">
        {platform?.status === 'connected' ? (
          <>
            <Button
              variant="outline"
              size="sm"
              iconName="Unlink"
              onClick={handleDisconnect}
              loading={isLoading}
              disabled={isLoading}
            >
              Disconnect
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Settings"
              onClick={() => onManagePermissions(platform?.id)}
            >
              Manage
            </Button>
          </>
        ) : (
          <Button
            variant="default"
            size="sm"
            iconName="Link"
            onClick={handleConnect}
            loading={isLoading}
            disabled={isLoading}
            fullWidth
          >
            Connect Account
          </Button>
        )}
      </div>
    </div>
  );
};

export default PlatformCard;