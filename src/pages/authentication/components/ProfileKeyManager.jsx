import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileKeyManager = () => {
  const [profileKey, setProfileKey] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedProfiles, setConnectedProfiles] = useState([
    {
      id: 1,
      name: 'Marketing Agency Pro',
      profileKey: 'prof_mkt_12345',
      status: 'connected',
      accountType: 'Business',
      connectedAt: '2025-01-02T10:30:00Z',
      platforms: ['Facebook', 'Instagram', 'Twitter', 'LinkedIn']
    },
    {
      id: 2,
      name: 'E-commerce Store',
      profileKey: 'prof_ecom_67890',
      status: 'warning',
      accountType: 'Enterprise',
      connectedAt: '2025-01-01T15:45:00Z',
      platforms: ['Facebook', 'Instagram', 'Pinterest']
    }
  ]);

  const handleProfileKeyChange = (e) => {
    setProfileKey(e?.target?.value);
  };

  const connectProfile = async () => {
    if (!profileKey?.trim()) return;

    setIsConnecting(true);
    
    try {
      // Mock profile connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newProfile = {
        id: Date.now(),
        name: 'New Business Profile',
        profileKey: profileKey,
        status: 'connected',
        accountType: 'Business',
        connectedAt: new Date()?.toISOString(),
        platforms: ['Facebook', 'Instagram']
      };
      
      setConnectedProfiles(prev => [...prev, newProfile]);
      setProfileKey('');
    } catch (error) {
      console.error('Failed to connect profile:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectProfile = (profileId) => {
    setConnectedProfiles(prev => prev?.filter(profile => profile?.id !== profileId));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Profile Key Management
        </h3>
        <p className="text-muted-foreground">
          Manage Business and Enterprise profile keys
        </p>
      </div>
      {/* Add New Profile */}
      <div className="p-4 border border-border rounded-lg bg-card/50">
        <h4 className="text-sm font-medium text-foreground mb-3">
          Add New Profile
        </h4>
        <div className="flex space-x-3">
          <Input
            type="text"
            placeholder="Enter profile key"
            value={profileKey}
            onChange={handleProfileKeyChange}
            className="flex-1"
          />
          <Button
            variant="default"
            onClick={connectProfile}
            loading={isConnecting}
            disabled={!profileKey?.trim() || isConnecting}
            iconName="Plus"
            iconPosition="left"
          >
            Connect
          </Button>
        </div>
      </div>
      {/* Connected Profiles */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">
          Connected Profiles ({connectedProfiles?.length})
        </h4>
        
        {connectedProfiles?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="Users" size={48} className="mx-auto mb-3 opacity-50" />
            <p>No profiles connected yet</p>
            <p className="text-sm">Add your first Business or Enterprise profile above</p>
          </div>
        ) : (
          <div className="space-y-3">
            {connectedProfiles?.map((profile) => (
              <div key={profile?.id} className="p-4 border border-border rounded-lg bg-card">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h5 className="text-sm font-medium text-foreground truncate">
                        {profile?.name}
                      </h5>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {profile?.accountType}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon 
                        name={getStatusIcon(profile?.status)} 
                        size={14} 
                        className={getStatusColor(profile?.status)}
                      />
                      <span className={`text-xs ${getStatusColor(profile?.status)}`}>
                        {profile?.status === 'connected' ? 'Active' : 
                         profile?.status === 'warning' ? 'Needs Attention' : 'Disconnected'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        • Connected {formatDate(profile?.connectedAt)}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {profile?.platforms?.map((platform) => (
                        <span 
                          key={platform}
                          className="text-xs px-2 py-1 bg-muted/50 text-muted-foreground rounded"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Settings"
                    >
                      Manage
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Trash2"
                      onClick={() => disconnectProfile(profile?.id)}
                      className="text-error hover:text-error"
                    >
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileKeyManager;