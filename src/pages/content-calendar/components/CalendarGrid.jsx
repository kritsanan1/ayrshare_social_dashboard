import React from 'react';
import Icon from '../../../components/AppIcon';

const CalendarGrid = ({ 
  currentDate, 
  posts, 
  onPostClick, 
  onDateClick,
  onPostDrop,
  viewMode 
}) => {
  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getPostsForDate = (date) => {
    if (!date) return [];
    const dateStr = date?.toDateString();
    return posts?.filter(post => 
      new Date(post.scheduledDate)?.toDateString() === dateStr
    );
  };

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-success text-success-foreground';
      case 'scheduled':
        return 'bg-primary text-primary-foreground';
      case 'failed':
        return 'bg-error text-error-foreground';
      case 'draft':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const handleDragStart = (e, post) => {
    e?.dataTransfer?.setData('text/plain', JSON.stringify(post));
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
  };

  const handleDrop = (e, date) => {
    e?.preventDefault();
    const postData = JSON.parse(e?.dataTransfer?.getData('text/plain'));
    onPostDrop(postData, date);
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (viewMode === 'month') {
    return (
      <div className="bg-background">
        {/* Week day headers */}
        <div className="grid grid-cols-7 border-b border-border">
          {weekDays?.map(day => (
            <div key={day} className="p-4 text-center text-sm font-medium text-muted-foreground bg-muted/30">
              {day}
            </div>
          ))}
        </div>
        {/* Calendar grid */}
        <div className="grid grid-cols-7 auto-rows-fr min-h-[600px]">
          {days?.map((date, index) => {
            const dayPosts = getPostsForDate(date);
            
            return (
              <div
                key={index}
                className={`border-r border-b border-border p-2 min-h-[120px] ${
                  date ? 'bg-background hover:bg-muted/20 cursor-pointer' : 'bg-muted/10'
                }`}
                onClick={() => date && onDateClick(date)}
                onDragOver={handleDragOver}
                onDrop={(e) => date && handleDrop(e, date)}
              >
                {date && (
                  <>
                    <div className={`text-sm font-medium mb-2 ${
                      isToday(date) 
                        ? 'text-primary font-semibold' :'text-foreground'
                    }`}>
                      {date?.getDate()}
                      {isToday(date) && (
                        <span className="ml-1 w-2 h-2 bg-primary rounded-full inline-block" />
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      {dayPosts?.slice(0, 3)?.map(post => (
                        <div
                          key={post?.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, post)}
                          onClick={(e) => {
                            e?.stopPropagation();
                            onPostClick(post);
                          }}
                          className={`text-xs p-1.5 rounded cursor-pointer hover:opacity-80 ${getStatusColor(post?.status)}`}
                        >
                          <div className="flex items-center space-x-1 mb-1">
                            <Icon 
                              name={getPlatformIcon(post?.platform)} 
                              size={12} 
                            />
                            <span className="truncate flex-1">
                              {new Date(post.scheduledDate)?.toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </span>
                          </div>
                          <div className="truncate">
                            {post?.content?.substring(0, 30)}...
                          </div>
                        </div>
                      ))}
                      
                      {dayPosts?.length > 3 && (
                        <div className="text-xs text-muted-foreground text-center py-1">
                          +{dayPosts?.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Week and Day views would be implemented similarly
  return (
    <div className="p-8 text-center text-muted-foreground">
      <Icon name="Calendar" size={48} className="mx-auto mb-4 opacity-50" />
      <p>Week and Day views coming soon</p>
    </div>
  );
};

export default CalendarGrid;