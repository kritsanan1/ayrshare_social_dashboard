import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LinkShortener = ({ onLinkInsert }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [isShortening, setIsShortening] = useState(false);
  const [linkHistory, setLinkHistory] = useState([
    {
      id: 1,
      original: 'https://example.com/very-long-url-that-needs-shortening',
      shortened: 'https://ayr.sh/abc123',
      alias: 'product-launch',
      clicks: 245,
      created: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      original: 'https://blog.example.com/social-media-marketing-tips',
      shortened: 'https://ayr.sh/def456',
      alias: 'marketing-tips',
      clicks: 89,
      created: '2024-01-14T15:45:00Z'
    }
  ]);

  const shortenUrl = async () => {
    if (!originalUrl?.trim()) return;
    
    setIsShortening(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock shortened URL
    const randomId = Math.random()?.toString(36)?.substring(2, 8);
    const alias = customAlias?.trim() || randomId;
    const shortened = `https://ayr.sh/${alias}`;
    
    setShortenedUrl(shortened);
    
    // Add to history
    const newLink = {
      id: Date.now(),
      original: originalUrl,
      shortened,
      alias,
      clicks: 0,
      created: new Date()?.toISOString()
    };
    
    setLinkHistory(prev => [newLink, ...prev]);
    setIsShortening(false);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard?.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const insertLink = (url) => {
    onLinkInsert(url);
  };

  const resetForm = () => {
    setOriginalUrl('');
    setShortenedUrl('');
    setCustomAlias('');
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Link" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Link Shortener</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={resetForm}
          iconName="RotateCcw"
          iconSize={14}
        >
          Reset
        </Button>
      </div>
      {/* URL Input Section */}
      <div className="space-y-4 mb-6">
        <Input
          label="Original URL"
          type="url"
          placeholder="https://example.com/your-long-url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e?.target?.value)}
          error={originalUrl && !isValidUrl(originalUrl) ? 'Please enter a valid URL' : ''}
        />

        <Input
          label="Custom alias (optional)"
          type="text"
          placeholder="my-custom-link"
          value={customAlias}
          onChange={(e) => setCustomAlias(e?.target?.value?.replace(/[^a-zA-Z0-9-]/g, ''))}
          description="Only letters, numbers, and hyphens allowed"
        />

        <div className="flex items-center space-x-3">
          <Checkbox
            checked={trackingEnabled}
            onChange={(e) => setTrackingEnabled(e?.target?.checked)}
            label="Enable click tracking"
            description="Track clicks and analytics for this link"
          />
        </div>

        <Button
          onClick={shortenUrl}
          disabled={!originalUrl?.trim() || !isValidUrl(originalUrl) || isShortening}
          loading={isShortening}
          iconName="Zap"
          iconPosition="left"
          fullWidth
        >
          {isShortening ? 'Shortening...' : 'Shorten URL'}
        </Button>
      </div>
      {/* Shortened URL Result */}
      {shortenedUrl && (
        <div className="mb-6 p-4 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-foreground">Shortened URL</h4>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(shortenedUrl)}
                iconName="Copy"
                iconSize={14}
              >
                Copy
              </Button>
              <Button
                size="sm"
                onClick={() => insertLink(shortenedUrl)}
                iconName="Plus"
                iconSize={14}
              >
                Insert
              </Button>
            </div>
          </div>
          <div className="bg-background border border-border rounded p-3">
            <p className="text-sm font-mono text-foreground break-all">
              {shortenedUrl}
            </p>
          </div>
          <div className="mt-2 flex items-center space-x-4 text-xs text-muted-foreground">
            <span>✓ Tracking enabled</span>
            <span>✓ Custom alias: {customAlias || 'auto-generated'}</span>
          </div>
        </div>
      )}
      {/* Link History */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">Recent Links</h4>
          <span className="text-xs text-muted-foreground">
            {linkHistory?.length} link{linkHistory?.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
          {linkHistory?.map((link) => (
            <div
              key={link?.id}
              className="p-3 border border-border rounded-lg hover:border-muted-foreground transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-medium text-primary font-mono truncate">
                      {link?.shortened}
                    </p>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                      {link?.alias}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate" title={link?.original}>
                    {link?.original}
                  </p>
                </div>
                <div className="flex items-center space-x-1 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(link?.shortened)}
                    iconName="Copy"
                    iconSize={14}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => insertLink(link?.shortened)}
                    iconName="Plus"
                    iconSize={14}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <Icon name="MousePointer" size={12} />
                    <span>{link?.clicks} clicks</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>{formatDate(link?.created)}</span>
                  </span>
                </div>
                <button className="text-primary hover:text-primary/80 font-medium">
                  View Analytics
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Features Info */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">Link Shortener Features</p>
            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
              <li>• Custom aliases for branded links</li>
              <li>• Click tracking and analytics</li>
              <li>• QR code generation for offline sharing</li>
              <li>• Bulk link management and organization</li>
              <li>• Link expiration and password protection</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkShortener;