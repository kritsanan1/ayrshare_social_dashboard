import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterPanel = ({
  filters,
  onFiltersChange,
  searchQuery,
  onSearchChange
}) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const fileTypeOptions = [
    { value: 'all', label: 'All Files' },
    { value: 'image', label: 'Images' },
    { value: 'video', label: 'Videos' },
    { value: 'document', label: 'Documents' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const platformOptions = [
    { value: 'all', label: 'All Platforms' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'youtube', label: 'YouTube' }
  ];

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Search</h3>
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <Input
            type="text"
            placeholder="Search by filename or tags..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="pl-10"
          />
        </div>
      </div>
      {/* Filters */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          <button
            onClick={() => {
              onFiltersChange({
                fileType: 'all',
                dateRange: 'all',
                platform: 'all',
                tags: [],
                customDateRange: { start: '', end: '' }
              });
              onSearchChange('');
            }}
            className="text-sm text-primary hover:text-primary/80"
          >
            Clear All
          </button>
        </div>

        <div className="space-y-4">
          {/* File Type Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              File Type
            </label>
            <Select
              value={filters?.fileType}
              onChange={(value) => handleFilterChange('fileType', value)}
              options={fileTypeOptions}
              placeholder="Select file type"
            />
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Upload Date
            </label>
            <Select
              value={filters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
              options={dateRangeOptions}
              placeholder="Select date range"
            />
            
            {filters?.dateRange === 'custom' && (
              <div className="mt-3 space-y-2">
                <Input
                  type="date"
                  placeholder="Start date"
                  value={filters?.customDateRange?.start}
                  onChange={(e) => handleFilterChange('customDateRange', {
                    ...filters?.customDateRange,
                    start: e?.target?.value
                  })}
                />
                <Input
                  type="date"
                  placeholder="End date"
                  value={filters?.customDateRange?.end}
                  onChange={(e) => handleFilterChange('customDateRange', {
                    ...filters?.customDateRange,
                    end: e?.target?.value
                  })}
                />
              </div>
            )}
          </div>

          {/* Platform Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Platform Usage
            </label>
            <Select
              value={filters?.platform}
              onChange={(value) => handleFilterChange('platform', value)}
              options={platformOptions}
              placeholder="Select platform"
            />
          </div>

          {/* Tags Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tags
            </label>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter tags (comma separated)"
                onKeyPress={(e) => {
                  if (e?.key === 'Enter') {
                    const value = e?.target?.value?.trim();
                    if (value && !filters?.tags?.includes(value)) {
                      handleFilterChange('tags', [...filters?.tags, value]);
                      e.target.value = '';
                    }
                  }
                }}
              />
              
              {filters?.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {filters?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                    >
                      {tag}
                      <button
                        onClick={() => {
                          const newTags = filters?.tags?.filter((_, i) => i !== index);
                          handleFilterChange('tags', newTags);
                        }}
                        className="ml-1 text-primary hover:text-primary/80"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Quick Filters */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Filters</h3>
        <div className="space-y-2">
          <button
            onClick={() => handleFilterChange('fileType', 'image')}
            className="w-full text-left px-3 py-2 text-sm rounded hover:bg-muted/50 transition-colors flex items-center space-x-2"
          >
            <Icon name="Image" size={16} className="text-primary" />
            <span>Images Only</span>
          </button>
          <button
            onClick={() => handleFilterChange('fileType', 'video')}
            className="w-full text-left px-3 py-2 text-sm rounded hover:bg-muted/50 transition-colors flex items-center space-x-2"
          >
            <Icon name="Video" size={16} className="text-primary" />
            <span>Videos Only</span>
          </button>
          <button
            onClick={() => {
              onFiltersChange({
                ...filters,
                fileType: 'all',
                dateRange: 'week'
              });
            }}
            className="w-full text-left px-3 py-2 text-sm rounded hover:bg-muted/50 transition-colors flex items-center space-x-2"
          >
            <Icon name="Calendar" size={16} className="text-primary" />
            <span>Recent Uploads</span>
          </button>
          <button
            onClick={() => {
              // Filter for highly used media (usage > 10)
              console.log('Filter for popular media');
            }}
            className="w-full text-left px-3 py-2 text-sm rounded hover:bg-muted/50 transition-colors flex items-center space-x-2"
          >
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <span>Popular Media</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;