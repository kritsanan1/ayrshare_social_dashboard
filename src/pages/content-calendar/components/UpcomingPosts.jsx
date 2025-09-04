import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingPosts = ({ posts, onPostClick, onQuickEdit }) => {
  const upcomingPosts = posts?.filter(post => new Date(post.scheduledDate) > new Date() && post?.status === 'scheduled')?.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))?.slice(0, 10);

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

  const getTimeUntilPost = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffMs = postDate - now;
    
    if (diffMs < 0) return 'Past due';
    
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return `${diffDays}d ${diffHours % 24}h`;
    } else if (diffHours > 0) {
      return `${diffHours}h`;
    } else {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes}m`;
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Upcoming Posts</h3>
          <span className="text-sm text-muted-foreground">
            {upcomingPosts?.length} scheduled
          </span>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto scrollbar-thin">
        {upcomingPosts?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Calendar" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground mb-2">No upcoming posts</p>
            <p className="text-sm text-muted-foreground">
              Schedule your first post to see it here
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {upcomingPosts?.map(post => (
              <div
                key={post?.id}
                className="p-4 hover:bg-muted/30 cursor-pointer transition-colors duration-200"
                onClick={() => onPostClick(post)}
              >
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={getPlatformIcon(post?.platform)} 
                    size={20} 
                    className={getPlatformColor(post?.platform)}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground capitalize">
                        {post?.platform}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-primary font-medium">
                          {getTimeUntilPost(post?.scheduledDate)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Edit"
                          onClick={(e) => {
                            e?.stopPropagation();
                            onQuickEdit(post);
                          }}
                          className="w-6 h-6"
                        />
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {post?.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatDateTime(post?.scheduledDate)}
                      </span>
                      
                      {post?.media && post?.media?.length > 0 && (
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Icon name="Image" size={12} />
                          <span>{post?.media?.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {upcomingPosts?.length > 0 && (
        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            iconName="Calendar"
            iconPosition="left"
          >
            View All Scheduled Posts
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpcomingPosts;