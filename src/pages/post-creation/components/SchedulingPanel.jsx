import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SchedulingPanel = ({ schedulingData, onSchedulingChange }) => {
  const [activeTab, setActiveTab] = useState('schedule');

  const timezoneOptions = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
    { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' },
    { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' }
  ];

  const recurringOptions = [
    { value: 'none', label: 'No repeat' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'custom', label: 'Custom schedule' }
  ];

  const bestTimeSlots = [
    { time: '09:00', label: '9:00 AM', engagement: 'High', platforms: ['LinkedIn', 'Twitter'] },
    { time: '12:00', label: '12:00 PM', engagement: 'Medium', platforms: ['Facebook', 'Instagram'] },
    { time: '15:00', label: '3:00 PM', engagement: 'High', platforms: ['Twitter', 'LinkedIn'] },
    { time: '18:00', label: '6:00 PM', engagement: 'Very High', platforms: ['Facebook', 'Instagram'] },
    { time: '20:00', label: '8:00 PM', engagement: 'High', platforms: ['Instagram', 'TikTok'] }
  ];

  const handleDateTimeChange = (field, value) => {
    onSchedulingChange({
      ...schedulingData,
      [field]: value
    });
  };

  const handleRecurringChange = (field, value) => {
    onSchedulingChange({
      ...schedulingData,
      recurring: {
        ...schedulingData?.recurring,
        [field]: value
      }
    });
  };

  const selectBestTime = (time) => {
    const today = new Date();
    const [hours, minutes] = time?.split(':');
    const scheduledTime = new Date(today);
    scheduledTime?.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    // If the time has passed today, schedule for tomorrow
    if (scheduledTime <= today) {
      scheduledTime?.setDate(scheduledTime?.getDate() + 1);
    }

    handleDateTimeChange('scheduledDate', scheduledTime?.toISOString()?.split('T')?.[0]);
    handleDateTimeChange('scheduledTime', time);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now?.toISOString()?.split('T')?.[0];
    const time = now?.toTimeString()?.slice(0, 5);
    return { date, time };
  };

  const { date: currentDate, time: currentTime } = getCurrentDateTime();

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Panel Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Post Scheduling</h3>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'schedule' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Schedule
          </button>
          <button
            onClick={() => setActiveTab('recurring')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'recurring' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Recurring
          </button>
        </div>
      </div>
      <div className="p-4">
        {activeTab === 'schedule' ? (
          <div className="space-y-6">
            {/* Immediate vs Scheduled */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={!schedulingData?.isScheduled}
                  onChange={(e) => handleDateTimeChange('isScheduled', !e?.target?.checked)}
                  label="Publish immediately"
                />
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={schedulingData?.isScheduled}
                  onChange={(e) => handleDateTimeChange('isScheduled', e?.target?.checked)}
                  label="Schedule for later"
                />
              </div>
            </div>

            {/* Scheduling Options */}
            {schedulingData?.isScheduled && (
              <div className="space-y-4">
                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Schedule Date"
                    type="date"
                    value={schedulingData?.scheduledDate || currentDate}
                    onChange={(e) => handleDateTimeChange('scheduledDate', e?.target?.value)}
                    min={currentDate}
                  />
                  <Input
                    label="Schedule Time"
                    type="time"
                    value={schedulingData?.scheduledTime || currentTime}
                    onChange={(e) => handleDateTimeChange('scheduledTime', e?.target?.value)}
                  />
                </div>

                {/* Timezone */}
                <Select
                  label="Timezone"
                  options={timezoneOptions}
                  value={schedulingData?.timezone || 'UTC'}
                  onChange={(value) => handleDateTimeChange('timezone', value)}
                  searchable
                />

                {/* Best Times Suggestions */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">
                    Suggested optimal times
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {bestTimeSlots?.map((slot) => (
                      <button
                        key={slot?.time}
                        onClick={() => selectBestTime(slot?.time)}
                        className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-left">
                            <p className="text-sm font-medium text-foreground">
                              {slot?.label}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {slot?.platforms?.join(', ')} • {slot?.engagement} engagement
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            slot?.engagement === 'Very High' ? 'bg-success/10 text-success' :
                            slot?.engagement === 'High'? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                          }`}>
                            {slot?.engagement}
                          </span>
                          <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Recurring Options */}
            <div className="space-y-4">
              <Select
                label="Repeat frequency"
                options={recurringOptions}
                value={schedulingData?.recurring?.frequency || 'none'}
                onChange={(value) => handleRecurringChange('frequency', value)}
              />

              {schedulingData?.recurring?.frequency !== 'none' && schedulingData?.recurring?.frequency && (
                <div className="space-y-4">
                  {/* Interval */}
                  <Input
                    label={`Repeat every (${schedulingData?.recurring?.frequency === 'daily' ? 'days' : 
                             schedulingData?.recurring?.frequency === 'weekly' ? 'weeks' : 'months'})`}
                    type="number"
                    min="1"
                    max="30"
                    value={schedulingData?.recurring?.interval || 1}
                    onChange={(e) => handleRecurringChange('interval', parseInt(e?.target?.value))}
                  />

                  {/* End Date */}
                  <Input
                    label="End date (optional)"
                    type="date"
                    value={schedulingData?.recurring?.endDate || ''}
                    onChange={(e) => handleRecurringChange('endDate', e?.target?.value)}
                    min={currentDate}
                  />

                  {/* Days of Week (for weekly) */}
                  {schedulingData?.recurring?.frequency === 'weekly' && (
                    <div>
                      <label className="text-sm font-medium text-foreground mb-3 block">
                        Days of the week
                      </label>
                      <div className="grid grid-cols-7 gap-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map((day, index) => (
                          <button
                            key={day}
                            onClick={() => {
                              const days = schedulingData?.recurring?.daysOfWeek || [];
                              const newDays = days?.includes(index)
                                ? days?.filter(d => d !== index)
                                : [...days, index];
                              handleRecurringChange('daysOfWeek', newDays);
                            }}
                            className={`p-2 text-xs font-medium rounded transition-colors ${
                              (schedulingData?.recurring?.daysOfWeek || [])?.includes(index)
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Recurring Preview */}
            {schedulingData?.recurring?.frequency !== 'none' && schedulingData?.recurring?.frequency && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="Calendar" size={16} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-foreground font-medium">Recurring Schedule Preview</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      This post will be published {schedulingData?.recurring?.frequency} 
                      {schedulingData?.recurring?.interval > 1 ? ` every ${schedulingData?.recurring?.interval} ${schedulingData?.recurring?.frequency === 'daily' ? 'days' : schedulingData?.recurring?.frequency === 'weekly' ? 'weeks' : 'months'}` : ''}
                      {schedulingData?.recurring?.endDate ? ` until ${new Date(schedulingData.recurring.endDate)?.toLocaleDateString()}` : ' indefinitely'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Auto-Delete Option */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Auto-delete post</p>
              <p className="text-xs text-muted-foreground">Automatically delete this post after a specified time</p>
            </div>
            <Checkbox
              checked={schedulingData?.autoDelete?.enabled || false}
              onChange={(e) => handleDateTimeChange('autoDelete', {
                ...schedulingData?.autoDelete,
                enabled: e?.target?.checked
              })}
            />
          </div>

          {schedulingData?.autoDelete?.enabled && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Input
                label="Delete after"
                type="number"
                min="1"
                value={schedulingData?.autoDelete?.duration || 7}
                onChange={(e) => handleDateTimeChange('autoDelete', {
                  ...schedulingData?.autoDelete,
                  duration: parseInt(e?.target?.value)
                })}
              />
              <Select
                label="Time unit"
                options={[
                  { value: 'hours', label: 'Hours' },
                  { value: 'days', label: 'Days' },
                  { value: 'weeks', label: 'Weeks' },
                  { value: 'months', label: 'Months' }
                ]}
                value={schedulingData?.autoDelete?.unit || 'days'}
                onChange={(value) => handleDateTimeChange('autoDelete', {
                  ...schedulingData?.autoDelete,
                  unit: value
                })}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulingPanel;