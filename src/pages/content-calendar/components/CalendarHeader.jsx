import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CalendarHeader = ({ 
  currentDate, 
  viewMode, 
  onViewModeChange, 
  onDateChange, 
  onPrevMonth, 
  onNextMonth,
  platformFilter,
  onPlatformFilterChange,
  statusFilter,
  onStatusFilterChange,
  totalPosts
}) => {
  const viewModeOptions = [
    { value: 'month', label: 'Month View' },
    { value: 'week', label: 'Week View' },
    { value: 'day', label: 'Day View' }
  ];

  const platformOptions = [
    { value: 'all', label: 'All Platforms' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'tiktok', label: 'TikTok' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'published', label: 'Published' },
    { value: 'failed', label: 'Failed' },
    { value: 'draft', label: 'Draft' }
  ];

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  return (
    <div className="bg-card border-b border-border p-6">
      {/* Top Row - Navigation and View Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              onClick={onPrevMonth}
              className="w-9 h-9"
            />
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              onClick={onNextMonth}
              className="w-9 h-9"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-foreground">
              {formatDate(currentDate)}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToToday}
              className="text-primary hover:text-primary/80"
            >
              Today
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Select
            options={viewModeOptions}
            value={viewMode}
            onChange={onViewModeChange}
            className="w-32"
          />
          
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={() => console.log('Add post clicked')}
          >
            Add Post
          </Button>
        </div>
      </div>

      {/* Bottom Row - Filters and Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select
            options={platformOptions}
            value={platformFilter}
            onChange={onPlatformFilterChange}
            className="w-40"
          />
          
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={onStatusFilterChange}
            className="w-36"
          />

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={16} />
            <span>{totalPosts} posts scheduled</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Upload"
            iconPosition="left"
          >
            Bulk Schedule
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export Calendar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;