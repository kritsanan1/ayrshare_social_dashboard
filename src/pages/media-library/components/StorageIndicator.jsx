import React from 'react';
import Icon from '../../../components/AppIcon';

const StorageIndicator = () => {
  // Mock storage data
  const storageData = {
    used: 2.4, // GB
    total: 10, // GB
    percentage: 24
  };

  const formatSize = (sizeInGB) => {
    if (sizeInGB >= 1) {
      return `${sizeInGB?.toFixed(1)} GB`;
    }
    return `${Math.round(sizeInGB * 1024)} MB`;
  };

  const getStorageColor = (percentage) => {
    if (percentage >= 90) return 'text-red-500 bg-red-100';
    if (percentage >= 70) return 'text-yellow-500 bg-yellow-100';
    return 'text-green-500 bg-green-100';
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Storage Usage */}
      <div className="flex items-center space-x-2 bg-card rounded-lg border border-border px-3 py-2">
        <Icon name="HardDrive" size={16} className="text-muted-foreground" />
        <div className="text-sm">
          <span className="font-medium text-foreground">
            {formatSize(storageData?.used)}
          </span>
          <span className="text-muted-foreground"> / {formatSize(storageData?.total)}</span>
        </div>
      </div>
      {/* Storage Progress Bar */}
      <div className="flex items-center space-x-2">
        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              storageData?.percentage >= 90 
                ? 'bg-red-500' 
                : storageData?.percentage >= 70 
                  ? 'bg-yellow-500' :'bg-primary'
            }`}
            style={{ width: `${Math.min(storageData?.percentage, 100)}%` }}
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {storageData?.percentage}%
        </span>
      </div>
      {/* Upgrade Link */}
      {storageData?.percentage >= 80 && (
        <button className="text-sm text-primary hover:text-primary/80 font-medium">
          Upgrade Storage
        </button>
      )}
    </div>
  );
};

export default StorageIndicator;