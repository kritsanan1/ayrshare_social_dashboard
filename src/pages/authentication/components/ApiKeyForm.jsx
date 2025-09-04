import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ApiKeyForm = ({ onApiKeyValidated }) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState(null);
  const [error, setError] = useState('');

  const handleApiKeyChange = (e) => {
    setApiKey(e?.target?.value);
    setValidationStatus(null);
    setError('');
  };

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

  const validateApiKey = async () => {
    if (!apiKey?.trim()) {
      setError('API key is required');
      return;
    }

    setIsValidating(true);
    setError('');

    try {
      // Mock API validation - replace with actual Ayrshare API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation logic
      if (apiKey === 'ayr_test_key_12345') {
        setValidationStatus('success');
        onApiKeyValidated?.(apiKey);
      } else {
        setValidationStatus('error');
        setError('Invalid API key. Please check your credentials.');
      }
    } catch (err) {
      setValidationStatus('error');
      setError('Connection failed. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const getValidationIcon = () => {
    if (validationStatus === 'success') return 'CheckCircle';
    if (validationStatus === 'error') return 'XCircle';
    return null;
  };

  const getValidationColor = () => {
    if (validationStatus === 'success') return 'text-success';
    if (validationStatus === 'error') return 'text-error';
    return '';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          API Key Setup
        </h3>
        <p className="text-muted-foreground">
          Enter your Ayrshare API key to connect your account
        </p>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <Input
            label="API Key"
            type={showApiKey ? 'text' : 'password'}
            placeholder="Enter your Ayrshare API key"
            value={apiKey}
            onChange={handleApiKeyChange}
            error={error}
            required
            className="pr-20"
          />
          
          <div className="absolute right-3 top-8 flex items-center space-x-2">
            {validationStatus && (
              <Icon 
                name={getValidationIcon()} 
                size={16} 
                className={getValidationColor()}
              />
            )}
            <button
              type="button"
              onClick={toggleApiKeyVisibility}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name={showApiKey ? 'EyeOff' : 'Eye'} size={16} />
            </button>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="default"
            onClick={validateApiKey}
            loading={isValidating}
            disabled={!apiKey?.trim() || isValidating}
            iconName="Key"
            iconPosition="left"
            className="flex-1"
          >
            {isValidating ? 'Validating...' : 'Connect'}
          </Button>
          
          <Button
            variant="outline"
            onClick={validateApiKey}
            disabled={!apiKey?.trim() || isValidating}
            iconName="Zap"
            iconPosition="left"
          >
            Test
          </Button>
        </div>

        {validationStatus === 'success' && (
          <div className="flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm text-success font-medium">
              API key validated successfully!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiKeyForm;