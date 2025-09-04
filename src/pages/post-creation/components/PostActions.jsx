import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PostActions = ({ 
  content, 
  selectedPlatforms, 
  media, 
  schedulingData, 
  onPublish, 
  onSchedule, 
  onSaveDraft 
}) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const canPublish = () => {
    return content?.trim()?.length > 0 && selectedPlatforms?.length > 0;
  };

  const canSchedule = () => {
    return canPublish() && schedulingData?.isScheduled && schedulingData?.scheduledDate && schedulingData?.scheduledTime;
  };

  const handlePublishNow = async () => {
    if (!canPublish()) return;
    
    setIsPublishing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const postData = {
        content,
        platforms: selectedPlatforms,
        media,
        publishedAt: new Date()?.toISOString(),
        status: 'published'
      };
      
      onPublish(postData);
    } catch (error) {
      console.error('Publishing failed:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSchedulePost = async () => {
    if (!canSchedule()) return;
    
    setIsScheduling(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const scheduledDateTime = new Date(`${schedulingData.scheduledDate}T${schedulingData.scheduledTime}`);
      
      const postData = {
        content,
        platforms: selectedPlatforms,
        media,
        scheduledFor: scheduledDateTime?.toISOString(),
        timezone: schedulingData?.timezone,
        recurring: schedulingData?.recurring,
        autoDelete: schedulingData?.autoDelete,
        status: 'scheduled'
      };
      
      onSchedule(postData);
    } catch (error) {
      console.error('Scheduling failed:', error);
    } finally {
      setIsScheduling(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const draftData = {
        content,
        platforms: selectedPlatforms,
        media,
        schedulingData,
        savedAt: new Date()?.toISOString(),
        status: 'draft'
      };
      
      onSaveDraft(draftData);
    } catch (error) {
      console.error('Saving draft failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const getPublishButtonText = () => {
    if (isPublishing) return 'Publishing...';
    if (selectedPlatforms?.length === 1) return `Publish to ${selectedPlatforms?.[0]}`;
    return `Publish to ${selectedPlatforms?.length} platforms`;
  };

  const getScheduleButtonText = () => {
    if (isScheduling) return 'Scheduling...';
    return 'Schedule Post';
  };

  const formatScheduleTime = () => {
    if (!schedulingData?.scheduledDate || !schedulingData?.scheduledTime) return '';
    
    const date = new Date(`${schedulingData.scheduledDate}T${schedulingData.scheduledTime}`);
    return date?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Publish Options</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Send" size={16} className="text-primary" />
          <span className="text-sm text-muted-foreground">Ready to share</span>
        </div>
      </div>
      {/* Post Summary */}
      <div className="mb-6 p-4 bg-muted/50 rounded-lg">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Content length:</span>
            <span className="text-sm font-medium text-foreground">
              {content?.length} characters
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Platforms:</span>
            <span className="text-sm font-medium text-foreground">
              {selectedPlatforms?.length} selected
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Media files:</span>
            <span className="text-sm font-medium text-foreground">
              {media?.length} attached
            </span>
          </div>
          
          {schedulingData?.isScheduled && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Scheduled for:</span>
              <span className="text-sm font-medium text-foreground">
                {formatScheduleTime()}
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Publish Now */}
        <Button
          onClick={handlePublishNow}
          disabled={!canPublish() || isPublishing || isScheduling}
          loading={isPublishing}
          variant="default"
          size="lg"
          iconName="Send"
          iconPosition="left"
          fullWidth
        >
          {getPublishButtonText()}
        </Button>

        {/* Schedule Post */}
        {schedulingData?.isScheduled && (
          <Button
            onClick={handleSchedulePost}
            disabled={!canSchedule() || isScheduling || isPublishing}
            loading={isScheduling}
            variant="outline"
            size="lg"
            iconName="Calendar"
            iconPosition="left"
            fullWidth
          >
            {getScheduleButtonText()}
          </Button>
        )}

        {/* Save Draft */}
        <Button
          onClick={handleSaveDraft}
          disabled={content?.trim()?.length === 0 || isSaving}
          loading={isSaving}
          variant="ghost"
          size="lg"
          iconName="Save"
          iconPosition="left"
          fullWidth
        >
          {isSaving ? 'Saving...' : 'Save as Draft'}
        </Button>
      </div>
      {/* Validation Messages */}
      {!canPublish() && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">Cannot publish yet</p>
              <ul className="text-xs text-warning/80 mt-1 space-y-1">
                {content?.trim()?.length === 0 && <li>• Add some content to your post</li>}
                {selectedPlatforms?.length === 0 && <li>• Select at least one platform</li>}
              </ul>
            </div>
          </div>
        </div>
      )}
      {schedulingData?.isScheduled && !canSchedule() && canPublish() && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Clock" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">Scheduling incomplete</p>
              <ul className="text-xs text-warning/80 mt-1 space-y-1">
                {!schedulingData?.scheduledDate && <li>• Select a date for scheduling</li>}
                {!schedulingData?.scheduledTime && <li>• Select a time for scheduling</li>}
              </ul>
            </div>
          </div>
        </div>
      )}
      {/* Success States */}
      {canPublish() && !schedulingData?.isScheduled && (
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <p className="text-sm text-success font-medium">Ready to publish immediately</p>
          </div>
        </div>
      )}
      {canSchedule() && (
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-success" />
            <p className="text-sm text-success font-medium">Ready to schedule</p>
          </div>
        </div>
      )}
      {/* Additional Options */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Need help?</span>
          <div className="flex items-center space-x-4">
            <button className="text-primary hover:text-primary/80 font-medium">
              Preview Post
            </button>
            <button className="text-primary hover:text-primary/80 font-medium">
              Publishing Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostActions;