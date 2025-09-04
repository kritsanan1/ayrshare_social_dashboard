import React, { useState, useEffect } from 'react';
import PrimarySidebar from '../../components/ui/PrimarySidebar';
import NavigationHeader from '../../components/ui/NavigationHeader';
import MediaGrid from './components/MediaGrid';
import FilterPanel from './components/FilterPanel';
import UploadModal from './components/UploadModal';
import UnsplashModal from './components/UnsplashModal';
import FolderNavigation from './components/FolderNavigation';
import ViewControls from './components/ViewControls';
import StorageIndicator from './components/StorageIndicator';
import BulkActions from './components/BulkActions';
import MediaViewer from './components/MediaViewer';

const MediaLibrary = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Media library state
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid, list, detailed
  const [sortBy, setSortBy] = useState('date'); // date, name, size, usage
  const [sortOrder, setSortOrder] = useState('desc'); // asc, desc
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [currentFolder, setCurrentFolder] = useState('root');
  const [folders, setFolders] = useState([]);
  
  // Filter state
  const [filters, setFilters] = useState({
    fileType: 'all', // all, image, video, document
    dateRange: 'all', // all, today, week, month, custom
    platform: 'all', // all, facebook, twitter, instagram, etc.
    tags: [],
    customDateRange: { start: '', end: '' }
  });

  // Modal states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showUnsplashModal, setShowUnsplashModal] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showMediaViewer, setShowMediaViewer] = useState(false);
  const [viewerMediaId, setViewerMediaId] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    loadMediaLibrary();
  }, [currentFolder, filters, sortBy, sortOrder, searchQuery]);

  const loadMediaLibrary = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockMedia = [
        {
          id: '1',
          name: 'campaign-hero-image.jpg',
          type: 'image',
          size: 2457600, // 2.4MB
          url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop',
          uploadDate: '2025-01-03T10:30:00Z',
          folder: 'campaigns',
          tags: ['campaign', 'hero', 'marketing'],
          usageCount: 15,
          platforms: ['facebook', 'twitter', 'linkedin'],
          dimensions: { width: 1920, height: 1080 }
        },
        {
          id: '2',
          name: 'team-meeting-video.mp4',
          type: 'video',
          size: 45678900, // 45MB
          url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=300&h=200&fit=crop',
          uploadDate: '2025-01-02T14:15:00Z',
          folder: 'team',
          tags: ['team', 'meeting', 'corporate'],
          usageCount: 8,
          platforms: ['linkedin', 'youtube'],
          duration: 120, // seconds
          dimensions: { width: 1280, height: 720 }
        },
        {
          id: '3',
          name: 'product-showcase.png',
          type: 'image',
          size: 1234567, // 1.2MB
          url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
          uploadDate: '2025-01-01T09:45:00Z',
          folder: 'products',
          tags: ['product', 'showcase', 'analytics'],
          usageCount: 22,
          platforms: ['facebook', 'instagram', 'twitter'],
          dimensions: { width: 1600, height: 900 }
        }
      ];

      // Apply filters and search
      let filteredMedia = mockMedia?.filter(item => {
        // Search filter
        if (searchQuery && !item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) &&
            !item?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))) {
          return false;
        }
        
        // File type filter
        if (filters?.fileType !== 'all' && item?.type !== filters?.fileType) {
          return false;
        }
        
        // Folder filter
        if (currentFolder !== 'root' && item?.folder !== currentFolder) {
          return false;
        }
        
        return true;
      });

      // Apply sorting
      filteredMedia?.sort((a, b) => {
        let aValue, bValue;
        
        switch (sortBy) {
          case 'name':
            aValue = a?.name?.toLowerCase();
            bValue = b?.name?.toLowerCase();
            break;
          case 'size':
            aValue = a?.size;
            bValue = b?.size;
            break;
          case 'usage':
            aValue = a?.usageCount;
            bValue = b?.usageCount;
            break;
          default: // date
            aValue = new Date(a.uploadDate);
            bValue = new Date(b.uploadDate);
        }
        
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      setMedia(filteredMedia);
      setLoading(false);
    }, 1000);
  };

  const handleMediaSelect = (mediaId, selected) => {
    setSelectedMedia(prev => 
      selected 
        ? [...prev, mediaId]
        : prev?.filter(id => id !== mediaId)
    );
  };

  const handleBulkSelect = (selectAll) => {
    setSelectedMedia(selectAll ? media?.map(item => item?.id) : []);
  };

  const handleMediaUpload = (uploadedFiles) => {
    console.log('Media uploaded:', uploadedFiles);
    loadMediaLibrary();
    setShowUploadModal(false);
  };

  const handleUnsplashImport = (importedImages) => {
    console.log('Images imported from Unsplash:', importedImages);
    loadMediaLibrary();
    setShowUnsplashModal(false);
  };

  const handleCreateFolder = (folderName) => {
    console.log('Creating folder:', folderName);
    setFolders(prev => [...prev, { id: Date.now(), name: folderName, itemCount: 0 }]);
    setShowCreateFolder(false);
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} on items:`, selectedMedia);
    setSelectedMedia([]);
    loadMediaLibrary();
  };

  const handleMediaView = (mediaId) => {
    setViewerMediaId(mediaId);
    setShowMediaViewer(true);
  };

  const handleMediaDelete = (mediaId) => {
    if (confirm('Are you sure you want to delete this media file?')) {
      console.log('Deleting media:', mediaId);
      loadMediaLibrary();
    }
  };

  const handleMediaTag = (mediaId, tags) => {
    console.log('Tagging media:', mediaId, tags);
    loadMediaLibrary();
  };

  const handleMediaMove = (mediaId, targetFolder) => {
    console.log('Moving media:', mediaId, 'to folder:', targetFolder);
    loadMediaLibrary();
  };

  return (
    <div className="min-h-screen bg-background">
      <PrimarySidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div className={`transition-all duration-300 ${
        isMobile ? 'ml-0' : sidebarCollapsed ? 'ml-16' : 'ml-60'
      }`}>
        <NavigationHeader />
        
        <main className="p-6">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
              <p className="text-muted-foreground mt-1">
                Centralized storage for photos, videos, and digital assets
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <StorageIndicator />
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Primary Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <span className="text-sm">+</span>
                Upload Media
              </button>
              <button
                onClick={() => setShowUnsplashModal(true)}
                className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-2"
              >
                <span className="text-sm">🔍</span>
                Unsplash
              </button>
              <button
                onClick={() => setShowCreateFolder(true)}
                className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-2"
              >
                <span className="text-sm">📁</span>
                New Folder
              </button>
            </div>

            {/* View Controls */}
            <ViewControls
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
            />
          </div>

          {/* Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Filters & Navigation */}
            <div className="lg:col-span-1 space-y-6">
              <FolderNavigation
                currentFolder={currentFolder}
                onFolderChange={setCurrentFolder}
                folders={folders}
              />
              
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Bulk Actions */}
              {selectedMedia?.length > 0 && (
                <BulkActions
                  selectedCount={selectedMedia?.length}
                  onBulkAction={handleBulkAction}
                  onClearSelection={() => setSelectedMedia([])}
                />
              )}

              {/* Media Grid */}
              <MediaGrid
                media={media}
                loading={loading}
                viewMode={viewMode}
                selectedMedia={selectedMedia}
                onMediaSelect={handleMediaSelect}
                onBulkSelect={handleBulkSelect}
                onMediaView={handleMediaView}
                onMediaDelete={handleMediaDelete}
                onMediaTag={handleMediaTag}
                onMediaMove={handleMediaMove}
              />
            </div>
          </div>
        </main>
      </div>
      {/* Modals */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={handleMediaUpload}
        />
      )}
      {showUnsplashModal && (
        <UnsplashModal
          onClose={() => setShowUnsplashModal(false)}
          onImport={handleUnsplashImport}
        />
      )}
      {showMediaViewer && viewerMediaId && (
        <MediaViewer
          mediaId={viewerMediaId}
          media={media}
          onClose={() => setShowMediaViewer(false)}
          onNext={(nextId) => setViewerMediaId(nextId)}
          onPrev={(prevId) => setViewerMediaId(prevId)}
        />
      )}
    </div>
  );
};

export default MediaLibrary;