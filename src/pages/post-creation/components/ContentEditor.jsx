import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentEditor = ({ content, onChange, selectedPlatforms }) => {
  const [characterCounts, setCharacterCounts] = useState({});
  const [activeTab, setActiveTab] = useState('compose');

  const platformLimits = {
    facebook: 63206,
    twitter: 280,
    instagram: 2200,
    linkedin: 3000,
    youtube: 5000,
    tiktok: 2200
  };

  useEffect(() => {
    const counts = {};
    selectedPlatforms?.forEach(platform => {
      counts[platform] = content?.length;
    });
    setCharacterCounts(counts);
  }, [content, selectedPlatforms]);

  const getCharacterCountColor = (platform) => {
    const count = characterCounts?.[platform] || 0;
    const limit = platformLimits?.[platform];
    const percentage = (count / limit) * 100;

    if (percentage >= 90) return 'text-error';
    if (percentage >= 75) return 'text-warning';
    return 'text-muted-foreground';
  };

  const formatText = (type) => {
    const textarea = document.getElementById('content-editor');
    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;
    const selectedText = content?.substring(start, end);
    
    if (!selectedText) return;

    let formattedText = selectedText;
    switch (type) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) formattedText = `[${selectedText}](${url})`;
        break;
      default:
        return;
    }

    const newContent = content?.substring(0, start) + formattedText + content?.substring(end);
    onChange(newContent);
  };

  const insertEmoji = (emoji) => {
    const textarea = document.getElementById('content-editor');
    const start = textarea?.selectionStart;
    const newContent = content?.substring(0, start) + emoji + content?.substring(start);
    onChange(newContent);
  };

  const commonEmojis = ['😀', '😍', '🎉', '👍', '❤️', '🔥', '💯', '🚀', '✨', '🎯', '💡', '🌟'];

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('compose')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'compose' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Compose
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'preview' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        {/* Formatting Tools */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText('bold')}
            iconName="Bold"
            iconSize={16}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText('italic')}
            iconName="Italic"
            iconSize={16}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText('link')}
            iconName="Link"
            iconSize={16}
          />
          <div className="w-px h-4 bg-border" />
          <Button
            variant="ghost"
            size="sm"
            iconName="Smile"
            iconSize={16}
          />
        </div>
      </div>
      {/* Editor Content */}
      <div className="p-4">
        {activeTab === 'compose' ? (
          <div className="space-y-4">
            <textarea
              id="content-editor"
              value={content}
              onChange={(e) => onChange(e?.target?.value)}
              placeholder="What's on your mind? Share your thoughts across all your social platforms..."
              className="w-full h-48 p-4 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-muted-foreground"
            />

            {/* Quick Emoji Bar */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Quick emojis:</span>
              {commonEmojis?.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => insertEmoji(emoji)}
                  className="p-1 hover:bg-muted rounded text-lg transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-48 p-4 bg-background border border-border rounded-lg overflow-y-auto">
            <div className="prose prose-sm max-w-none text-foreground">
              {content ? (
                <div className="whitespace-pre-wrap">{content}</div>
              ) : (
                <p className="text-muted-foreground italic">Preview will appear here...</p>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Character Count Footer */}
      {selectedPlatforms?.length > 0 && (
        <div className="px-4 py-3 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Character count by platform:</span>
            <div className="flex items-center space-x-4">
              {selectedPlatforms?.map((platform) => (
                <div key={platform} className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-foreground capitalize">
                    {platform}:
                  </span>
                  <span className={`text-xs font-mono ${getCharacterCountColor(platform)}`}>
                    {characterCounts?.[platform] || 0}/{platformLimits?.[platform]?.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {selectedPlatforms?.some(platform => 
            (characterCounts?.[platform] || 0) > platformLimits?.[platform] * 0.9
          ) && (
            <div className="mt-2 flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <p className="text-xs text-warning">
                Some platforms are approaching character limits. Consider shortening your content.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentEditor;