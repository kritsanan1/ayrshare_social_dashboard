import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PostCard = ({ post, onEdit, onDelete, onDuplicate }) => {
  const getPlatformIcon = (platform) => {
    const icons = {
      facebook: 'Facebook',
      twitter: 'Twitter',
      instagram: 'Instagram',
      linkedin: 'Linkedin',
      youtube: 'Youtube',
      tiktok: 'Music'
    };
    return icons?.[platform] || 'Share2';
  };

  const getPlatformColor = (platform) => {
    const colors = {
      facebook: 'text-blue-500',
      twitter: 'text-sky-500',
      instagram: 'text-pink-500',
      linkedin: 'text-blue-600',
      youtube: 'text-red-500',
      tiktok: 'text-gray-800'
    };
    return colors?.[platform] || 'text-muted-foreground';
  };

  const getStatusBadge = (status) => {
    const badges = {
      scheduled: { color: 'bg-primary text-primary-foreground', label: 'Scheduled' },
      published: { color: 'bg-success text-success-foreground', label: 'Published' },
      failed: { color: 'bg-error text-error-foreground', label: 'Failed' },
      draft: { color: 'bg-muted text-muted-foreground', label: 'Draft' }
    };
    
    const badge = badges?.[status] || badges?.draft;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badge?.color}`}>
        {badge?.label}
      </span>
    );
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      }),
      time: date?.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  const { date, time } = formatDateTime(post?.scheduledDate);

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon 
            name={getPlatformIcon(post?.platform)} 
            size={20} 
            className={getPlatformColor(post?.platform)}
          />
          <span className="text-sm font-medium text-foreground capitalize">
            {post?.platform}
          </span>
          {post?.isRssFeed && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-orange-100 text-orange-800">
              RSS
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {getStatusBadge(post?.status)}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              iconName="Edit"
              onClick={() => onEdit(post)}
              className="w-8 h-8"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Copy"
              onClick={() => onDuplicate(post)}
              className="w-8 h-8"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Trash2"
              onClick={() => onDelete(post)}
              className="w-8 h-8 text-error hover:text-error"
            />
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="mb-3">
        <p className="text-sm text-foreground line-clamp-3">
          {post?.content}
        </p>
        
        {post?.hashtags && post?.hashtags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {post?.hashtags?.slice(0, 3)?.map((tag, index) => (
              <span key={index} className="text-xs text-primary">
                #{tag}
              </span>
            ))}
            {post?.hashtags?.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{post?.hashtags?.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
      {/* Media Preview */}
      {post?.media && post?.media?.length > 0 && (
        <div className="mb-3">
          <div className="flex space-x-2 overflow-x-auto">
            {post?.media?.slice(0, 3)?.map((media, index) => (
              <div key={index} className="flex-shrink-0">
                {media?.type === 'image' ? (
                  <Image
                    src={media?.url}
                    alt="Post media"
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                    <Icon name="Play" size={16} className="text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            {post?.media?.length > 3 && (
              <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                <span className="text-xs text-muted-foreground">
                  +{post?.media?.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} />
            <span>{date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{time}</span>
          </div>
        </div>
        
        {post?.status === 'failed' && (
          <div className="flex items-center space-x-1 text-error">
            <Icon name="AlertCircle" size={14} />
            <span>Failed to publish</span>
          </div>
        )}
        
        {post?.analytics && (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={14} />
              <span>{post?.analytics?.likes || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Share" size={14} />
              <span>{post?.analytics?.shares || 0}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;