import React, { useState, useEffect } from 'react';
import PrimarySidebar from '../../components/ui/PrimarySidebar';
import NavigationHeader from '../../components/ui/NavigationHeader';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import UpcomingPosts from './components/UpcomingPosts';
import PublishingStats from './components/PublishingStats';
import MobileCalendarView from './components/MobileCalendarView';

const ContentCalendar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for scheduled posts
  const [posts] = useState([
    {
      id: 1,
      platform: 'facebook',
      content: `Exciting news! We're launching our new product line next week. Stay tuned for amazing features that will revolutionize your workflow. \n\nWhat are you most excited about? Let us know in the comments! 🚀`,
      scheduledDate: new Date(2025, 8, 5, 10, 30)?.toISOString(),
      status: 'scheduled',
      hashtags: ['launch', 'product', 'innovation', 'workflow'],
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400' }
      ],
      isRssFeed: false,
      analytics: { likes: 0, shares: 0, comments: 0 }
    },
    {
      id: 2,
      platform: 'twitter',
      content: `Just shipped a major update! 🎉\n\n✅ Improved performance\n✅ New dashboard design\n✅ Better mobile experience\n\nCheck it out and let us know what you think!`,
      scheduledDate: new Date(2025, 8, 5, 14, 15)?.toISOString(),
      status: 'scheduled',
      hashtags: ['update', 'performance', 'mobile', 'dashboard'],
      media: [],
      isRssFeed: false,
      analytics: { likes: 0, shares: 0, comments: 0 }
    },
    {
      id: 3,
      platform: 'instagram',
      content: `Behind the scenes at our office! Our amazing team working hard to bring you the best experience possible. \n\n#TeamWork #Innovation #BehindTheScenes`,
      scheduledDate: new Date(2025, 8, 6, 9, 0)?.toISOString(),
      status: 'scheduled',
      hashtags: ['teamwork', 'innovation', 'behindthescenes', 'office'],
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400' }
      ],
      isRssFeed: false,
      analytics: { likes: 0, shares: 0, comments: 0 }
    },
    {
      id: 4,
      platform: 'linkedin',
      content: `Thrilled to announce our partnership with leading industry experts! This collaboration will bring innovative solutions to businesses worldwide.\n\nRead more about how this partnership will benefit our customers and drive industry growth.`,
      scheduledDate: new Date(2025, 8, 7, 11, 45)?.toISOString(),
      status: 'scheduled',
      hashtags: ['partnership', 'innovation', 'business', 'growth'],
      media: [],
      isRssFeed: false,
      analytics: { likes: 0, shares: 0, comments: 0 }
    },
    {
      id: 5,
      platform: 'youtube',
      content: `New tutorial video is live! Learn how to maximize your productivity with our latest features. \n\nDon't forget to subscribe and hit the notification bell for more helpful content!`,
      scheduledDate: new Date(2025, 8, 8, 16, 0)?.toISOString(),
      status: 'scheduled',
      hashtags: ['tutorial', 'productivity', 'features', 'subscribe'],
      media: [
        { type: 'video', url: 'https://example.com/video-thumbnail.jpg' }
      ],
      isRssFeed: false,
      analytics: { likes: 0, shares: 0, comments: 0 }
    },
    {
      id: 6,
      platform: 'facebook',
      content: `Customer Success Story: How ABC Company increased their efficiency by 300% using our platform. \n\nRead the full case study on our blog and discover how you can achieve similar results!`,
      scheduledDate: new Date(2025, 8, 4, 13, 30)?.toISOString(),
      status: 'published',
      hashtags: ['success', 'casestudy', 'efficiency', 'results'],
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400' }
      ],
      isRssFeed: false,
      analytics: { likes: 45, shares: 12, comments: 8 }
    },
    {
      id: 7,
      platform: 'twitter',
      content: `Weekly industry insights: The future of automation in business processes. What trends are you seeing in your industry?`,
      scheduledDate: new Date(2025, 8, 3, 15, 0)?.toISOString(),
      status: 'failed',
      hashtags: ['insights', 'automation', 'business', 'trends'],
      media: [],
      isRssFeed: true,
      analytics: { likes: 0, shares: 0, comments: 0 }
    },
    {
      id: 8,
      platform: 'instagram',
      content: `Motivational Monday! Remember that every expert was once a beginner. Keep learning, keep growing! 💪\n\n#MotivationalMonday #Growth #Learning`,
      scheduledDate: new Date(2025, 8, 9, 8, 0)?.toISOString(),
      status: 'scheduled',
      hashtags: ['motivational', 'growth', 'learning', 'monday'],
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400' }
      ],
      isRssFeed: false,
      analytics: { likes: 0, shares: 0, comments: 0 }
    }
  ]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handlePostClick = (post) => {
    console.log('Post clicked:', post);
  };

  const handleDateClick = (date) => {
    console.log('Date clicked:', date);
  };

  const handlePostDrop = (post, newDate) => {
    console.log('Post dropped:', post, 'to date:', newDate);
  };

  const handlePostEdit = (post) => {
    console.log('Edit post:', post);
  };

  const handlePostDelete = (post) => {
    console.log('Delete post:', post);
  };

  const handlePostDuplicate = (post) => {
    console.log('Duplicate post:', post);
  };

  const handleQuickEdit = (post) => {
    console.log('Quick edit post:', post);
  };

  // Filter posts based on current filters
  const filteredPosts = posts?.filter(post => {
    const platformMatch = platformFilter === 'all' || post?.platform === platformFilter;
    const statusMatch = statusFilter === 'all' || post?.status === statusFilter;
    return platformMatch && statusMatch;
  });

  if (isMobile) {
    return (
      <MobileCalendarView
        posts={filteredPosts}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        onPostClick={handlePostClick}
        onPostEdit={handlePostEdit}
        onPostDelete={handlePostDelete}
        onPostDuplicate={handlePostDuplicate}
      />
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <PrimarySidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={handleToggleSidebar}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-60'
      }`}>
        <NavigationHeader />
        
        <div className="flex-1 overflow-hidden">
          <CalendarHeader
            currentDate={currentDate}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onDateChange={setCurrentDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            platformFilter={platformFilter}
            onPlatformFilterChange={setPlatformFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            totalPosts={filteredPosts?.length}
          />
          
          <div className="flex h-full">
            {/* Main Calendar Area */}
            <div className="flex-1 overflow-auto">
              <CalendarGrid
                currentDate={currentDate}
                posts={filteredPosts}
                onPostClick={handlePostClick}
                onDateClick={handleDateClick}
                onPostDrop={handlePostDrop}
                viewMode={viewMode}
              />
            </div>
            
            {/* Right Sidebar */}
            <div className="w-80 border-l border-border bg-background overflow-y-auto scrollbar-thin">
              <div className="p-6 space-y-6">
                <UpcomingPosts
                  posts={filteredPosts}
                  onPostClick={handlePostClick}
                  onQuickEdit={handleQuickEdit}
                />
                
                <PublishingStats posts={filteredPosts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCalendar;