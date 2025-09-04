import React from 'react';
import Icon from '../../../components/AppIcon';

const PublishingStats = ({ posts }) => {
  const calculateStats = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today.getTime() - (today.getDay() * 24 * 60 * 60 * 1000));
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const stats = {
      today: {
        scheduled: 0,
        published: 0,
        failed: 0
      },
      week: {
        scheduled: 0,
        published: 0,
        failed: 0
      },
      month: {
        scheduled: 0,
        published: 0,
        failed: 0
      },
      platforms: {}
    };

    posts?.forEach(post => {
      const postDate = new Date(post.scheduledDate);
      const postDay = new Date(postDate.getFullYear(), postDate.getMonth(), postDate.getDate());

      // Platform stats
      if (!stats?.platforms?.[post?.platform]) {
        stats.platforms[post.platform] = { scheduled: 0, published: 0, failed: 0 };
      }
      stats.platforms[post.platform][post.status]++;

      // Today stats
      if (postDay?.getTime() === today?.getTime()) {
        stats.today[post.status]++;
      }

      // Week stats
      if (postDate >= thisWeek) {
        stats.week[post.status]++;
      }

      // Month stats
      if (postDate >= thisMonth) {
        stats.month[post.status]++;
      }
    });

    return stats;
  };

  const stats = calculateStats();

  const StatCard = ({ title, scheduled, published, failed, icon }) => (
    <div className="bg-muted/30 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-foreground">{title}</h4>
        <Icon name={icon} size={16} className="text-muted-foreground" />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Scheduled</span>
          <span className="text-sm font-medium text-primary">{scheduled}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Published</span>
          <span className="text-sm font-medium text-success">{published}</span>
        </div>
        {failed > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Failed</span>
            <span className="text-sm font-medium text-error">{failed}</span>
          </div>
        )}
      </div>
    </div>
  );

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

  const topPlatforms = Object.entries(stats?.platforms)?.sort(([,a], [,b]) => (b?.scheduled + b?.published) - (a?.scheduled + a?.published))?.slice(0, 3);

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Publishing Statistics</h3>
      </div>
      <div className="p-4 space-y-4">
        {/* Time-based Stats */}
        <div className="space-y-3">
          <StatCard
            title="Today"
            scheduled={stats?.today?.scheduled}
            published={stats?.today?.published}
            failed={stats?.today?.failed}
            icon="Calendar"
          />
          
          <StatCard
            title="This Week"
            scheduled={stats?.week?.scheduled}
            published={stats?.week?.published}
            failed={stats?.week?.failed}
            icon="CalendarDays"
          />
          
          <StatCard
            title="This Month"
            scheduled={stats?.month?.scheduled}
            published={stats?.month?.published}
            failed={stats?.month?.failed}
            icon="CalendarRange"
          />
        </div>

        {/* Platform Performance */}
        {topPlatforms?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Top Platforms</h4>
            <div className="space-y-2">
              {topPlatforms?.map(([platform, platformStats]) => (
                <div key={platform} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                  <div className="flex items-center space-x-2">
                    <Icon name={getPlatformIcon(platform)} size={16} />
                    <span className="text-sm font-medium text-foreground capitalize">
                      {platform}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-primary">
                      {platformStats?.scheduled} scheduled
                    </span>
                    <span className="text-success">
                      {platformStats?.published} published
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Success Rate */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Success Rate</span>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${posts?.length > 0 ? 
                    (posts?.filter(p => p?.status === 'published')?.length / posts?.length) * 100 : 0
                  }%` 
                }}
              />
            </div>
            <span className="text-sm font-medium text-success">
              {posts?.length > 0 ? 
                Math.round((posts?.filter(p => p?.status === 'published')?.length / posts?.length) * 100) : 0
              }%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishingStats;