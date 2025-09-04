import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({
  selectedCount,
  onBulkAction,
  onClearSelection
}) => {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');

  const bulkActions = [
    { value: 'move', label: 'Move to Folder', icon: 'FolderInput' },
    { value: 'tag', label: 'Add Tags', icon: 'Tag' },
    { value: 'delete', label: 'Delete', icon: 'Trash2', destructive: true },
    { value: 'download', label: 'Download', icon: 'Download' },
    { value: 'favorite', label: 'Add to Favorites', icon: 'Heart' },
    { value: 'optimize', label: 'Optimize for Web', icon: 'Zap' }
  ];

  const folderOptions = [
    { value: 'campaigns', label: 'Campaigns' },
    { value: 'products', label: 'Products' },
    { value: 'team', label: 'Team Photos' },
    { value: 'archive', label: 'Archive' }
  ];

  const handleActionSelect = (actionValue) => {
    setSelectedAction(actionValue);
    
    if (actionValue === 'delete' || actionValue === 'download' || actionValue === 'favorite') {
      // Execute immediately for simple actions
      onBulkAction(actionValue);
      setSelectedAction('');
    }
  };

  const handleConfirmAction = () => {
    if (selectedAction) {
      onBulkAction(selectedAction);
      setSelectedAction('');
      setShowActionMenu(false);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-primary/20 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="CheckSquare" size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
              </p>
              <p className="text-xs text-muted-foreground">
                Choose an action to apply to selected media
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Bulk Action Dropdown */}
          <div className="relative">
            <Select
              value={selectedAction}
              onChange={handleActionSelect}
              options={bulkActions?.map(action => ({
                value: action?.value,
                label: action?.label
              }))}
              placeholder="Choose action..."
              className="min-w-[150px]"
            />
          </div>

          {/* Additional Options for Complex Actions */}
          {selectedAction === 'move' && (
            <div className="flex items-center space-x-2">
              <Select
                options={folderOptions}
                placeholder="Select folder..."
                onChange={(folder) => {
                  onBulkAction('move', { folder });
                  setSelectedAction('');
                }}
              />
            </div>
          )}

          {selectedAction === 'tag' && (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter tags..."
                className="px-3 py-1.5 border border-border rounded text-sm"
                onKeyPress={(e) => {
                  if (e?.key === 'Enter') {
                    const tags = e?.target?.value?.split(',')?.map(tag => tag?.trim())?.filter(Boolean);
                    onBulkAction('tag', { tags });
                    setSelectedAction('');
                    e.target.value = '';
                  }
                }}
              />
            </div>
          )}

          {/* Confirm Button for Complex Actions */}
          {(selectedAction === 'optimize') && (
            <Button
              size="sm"
              onClick={handleConfirmAction}
              iconName="Check"
              iconPosition="left"
            >
              Confirm
            </Button>
          )}

          {/* Clear Selection */}
          <button
            onClick={onClearSelection}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            title="Clear Selection"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground">Quick actions:</span>
        <button
          onClick={() => onBulkAction('download')}
          className="px-2 py-1 text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded transition-colors flex items-center space-x-1"
        >
          <Icon name="Download" size={12} />
          <span>Download</span>
        </button>
        <button
          onClick={() => onBulkAction('favorite')}
          className="px-2 py-1 text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded transition-colors flex items-center space-x-1"
        >
          <Icon name="Heart" size={12} />
          <span>Favorite</span>
        </button>
        <button
          onClick={() => onBulkAction('delete')}
          className="px-2 py-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded transition-colors flex items-center space-x-1"
        >
          <Icon name="Trash2" size={12} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default BulkActions;