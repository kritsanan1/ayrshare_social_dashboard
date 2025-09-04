import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { Checkbox } from '../../../components/ui/Checkbox';

const MediaGrid = ({
  media = [],
  loading = false,
  viewMode = 'grid',
  selectedMedia = [],
  onMediaSelect,
  onBulkSelect,
  onMediaView,
  onMediaDelete,
  onMediaTag,
  onMediaMove
}) => {
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'image':
        return 'Image';
      case 'video':
        return 'Video';
      case 'document':
        return 'File';
      default:
        return 'File';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'facebook':
        return '📘';
      case 'twitter':
        return '🐦';
      case 'instagram':
        return '📸';
      case 'linkedin':
        return '💼';
      case 'youtube':
        return '📺';
      default:
        return '📱';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="text-primary animate-spin mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Loading media library...</p>
        </div>
      </div>
    );
  }

  if (media?.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Image" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No media files found</h3>
        <p className="text-muted-foreground mb-4">
          Upload your first media files or import from Unsplash to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Bulk Select Header */}
      <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={selectedMedia?.length === media?.length}
            indeterminate={selectedMedia?.length > 0 && selectedMedia?.length < media?.length}
            onChange={(checked) => onBulkSelect(checked)}
          />
          <span className="text-sm text-muted-foreground">
            {selectedMedia?.length > 0 ? `${selectedMedia?.length} selected` : `${media?.length} items`}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onBulkSelect(true)}
            className="text-xs text-primary hover:text-primary/80"
          >
            Select All
          </button>
          {selectedMedia?.length > 0 && (
            <button
              onClick={() => onBulkSelect(false)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear Selection
            </button>
          )}
        </div>
      </div>
      {/* Media Grid/List */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {media?.map((item) => (
            <div
              key={item?.id}
              className={`group relative bg-card rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-all duration-200 ${
                selectedMedia?.includes(item?.id) ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
              }`}
            >
              {/* Media Preview */}
              <div className="aspect-square relative bg-muted">
                {item?.type === 'image' ? (
                  <Image
                    src={item?.thumbnail}
                    alt={item?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name={getFileIcon(item?.type)} size={32} className="text-muted-foreground" />
                  </div>
                )}

                {/* Selection Checkbox */}
                <div className="absolute top-2 left-2">
                  <div className="p-1 bg-background/80 rounded">
                    <Checkbox
                      checked={selectedMedia?.includes(item?.id)}
                      onChange={(checked) => onMediaSelect(item?.id, checked)}
                      onClick={(e) => e?.stopPropagation()}
                    />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e?.stopPropagation();
                        onMediaView(item?.id);
                      }}
                      className="p-1.5 bg-background/80 hover:bg-background rounded text-foreground"
                    >
                      <Icon name="Eye" size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e?.stopPropagation();
                        onMediaDelete(item?.id);
                      }}
                      className="p-1.5 bg-background/80 hover:bg-background rounded text-destructive"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </div>

                {/* Usage Indicator */}
                {item?.usageCount > 0 && (
                  <div className="absolute bottom-2 left-2">
                    <div className="px-2 py-1 bg-background/80 rounded text-xs text-foreground">
                      {item?.usageCount} uses
                    </div>
                  </div>
                )}

                {/* File Type Badge */}
                <div className="absolute bottom-2 right-2">
                  <div className="px-2 py-1 bg-background/80 rounded text-xs text-muted-foreground uppercase">
                    {item?.type}
                  </div>
                </div>
              </div>

              {/* Media Info */}
              <div className="p-3">
                <h4 className="text-sm font-medium text-foreground truncate mb-1">
                  {item?.name}
                </h4>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatFileSize(item?.size)}</span>
                  <span>{formatDate(item?.uploadDate)}</span>
                </div>
                
                {/* Platform Usage */}
                {item?.platforms?.length > 0 && (
                  <div className="flex items-center space-x-1 mt-2">
                    {item?.platforms?.slice(0, 3)?.map((platform) => (
                      <span key={platform} className="text-xs">
                        {getPlatformIcon(platform)}
                      </span>
                    ))}
                    {item?.platforms?.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{item?.platforms?.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {viewMode === 'list' && (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-muted text-sm font-medium text-muted-foreground border-b border-border">
            <div className="col-span-1"></div>
            <div className="col-span-4">Name</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Size</div>
            <div className="col-span-2">Upload Date</div>
            <div className="col-span-1">Actions</div>
          </div>
          
          {media?.map((item) => (
            <div
              key={item?.id}
              className={`grid grid-cols-12 gap-4 p-4 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors ${
                selectedMedia?.includes(item?.id) ? 'bg-primary/5' : ''
              }`}
            >
              <div className="col-span-1 flex items-center">
                <Checkbox
                  checked={selectedMedia?.includes(item?.id)}
                  onChange={(checked) => onMediaSelect(item?.id, checked)}
                />
              </div>
              
              <div className="col-span-4 flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded overflow-hidden flex-shrink-0">
                  {item?.type === 'image' ? (
                    <Image
                      src={item?.thumbnail}
                      alt={item?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name={getFileIcon(item?.type)} size={16} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item?.usageCount} uses across {item?.platforms?.length || 0} platforms
                  </p>
                </div>
              </div>
              
              <div className="col-span-2 flex items-center">
                <span className="text-sm text-foreground capitalize">{item?.type}</span>
              </div>
              
              <div className="col-span-2 flex items-center">
                <span className="text-sm text-foreground">{formatFileSize(item?.size)}</span>
              </div>
              
              <div className="col-span-2 flex items-center">
                <span className="text-sm text-foreground">{formatDate(item?.uploadDate)}</span>
              </div>
              
              <div className="col-span-1 flex items-center space-x-1">
                <button
                  onClick={() => onMediaView(item?.id)}
                  className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                >
                  <Icon name="Eye" size={16} />
                </button>
                <button
                  onClick={() => onMediaDelete(item?.id)}
                  className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-destructive"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {viewMode === 'detailed' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {media?.map((item) => (
            <div
              key={item?.id}
              className={`bg-card rounded-lg border border-border p-6 hover:border-primary/50 transition-all duration-200 ${
                selectedMedia?.includes(item?.id) ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                {/* Media Preview */}
                <div className="w-20 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
                  {item?.type === 'image' ? (
                    <Image
                      src={item?.thumbnail}
                      alt={item?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name={getFileIcon(item?.type)} size={24} className="text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Media Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold text-foreground truncate pr-2">
                      {item?.name}
                    </h4>
                    <Checkbox
                      checked={selectedMedia?.includes(item?.id)}
                      onChange={(checked) => onMediaSelect(item?.id, checked)}
                    />
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Type:</span>
                      <span className="text-foreground capitalize">{item?.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Size:</span>
                      <span className="text-foreground">{formatFileSize(item?.size)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Uploaded:</span>
                      <span className="text-foreground">{formatDate(item?.uploadDate)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Usage:</span>
                      <span className="text-foreground">{item?.usageCount} times</span>
                    </div>
                    {item?.dimensions && (
                      <div className="flex items-center justify-between">
                        <span>Dimensions:</span>
                        <span className="text-foreground">
                          {item?.dimensions?.width} × {item?.dimensions?.height}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {item?.tags?.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-1">Tags:</p>
                      <div className="flex flex-wrap gap-1">
                        {item?.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Platform Usage */}
                  {item?.platforms?.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-1">Used on:</p>
                      <div className="flex items-center space-x-2">
                        {item?.platforms?.map((platform) => (
                          <span key={platform} className="text-sm">
                            {getPlatformIcon(platform)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center space-x-2 mt-4">
                    <button
                      onClick={() => onMediaView(item?.id)}
                      className="px-3 py-1.5 bg-primary text-primary-foreground text-xs rounded hover:bg-primary/90 transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onMediaDelete(item?.id)}
                      className="px-3 py-1.5 border border-border text-xs rounded hover:bg-muted/50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaGrid;