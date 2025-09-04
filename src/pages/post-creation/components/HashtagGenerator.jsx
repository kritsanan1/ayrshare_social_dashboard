import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const HashtagGenerator = ({ content, selectedPlatforms, onHashtagInsert }) => {
  const [generatedHashtags, setGeneratedHashtags] = useState([]);
  const [customHashtag, setCustomHashtag] = useState('');
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock hashtag suggestions based on content analysis
  const generateHashtags = async (text) => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock hashtag generation based on keywords
    const keywords = text?.toLowerCase()?.split(' ')?.filter(word => word?.length > 3);
    const baseHashtags = [
      '#socialmedia', '#marketing', '#digitalmarketing', '#content', '#business',
      '#entrepreneur', '#success', '#growth', '#innovation', '#technology',
      '#branding', '#strategy', '#engagement', '#community', '#networking',
      '#productivity', '#leadership', '#inspiration', '#motivation', '#tips'
    ];

    // Generate contextual hashtags
    const contextualHashtags = [];
    if (text?.toLowerCase()?.includes('business') || text?.toLowerCase()?.includes('company')) {
      contextualHashtags?.push('#business', '#entrepreneur', '#startup', '#corporate');
    }
    if (text?.toLowerCase()?.includes('marketing') || text?.toLowerCase()?.includes('promote')) {
      contextualHashtags?.push('#marketing', '#promotion', '#advertising', '#campaign');
    }
    if (text?.toLowerCase()?.includes('team') || text?.toLowerCase()?.includes('collaboration')) {
      contextualHashtags?.push('#teamwork', '#collaboration', '#leadership', '#management');
    }
    if (text?.toLowerCase()?.includes('technology') || text?.toLowerCase()?.includes('digital')) {
      contextualHashtags?.push('#technology', '#digital', '#innovation', '#tech');
    }

    // Combine and randomize
    const allHashtags = [...new Set([...contextualHashtags, ...baseHashtags])];
    const shuffled = allHashtags?.sort(() => 0.5 - Math.random());
    
    const suggestions = shuffled?.slice(0, 15)?.map((tag, index) => ({
      id: index + 1,
      tag,
      popularity: Math.floor(Math.random() * 1000000) + 10000,
      trending: Math.random() > 0.7,
      platforms: selectedPlatforms?.length > 0 ? selectedPlatforms : ['instagram', 'twitter']
    }));

    setGeneratedHashtags(suggestions);
    setIsGenerating(false);
  };

  useEffect(() => {
    if (content?.trim()?.length > 10) {
      generateHashtags(content);
    }
  }, [content]);

  const toggleHashtag = (hashtag) => {
    setSelectedHashtags(prev => 
      prev?.includes(hashtag?.tag)
        ? prev?.filter(tag => tag !== hashtag?.tag)
        : [...prev, hashtag?.tag]
    );
  };

  const addCustomHashtag = () => {
    if (customHashtag?.trim() && !customHashtag?.startsWith('#')) {
      const formattedTag = `#${customHashtag?.trim()?.toLowerCase()?.replace(/\s+/g, '')}`;
      if (!selectedHashtags?.includes(formattedTag)) {
        setSelectedHashtags(prev => [...prev, formattedTag]);
      }
      setCustomHashtag('');
    }
  };

  const insertHashtags = () => {
    if (selectedHashtags?.length > 0) {
      const hashtagString = selectedHashtags?.join(' ');
      onHashtagInsert(hashtagString);
      setSelectedHashtags([]);
    }
  };

  const clearSelection = () => {
    setSelectedHashtags([]);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000)?.toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'K';
    }
    return num?.toString();
  };

  const trendingHashtags = [
    '#MondayMotivation', '#TechTuesday', '#WisdomWednesday', '#ThrowbackThursday', '#FeatureFriday',
    '#SaturdayVibes', '#SundayFunday', '#NewWeek', '#Goals2024', '#Innovation'
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Hash" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Hashtag Generator</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {selectedHashtags?.length} selected
          </span>
          {selectedHashtags?.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearSelection}
              iconName="X"
              iconSize={14}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {/* Custom Hashtag Input */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <div className="flex-1">
            <Input
              placeholder="Add custom hashtag (without #)"
              value={customHashtag}
              onChange={(e) => setCustomHashtag(e?.target?.value)}
              onKeyPress={(e) => e?.key === 'Enter' && addCustomHashtag()}
            />
          </div>
          <Button
            onClick={addCustomHashtag}
            disabled={!customHashtag?.trim()}
            iconName="Plus"
            iconPosition="left"
          >
            Add
          </Button>
        </div>
      </div>
      {/* Trending Hashtags */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="TrendingUp" size={16} className="text-warning" />
          <span>Trending Now</span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {trendingHashtags?.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                if (!selectedHashtags?.includes(tag)) {
                  setSelectedHashtags(prev => [...prev, tag]);
                }
              }}
              className={`px-3 py-1.5 text-sm rounded-full border transition-all duration-200 ${
                selectedHashtags?.includes(tag)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background border-border hover:border-primary/50 text-foreground hover:bg-primary/5'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      {/* Generated Hashtags */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">Suggested Hashtags</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => generateHashtags(content)}
            loading={isGenerating}
            iconName="RefreshCw"
            iconSize={14}
          >
            Regenerate
          </Button>
        </div>

        {isGenerating ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Icon name="Loader2" size={24} className="text-primary animate-spin mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Generating hashtags...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto scrollbar-thin">
            {generatedHashtags?.map((hashtag) => (
              <button
                key={hashtag?.id}
                onClick={() => toggleHashtag(hashtag)}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                  selectedHashtags?.includes(hashtag?.tag)
                    ? 'bg-primary/5 border-primary text-primary' :'bg-background border-border hover:border-muted-foreground hover:bg-muted/20'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{hashtag?.tag}</span>
                  {hashtag?.trending && (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-warning/10 text-warning">
                      <Icon name="TrendingUp" size={12} className="mr-1" />
                      Trending
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{formatNumber(hashtag?.popularity)} posts</span>
                  <Icon 
                    name={selectedHashtags?.includes(hashtag?.tag) ? 'Check' : 'Plus'} 
                    size={16} 
                    className={selectedHashtags?.includes(hashtag?.tag) ? 'text-primary' : 'text-muted-foreground'}
                  />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Selected Hashtags Preview */}
      {selectedHashtags?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Selected Hashtags</h4>
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-foreground font-mono">
              {selectedHashtags?.join(' ')}
            </p>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {selectedHashtags?.length > 0 && (
            <span>
              {selectedHashtags?.length} hashtag{selectedHashtags?.length !== 1 ? 's' : ''} ready to insert
            </span>
          )}
        </div>
        <Button
          onClick={insertHashtags}
          disabled={selectedHashtags?.length === 0}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Insert Hashtags
        </Button>
      </div>
      {/* Platform Guidelines */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">Hashtag Best Practices</p>
            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
              <li>• Instagram: 5-10 hashtags for optimal reach</li>
              <li>• Twitter: 1-2 hashtags to avoid looking spammy</li>
              <li>• LinkedIn: 3-5 professional hashtags</li>
              <li>• TikTok: 3-5 trending hashtags work best</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashtagGenerator;