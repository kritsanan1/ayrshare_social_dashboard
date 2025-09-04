import React, { useState, useEffect } from 'react';
import PrimarySidebar from '../../components/ui/PrimarySidebar';
import NavigationHeader from '../../components/ui/NavigationHeader';
import PlatformSelector from './components/PlatformSelector';
import ContentEditor from './components/ContentEditor';
import MediaUpload from './components/MediaUpload';
import UnsplashIntegration from './components/UnsplashIntegration';
import SchedulingPanel from './components/SchedulingPanel';
import HashtagGenerator from './components/HashtagGenerator';
import LinkShortener from './components/LinkShortener';
import PostActions from './components/PostActions';

const PostCreation = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('content');

  // Post creation state
  const [selectedPlatforms, setSelectedPlatforms] = useState(['facebook', 'twitter']);
  const [content, setContent] = useState('');
  const [media, setMedia] = useState([]);
  const [schedulingData, setSchedulingData] = useState({
    isScheduled: false,
    scheduledDate: '',
    scheduledTime: '',
    timezone: 'UTC',
    recurring: {
      frequency: 'none',
      interval: 1,
      endDate: '',
      daysOfWeek: []
    },
    autoDelete: {
      enabled: false,
      duration: 7,
      unit: 'days'
    }
  });

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePlatformToggle = (platformId, checked) => {
    setSelectedPlatforms(prev => 
      checked 
        ? [...prev, platformId]
        : prev?.filter(id => id !== platformId)
    );
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleMediaChange = (newMedia) => {
    setMedia(newMedia);
  };

  const handleMediaRemove = (mediaId) => {
    setMedia(prev => prev?.filter(item => item?.id !== mediaId));
  };

  const handleImageSelect = (imageData) => {
    setMedia(prev => [...prev, imageData]);
  };

  const handleSchedulingChange = (newSchedulingData) => {
    setSchedulingData(newSchedulingData);
  };

  const handleHashtagInsert = (hashtags) => {
    const newContent = content + (content?.endsWith(' ') || content === '' ? '' : ' ') + hashtags;
    setContent(newContent);
  };

  const handleLinkInsert = (link) => {
    const newContent = content + (content?.endsWith(' ') || content === '' ? '' : ' ') + link;
    setContent(newContent);
  };

  const handlePublish = (postData) => {
    console.log('Publishing post:', postData);
    // Handle successful publish
    alert('Post published successfully!');
    resetForm();
  };

  const handleSchedule = (postData) => {
    console.log('Scheduling post:', postData);
    // Handle successful schedule
    alert('Post scheduled successfully!');
    resetForm();
  };

  const handleSaveDraft = (draftData) => {
    console.log('Saving draft:', draftData);
    // Handle successful draft save
    alert('Draft saved successfully!');
  };

  const resetForm = () => {
    setContent('');
    setMedia([]);
    setSelectedPlatforms(['facebook', 'twitter']);
    setSchedulingData({
      isScheduled: false,
      scheduledDate: '',
      scheduledTime: '',
      timezone: 'UTC',
      recurring: {
        frequency: 'none',
        interval: 1,
        endDate: '',
        daysOfWeek: []
      },
      autoDelete: {
        enabled: false,
        duration: 7,
        unit: 'days'
      }
    });
  };

  const tabs = [
    { id: 'content', label: 'Content', icon: 'PenTool' },
    { id: 'media', label: 'Media', icon: 'Image' },
    { id: 'schedule', label: 'Schedule', icon: 'Calendar' },
    { id: 'tools', label: 'Tools', icon: 'Wrench' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PrimarySidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div className={`transition-all duration-300 ${
        isMobile ? 'ml-0' : sidebarCollapsed ? 'ml-16' : 'ml-60'
      }`}>
        <NavigationHeader />
        
        <main className="p-6 pb-20 md:pb-6">
          {isMobile ? (
            // Mobile Layout - Tabbed Interface
            (<div className="space-y-6">
              {/* Mobile Tab Navigation */}
              <div className="bg-card rounded-lg border border-border p-1">
                <div className="grid grid-cols-4 gap-1">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <div className="w-6 h-6 mb-1 flex items-center justify-center">
                        <div className={`w-4 h-4 ${activeTab === tab?.id ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                          {/* Icon placeholder - would use actual Icon component */}
                        </div>
                      </div>
                      <span className="text-xs font-medium">{tab?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Mobile Tab Content */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <PlatformSelector
                    selectedPlatforms={selectedPlatforms}
                    onPlatformToggle={handlePlatformToggle}
                  />
                  <ContentEditor
                    content={content}
                    onChange={handleContentChange}
                    selectedPlatforms={selectedPlatforms}
                  />
                  <PostActions
                    content={content}
                    selectedPlatforms={selectedPlatforms}
                    media={media}
                    schedulingData={schedulingData}
                    onPublish={handlePublish}
                    onSchedule={handleSchedule}
                    onSaveDraft={handleSaveDraft}
                  />
                </div>
              )}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  <MediaUpload
                    media={media}
                    onMediaChange={handleMediaChange}
                    onMediaRemove={handleMediaRemove}
                  />
                  <UnsplashIntegration
                    onImageSelect={handleImageSelect}
                  />
                </div>
              )}
              {activeTab === 'schedule' && (
                <SchedulingPanel
                  schedulingData={schedulingData}
                  onSchedulingChange={handleSchedulingChange}
                />
              )}
              {activeTab === 'tools' && (
                <div className="space-y-6">
                  <HashtagGenerator
                    content={content}
                    selectedPlatforms={selectedPlatforms}
                    onHashtagInsert={handleHashtagInsert}
                  />
                  <LinkShortener
                    onLinkInsert={handleLinkInsert}
                  />
                </div>
              )}
            </div>)
          ) : (
            // Desktop Layout - Split Panel
            (<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content Area - Left Panel */}
              <div className="lg:col-span-2 space-y-6">
                <PlatformSelector
                  selectedPlatforms={selectedPlatforms}
                  onPlatformToggle={handlePlatformToggle}
                />
                
                <ContentEditor
                  content={content}
                  onChange={handleContentChange}
                  selectedPlatforms={selectedPlatforms}
                />
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <MediaUpload
                    media={media}
                    onMediaChange={handleMediaChange}
                    onMediaRemove={handleMediaRemove}
                  />
                  <UnsplashIntegration
                    onImageSelect={handleImageSelect}
                  />
                </div>
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <HashtagGenerator
                    content={content}
                    selectedPlatforms={selectedPlatforms}
                    onHashtagInsert={handleHashtagInsert}
                  />
                  <LinkShortener
                    onLinkInsert={handleLinkInsert}
                  />
                </div>
              </div>
              {/* Secondary Panel - Right Sidebar */}
              <div className="space-y-6">
                <SchedulingPanel
                  schedulingData={schedulingData}
                  onSchedulingChange={handleSchedulingChange}
                />
                
                <PostActions
                  content={content}
                  selectedPlatforms={selectedPlatforms}
                  media={media}
                  schedulingData={schedulingData}
                  onPublish={handlePublish}
                  onSchedule={handleSchedule}
                  onSaveDraft={handleSaveDraft}
                />
              </div>
            </div>)
          )}
        </main>
      </div>
    </div>
  );
};

export default PostCreation;