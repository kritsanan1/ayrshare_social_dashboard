import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkActions = ({ 
  selectedPlatforms, 
  onSelectAll, 
  onDeselectAll, 
  onBulkDisconnect, 
  onBulkRefresh,
  platforms 
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const connectedPlatforms = platforms?.filter(p => p?.status === 'connected');
  const selectedConnectedPlatforms = selectedPlatforms?.filter(id => 
    connectedPlatforms?.some(p => p?.id === id)
  );

  const handleBulkAction = async (action) => {
    setBulkAction(action);
    setIsConfirmOpen(true);
  };

  const executeBulkAction = async () => {
    setIsProcessing(true);
    try {
      if (bulkAction === 'disconnect') {
        await onBulkDisconnect(selectedPlatforms);
      } else if (bulkAction === 'refresh') {
        await onBulkRefresh(selectedPlatforms);
      }
    } finally {
      setIsProcessing(false);
      setIsConfirmOpen(false);
      setBulkAction(null);
    }
  };

  const getActionDetails = () => {
    switch (bulkAction) {
      case 'disconnect':
        return {
          title: 'Disconnect Accounts',
          description: `Are you sure you want to disconnect ${selectedConnectedPlatforms?.length} selected account(s)? This will remove their authorization and stop all scheduled posts.`,
          icon: 'Unlink',
          confirmText: 'Disconnect',
          variant: 'destructive'
        };
      case 'refresh':
        return {
          title: 'Refresh Connections',
          description: `This will refresh the connection status and sync data for ${selectedPlatforms?.length} selected account(s).`,
          icon: 'RefreshCw',
          confirmText: 'Refresh',
          variant: 'default'
        };
      default:
        return {};
    }
  };

  if (selectedPlatforms?.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={selectedPlatforms?.length === platforms?.length}
              onChange={(e) => e?.target?.checked ? onSelectAll() : onDeselectAll()}
              label={`${selectedPlatforms?.length} selected`}
            />
            <div className="h-4 w-px bg-border" />
            <span className="text-sm text-muted-foreground">
              Bulk actions for selected accounts
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              onClick={() => handleBulkAction('refresh')}
              disabled={selectedPlatforms?.length === 0}
            >
              Refresh Selected
            </Button>
            <Button
              variant="destructive"
              size="sm"
              iconName="Unlink"
              onClick={() => handleBulkAction('disconnect')}
              disabled={selectedConnectedPlatforms?.length === 0}
            >
              Disconnect Selected
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onDeselectAll}
            />
          </div>
        </div>

        {/* Selection Summary */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-muted-foreground">
                {selectedConnectedPlatforms?.length} connected
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-muted-foreground rounded-full" />
              <span className="text-muted-foreground">
                {selectedPlatforms?.length - selectedConnectedPlatforms?.length} disconnected
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsConfirmOpen(false)} />
          
          <div className="relative w-full max-w-md mx-4 bg-card border border-border rounded-lg shadow-lg elevation-modal">
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  bulkAction === 'disconnect' ? 'bg-error/10' : 'bg-primary/10'
                }`}>
                  <Icon 
                    name={getActionDetails()?.icon} 
                    size={24} 
                    className={bulkAction === 'disconnect' ? 'text-error' : 'text-primary'}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {getActionDetails()?.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {getActionDetails()?.description}
                  </p>
                </div>
              </div>

              {/* Selected Platforms List */}
              <div className="mt-4 p-3 bg-muted/30 rounded-lg max-h-32 overflow-y-auto">
                <div className="space-y-1">
                  {selectedPlatforms?.slice(0, 5)?.map(platformId => {
                    const platform = platforms?.find(p => p?.id === platformId);
                    return (
                      <div key={platformId} className="flex items-center space-x-2 text-sm">
                        <Icon name="Dot" size={12} className="text-muted-foreground" />
                        <span className="text-foreground">{platform?.name}</span>
                      </div>
                    );
                  })}
                  {selectedPlatforms?.length > 5 && (
                    <div className="text-xs text-muted-foreground">
                      +{selectedPlatforms?.length - 5} more platforms
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsConfirmOpen(false)}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  variant={getActionDetails()?.variant}
                  onClick={executeBulkAction}
                  loading={isProcessing}
                  disabled={isProcessing}
                >
                  {getActionDetails()?.confirmText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActions;