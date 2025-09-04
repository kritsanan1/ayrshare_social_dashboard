import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const FolderNavigation = ({
  currentFolder,
  onFolderChange,
  folders = []
}) => {
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // Default folders with mock data
  const defaultFolders = [
    { id: 'root', name: 'All Media', itemCount: 156, icon: 'Folder' },
    { id: 'campaigns', name: 'Campaigns', itemCount: 45, icon: 'FolderOpen' },
    { id: 'products', name: 'Products', itemCount: 32, icon: 'FolderOpen' },
    { id: 'team', name: 'Team Photos', itemCount: 28, icon: 'FolderOpen' },
    { id: 'unsplash', name: 'Unsplash Images', itemCount: 51, icon: 'FolderOpen' },
    ...folders
  ];

  const handleCreateFolder = () => {
    if (newFolderName?.trim()) {
      console.log('Creating folder:', newFolderName);
      setNewFolderName('');
      setShowCreateFolder(false);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Folders</h3>
        <button
          onClick={() => setShowCreateFolder(true)}
          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          title="Create New Folder"
        >
          <Icon name="Plus" size={16} />
        </button>
      </div>
      {/* Create Folder Form */}
      {showCreateFolder && (
        <div className="mb-4 space-y-2">
          <Input
            type="text"
            placeholder="Folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e?.target?.value)}
            onKeyPress={(e) => e?.key === 'Enter' && handleCreateFolder()}
            autoFocus
          />
          <div className="flex space-x-2">
            <button
              onClick={handleCreateFolder}
              className="px-3 py-1.5 bg-primary text-primary-foreground text-sm rounded hover:bg-primary/90 transition-colors"
            >
              Create
            </button>
            <button
              onClick={() => {
                setShowCreateFolder(false);
                setNewFolderName('');
              }}
              className="px-3 py-1.5 border border-border text-sm rounded hover:bg-muted/50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Folder List */}
      <div className="space-y-1">
        {defaultFolders?.map((folder) => (
          <button
            key={folder?.id}
            onClick={() => onFolderChange(folder?.id)}
            className={`w-full text-left px-3 py-2 rounded transition-colors flex items-center justify-between group ${
              currentFolder === folder?.id
                ? 'bg-primary/10 text-primary' :'text-foreground hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Icon 
                name={currentFolder === folder?.id ? 'FolderOpen' : 'Folder'} 
                size={16} 
                className={currentFolder === folder?.id ? 'text-primary' : 'text-muted-foreground'} 
              />
              <span className="text-sm font-medium">{folder?.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {folder?.itemCount}
            </span>
          </button>
        ))}
      </div>
      {/* Folder Actions */}
      <div className="mt-4 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-2">Quick Actions</h4>
        <div className="space-y-1">
          <button
            onClick={() => onFolderChange('recent')}
            className="w-full text-left px-3 py-2 text-sm rounded hover:bg-muted/50 transition-colors flex items-center space-x-2"
          >
            <Icon name="Clock" size={16} className="text-primary" />
            <span>Recent Uploads</span>
          </button>
          <button
            onClick={() => onFolderChange('favorites')}
            className="w-full text-left px-3 py-2 text-sm rounded hover:bg-muted/50 transition-colors flex items-center space-x-2"
          >
            <Icon name="Heart" size={16} className="text-primary" />
            <span>Favorites</span>
          </button>
          <button
            onClick={() => onFolderChange('unused')}
            className="w-full text-left px-3 py-2 text-sm rounded hover:bg-muted/50 transition-colors flex items-center space-x-2"
          >
            <Icon name="Archive" size={16} className="text-primary" />
            <span>Unused Media</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderNavigation;