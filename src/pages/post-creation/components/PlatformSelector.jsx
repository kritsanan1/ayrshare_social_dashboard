import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { Checkbox } from '../../../components/ui/Checkbox';

const PlatformSelector = ({ selectedPlatforms, onPlatformToggle }) => {
  const platforms = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: '#1877F2',
      connected: true,
      profileImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=40&h=40&fit=crop&crop=face',
      followers: '12.5K',
      characterLimit: 63206,
      features: ['text', 'images', 'videos', 'links']
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: 'Twitter',
      color: '#000000',
      connected: true,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      followers: '8.2K',
      characterLimit: 280,
      features: ['text', 'images', 'videos', 'links']
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'Instagram',
      color: '#E4405F',
      connected: true,
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      followers: '25.8K',
      characterLimit: 2200,
      features: ['text', 'images', 'videos', 'hashtags']
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: '#0A66C2',
      connected: true,
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      followers: '5.1K',
      characterLimit: 3000,
      features: ['text', 'images', 'videos', 'links', 'articles']
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: 'Youtube',
      color: '#FF0000',
      connected: false,
      profileImage: null,
      followers: '0',
      characterLimit: 5000,
      features: ['videos', 'text', 'thumbnails']
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: 'Music',
      color: '#000000',
      connected: false,
      profileImage: null,
      followers: '0',
      characterLimit: 2200,
      features: ['videos', 'text', 'hashtags']
    }
  ];

  const handlePlatformChange = (platformId, checked) => {
    const platform = platforms?.find(p => p?.id === platformId);
    if (platform && platform?.connected) {
      onPlatformToggle(platformId, checked);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Select Platforms</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {selectedPlatforms?.length} selected
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms?.map((platform) => (
          <div
            key={platform?.id}
            className={`relative p-4 rounded-lg border transition-all duration-200 ${
              platform?.connected
                ? selectedPlatforms?.includes(platform?.id)
                  ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground' :'border-border bg-muted/20 opacity-60'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {platform?.connected && platform?.profileImage ? (
                  <Image
                    src={platform?.profileImage}
                    alt={`${platform?.name} profile`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: platform?.connected ? platform?.color : '#374151' }}
                  >
                    <Icon
                      name={platform?.icon}
                      size={20}
                      color={platform?.connected ? 'white' : '#9CA3AF'}
                    />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground">
                    {platform?.name}
                  </h4>
                  {platform?.connected ? (
                    <Checkbox
                      checked={selectedPlatforms?.includes(platform?.id)}
                      onChange={(e) => handlePlatformChange(platform?.id, e?.target?.checked)}
                      size="sm"
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground">Not connected</span>
                  )}
                </div>

                {platform?.connected ? (
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {platform?.followers} followers
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Type" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {platform?.characterLimit?.toLocaleString()} char limit
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {platform?.features?.map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button className="text-xs text-primary hover:text-primary/80 font-medium">
                    Connect Account
                  </button>
                )}
              </div>
            </div>

            {!platform?.connected && (
              <div className="absolute inset-0 bg-background/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Icon name="Link" size={24} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Connect to use</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">Platform Tips</p>
            <p className="text-xs text-muted-foreground mt-1">
              Each platform has different character limits and features. Content will be automatically optimized for each selected platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformSelector;