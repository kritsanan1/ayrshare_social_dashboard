import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import PostCard from './PostCard';

const MobileCalendarView = ({ 
  posts, 
  currentDate, 
  onDateChange, 
  onPostClick, 
  onPostEdit, 
  onPostDelete, 
  onPostDuplicate 
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const daysInMonth = new Date(year, month + 1, 0)?.getDate();
    const days = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getPostsForDate = (date) => {
    const dateStr = date?.toDateString();
    return posts?.filter(post => 
      new Date(post.scheduledDate)?.toDateString() === dateStr
    );
  };

  const isToday = (date) => {
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const isSelected = (date) => {
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    onDateChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    onDateChange(newDate);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const days = getDaysInMonth(currentDate);
  const selectedDatePosts = getPostsForDate(selectedDate);

  return (
    <div className="bg-background min-h-screen">
      {/* Month Navigation */}
      <div className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronLeft"
            onClick={handlePrevMonth}
            className="w-9 h-9"
          />
          
          <h2 className="text-lg font-semibold text-foreground">
            {currentDate?.toLocaleDateString('en-US', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </h2>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronRight"
            onClick={handleNextMonth}
            className="w-9 h-9"
          />
        </div>

        {/* Mini Calendar */}
        <div className="grid grid-cols-7 gap-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S']?.map(day => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
          
          {days?.map(date => {
            const dayPosts = getPostsForDate(date);
            
            return (
              <button
                key={date?.toISOString()}
                onClick={() => handleDateSelect(date)}
                className={`relative p-2 text-sm rounded-lg transition-colors duration-200 ${
                  isSelected(date)
                    ? 'bg-primary text-primary-foreground'
                    : isToday(date)
                    ? 'bg-primary/20 text-primary font-semibold'
                    : dayPosts?.length > 0
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted/50'
                }`}
              >
                {date?.getDate()}
                {dayPosts?.length > 0 && (
                  <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center ${
                    isSelected(date) 
                      ? 'bg-primary-foreground text-primary' 
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    {dayPosts?.length > 9 ? '9+' : dayPosts?.length}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      {/* Selected Date Posts */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {selectedDate?.toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            <p className="text-sm text-muted-foreground">
              {selectedDatePosts?.length} post{selectedDatePosts?.length !== 1 ? 's' : ''} scheduled
            </p>
          </div>
          
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            onClick={() => console.log('Add post for', selectedDate)}
          >
            Add Post
          </Button>
        </div>

        {selectedDatePosts?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Calendar" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground mb-2">No posts scheduled</p>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first post for this date
            </p>
            <Button
              variant="outline"
              iconName="PenTool"
              iconPosition="left"
            >
              Create Post
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedDatePosts?.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))?.map(post => (
                <PostCard
                  key={post?.id}
                  post={post}
                  onEdit={onPostEdit}
                  onDelete={onPostDelete}
                  onDuplicate={onPostDuplicate}
                />
              ))}
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="fixed bottom-4 right-4 z-20">
        <Button
          variant="default"
          size="lg"
          iconName="Plus"
          onClick={() => console.log('Quick add post')}
          className="w-14 h-14 rounded-full shadow-lg"
        />
      </div>
    </div>
  );
};

export default MobileCalendarView;