import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountHealthMonitor = ({ platforms }) => {
  const [healthData, setHealthData] = useState({
    overall: 'good',
    issues: [],
    recommendations: []
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    analyzeAccountHealth();
  }, [platforms]);

  const analyzeAccountHealth = () => {
    const issues = [];
    const recommendations = [];
    let overallHealth = 'good';

    platforms?.forEach(platform => {
      // Check for connection issues
      if (platform?.status === 'error') {
        issues?.push({
          type: 'error',
          platform: platform?.name,
          message: `Connection failed: ${platform?.errorMessage}`,
          action: 'reconnect'
        });
        overallHealth = 'critical';
      }

      // Check for warnings
      if (platform?.status === 'warning') {
        issues?.push({
          type: 'warning',
          platform: platform?.name,
          message: platform?.warningMessage,
          action: 'review'
        });
        if (overallHealth === 'good') overallHealth = 'warning';
      }

      // Check rate limits
      if (platform?.status === 'connected' && platform?.rateLimit) {
        const usage = (platform?.rateLimit?.used / platform?.rateLimit?.total) * 100;
        if (usage > 90) {
          issues?.push({
            type: 'warning',
            platform: platform?.name,
            message: `Rate limit almost reached (${platform?.rateLimit?.used}/${platform?.rateLimit?.total})`,
            action: 'monitor'
          });
          if (overallHealth === 'good') overallHealth = 'warning';
        }
      }

      // Check permissions
      if (platform?.status === 'connected' && platform?.permissions?.status === 'limited') {
        recommendations?.push({
          platform: platform?.name,
          message: 'Limited permissions detected. Consider upgrading for full functionality.',
          action: 'upgrade'
        });
      }

      // Check last sync time
      if (platform?.status === 'connected' && platform?.lastSync) {
        const lastSyncTime = new Date(platform.lastSync);
        const hoursSinceSync = (Date.now() - lastSyncTime?.getTime()) / (1000 * 60 * 60);
        
        if (hoursSinceSync > 24) {
          recommendations?.push({
            platform: platform?.name,
            message: `Last sync was ${Math.floor(hoursSinceSync)} hours ago. Consider refreshing.`,
            action: 'refresh'
          });
        }
      }
    });

    setHealthData({
      overall: overallHealth,
      issues,
      recommendations
    });
  };

  const getHealthColor = (health) => {
    switch (health) {
      case 'good':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getHealthIcon = (health) => {
    switch (health) {
      case 'good':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'critical':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getHealthText = (health) => {
    switch (health) {
      case 'good':
        return 'All systems healthy';
      case 'warning':
        return 'Some issues detected';
      case 'critical':
        return 'Critical issues found';
      default:
        return 'Checking health...';
    }
  };

  const handleIssueAction = (issue) => {
    console.log(`Handling action: ${issue?.action} for ${issue?.platform}`);
  };

  const handleRecommendationAction = (recommendation) => {
    console.log(`Handling recommendation: ${recommendation?.action} for ${recommendation?.platform}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon
            name={getHealthIcon(healthData?.overall)}
            size={24}
            className={getHealthColor(healthData?.overall)}
          />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Account Health</h3>
            <p className={`text-sm ${getHealthColor(healthData?.overall)}`}>
              {getHealthText(healthData?.overall)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            onClick={analyzeAccountHealth}
          >
            Refresh
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </div>
      {/* Health Summary */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <div className="text-xl font-bold text-success">
            {platforms?.filter(p => p?.status === 'connected')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Healthy</div>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <div className="text-xl font-bold text-warning">
            {healthData?.issues?.filter(i => i?.type === 'warning')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Warnings</div>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <div className="text-xl font-bold text-error">
            {healthData?.issues?.filter(i => i?.type === 'error')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Critical</div>
        </div>
      </div>
      {/* Expanded Details */}
      {isExpanded && (
        <div className="space-y-4 animate-slide-up">
          {/* Issues */}
          {healthData?.issues?.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Issues Requiring Attention</h4>
              <div className="space-y-2">
                {healthData?.issues?.map((issue, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    issue?.type === 'error' ? 'bg-error/10 border-error/20' : 'bg-warning/10 border-warning/20'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-2">
                        <Icon
                          name={issue?.type === 'error' ? 'XCircle' : 'AlertTriangle'}
                          size={16}
                          className={issue?.type === 'error' ? 'text-error' : 'text-warning'}
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground">{issue?.platform}</p>
                          <p className="text-xs text-muted-foreground">{issue?.message}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleIssueAction(issue)}
                      >
                        {issue?.action === 'reconnect' ? 'Reconnect' :
                         issue?.action === 'review' ? 'Review' : 'Monitor'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {healthData?.recommendations?.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Recommendations</h4>
              <div className="space-y-2">
                {healthData?.recommendations?.map((rec, index) => (
                  <div key={index} className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-2">
                        <Icon name="Lightbulb" size={16} className="text-primary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{rec?.platform}</p>
                          <p className="text-xs text-muted-foreground">{rec?.message}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRecommendationAction(rec)}
                      >
                        {rec?.action === 'upgrade' ? 'Upgrade' :
                         rec?.action === 'refresh' ? 'Refresh' : 'Action'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Issues */}
          {healthData?.issues?.length === 0 && healthData?.recommendations?.length === 0 && (
            <div className="text-center py-8">
              <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
              <h4 className="text-lg font-medium text-foreground mb-2">All Good!</h4>
              <p className="text-muted-foreground">
                All your social media accounts are healthy and functioning properly.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountHealthMonitor;