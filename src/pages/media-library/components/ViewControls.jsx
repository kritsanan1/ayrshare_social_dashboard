import React from 'react';
import Icon from '../../../components/AppIcon';

const ViewControls = ({
  viewMode,
  onViewModeChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange
}) => {
  const viewModes = [
    { id: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { id: 'list', icon: 'List', label: 'List View' },
    { id: 'detailed', icon: 'LayoutGrid', label: 'Detailed View' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'name', label: 'Name' },
    { value: 'size', label: 'Size' },
    { value: 'usage', label: 'Usage' }
  ];

  return (
    <div className="flex items-center gap-4">
      {/* View Mode Controls */}
      <div className="flex items-center bg-muted rounded-lg p-1">
        {viewModes?.map((mode) => (
          <button
            key={mode?.id}
            onClick={() => onViewModeChange(mode?.id)}
            className={`p-2 rounded transition-colors ${
              viewMode === mode?.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title={mode?.label}
          >
            <Icon name={mode?.icon} size={16} />
          </button>
        ))}
      </div>
      {/* Sort Controls */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e?.target?.value)}
          className="px-3 py-1.5 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {sortOptions?.map((option) => (
            <option key={option?.value} value={option?.value}>
              {option?.label}
            </option>
          ))}
        </select>
        
        <button
          onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          title={sortOrder === 'asc' ? 'Sort Ascending' : 'Sort Descending'}
        >
          <Icon name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} size={16} />
        </button>
      </div>
    </div>
  );
};

export default ViewControls;