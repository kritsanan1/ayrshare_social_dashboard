import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const UnsplashModal = ({ onClose, onImport }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);

  // Mock Unsplash images
  const mockImages = [
    {
      id: 'unsplash-1',
      urls: {
        small: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
        regular: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop'
      },
      user: { name: 'John Doe', username: 'johndoe' },
      description: 'Social media marketing concept',
      alt_description: 'Person using smartphone for social media'
    },
    {
      id: 'unsplash-2',
      urls: {
        small: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
        regular: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop'
      },
      user: { name: 'Jane Smith', username: 'janesmith' },
      description: 'Digital marketing workspace',
      alt_description: 'Laptop with social media analytics'
    },
    {
      id: 'unsplash-3',
      urls: {
        small: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop',
        regular: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop'
      },
      user: { name: 'Mike Johnson', username: 'mikej' },
      description: 'Content creation setup',
      alt_description: 'Creative workspace with camera and laptop'
    },
    {
      id: 'unsplash-4',
      urls: {
        small: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        regular: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
      },
      user: { name: 'Sarah Wilson', username: 'sarahw' },
      description: 'Business analytics dashboard',
      alt_description: 'Charts and graphs on computer screen'
    },
    {
      id: 'unsplash-5',
      urls: {
        small: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop',
        regular: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=600&fit=crop'
      },
      user: { name: 'Alex Chen', username: 'alexc' },
      description: 'Team collaboration meeting',
      alt_description: 'People working together on project'
    },
    {
      id: 'unsplash-6',
      urls: {
        small: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
        regular: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop'
      },
      user: { name: 'Emma Davis', username: 'emmad' },
      description: 'Modern office workspace',
      alt_description: 'Clean desk with laptop and plants'
    }
  ];

  const popularSearches = [
    'business', 'technology', 'marketing', 'team', 'office', 'creative', 'success', 'growth',
    'social media', 'workspace', 'collaboration', 'innovation', 'startup', 'meeting'
  ];

  useEffect(() => {
    // Load default images
    setImages(mockImages);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery?.trim()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filteredImages = mockImages?.filter(img => 
        img?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        img?.alt_description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      
      setImages(filteredImages?.length > 0 ? filteredImages : mockImages);
      setLoading(false);
    }, 1000);
  };

  const handleImageSelect = (imageId, selected) => {
    setSelectedImages(prev => 
      selected 
        ? [...prev, imageId]
        : prev?.filter(id => id !== imageId)
    );
  };

  const handleBulkSelect = (selectAll) => {
    setSelectedImages(selectAll ? images?.map(img => img?.id) : []);
  };

  const handleImport = async () => {
    if (selectedImages?.length === 0) return;

    setImporting(true);
    
    // Simulate import process
    setTimeout(() => {
      const importedImages = images?.filter(img => selectedImages?.includes(img?.id))?.map(img => ({
          id: `imported-${Date.now()}-${Math.random()}`,
          name: `unsplash-${img?.id}.jpg`,
          type: 'image',
          size: Math.floor(Math.random() * 2000000) + 1000000, // Random size 1-3MB
          url: img?.urls?.regular,
          thumbnail: img?.urls?.small,
          folder: 'unsplash',
          source: 'unsplash',
          attribution: {
            photographer: img?.user?.name,
            username: img?.user?.username,
            platform: 'Unsplash'
          },
          tags: ['unsplash', 'stock', img?.description?.split(' ')?.slice(0, 2)]?.flat()?.filter(Boolean),
          uploadDate: new Date()?.toISOString(),
          usageCount: 0,
          platforms: []
        }));

      onImport(importedImages);
      setImporting(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg border border-border w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Search" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">Import from Unsplash</h2>
              <p className="text-sm text-muted-foreground">Free high-quality photos for your projects</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Search Section */}
        <div className="p-6 border-b border-border">
          <div className="flex space-x-3 mb-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search for images (e.g., business, technology, marketing...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                onKeyPress={(e) => e?.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button
              onClick={handleSearch}
              loading={loading}
              iconName="Search"
              iconPosition="left"
            >
              Search
            </Button>
          </div>

          {/* Popular Searches */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {popularSearches?.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    setTimeout(handleSearch, 100);
                  }}
                  className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {/* Selection Header */}
          <div className="flex items-center justify-between p-6 border-b border-border bg-muted/20">
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={selectedImages?.length === images?.length && images?.length > 0}
                indeterminate={selectedImages?.length > 0 && selectedImages?.length < images?.length}
                onChange={handleBulkSelect}
              />
              <span className="text-sm text-muted-foreground">
                {selectedImages?.length > 0 
                  ? `${selectedImages?.length} selected` 
                  : `${images?.length} images available`
                }
              </span>
            </div>
            
            {selectedImages?.length > 0 && (
              <button
                onClick={() => handleBulkSelect(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear Selection
              </button>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Icon name="Loader2" size={32} className="text-primary animate-spin mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Searching for images...</p>
              </div>
            </div>
          )}

          {/* Images Grid */}
          {!loading && images?.length > 0 && (
            <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images?.map((image) => (
                <div
                  key={image?.id}
                  className={`group relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ${
                    selectedImages?.includes(image?.id)
                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' :'hover:scale-105'
                  }`}
                  onClick={() => handleImageSelect(image?.id, !selectedImages?.includes(image?.id))}
                >
                  <div className="aspect-video">
                    <Image
                      src={image?.urls?.small}
                      alt={image?.alt_description}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Selection Checkbox */}
                  <div className="absolute top-2 left-2">
                    <div className="p-1 bg-background/80 rounded">
                      <Checkbox
                        checked={selectedImages?.includes(image?.id)}
                        onChange={(checked) => handleImageSelect(image?.id, checked)}
                        onClick={(e) => e?.stopPropagation()}
                      />
                    </div>
                  </div>

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Icon name="Plus" size={24} className="text-white" />
                    </div>
                  </div>

                  {/* Attribution */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-xs text-white font-medium truncate">
                      by {image?.user?.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && images?.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No images found</h3>
              <p className="text-muted-foreground">Try searching with different keywords</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {selectedImages?.length > 0 && !importing && (
              <span>{selectedImages?.length} image{selectedImages?.length !== 1 ? 's' : ''} selected for import</span>
            )}
            {importing && (
              <span>Importing images to your library...</span>
            )}
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} disabled={importing}>
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={selectedImages?.length === 0 || importing}
              loading={importing}
              iconName="Download"
              iconPosition="left"
            >
              Import {selectedImages?.length > 0 && `(${selectedImages?.length})`}
            </Button>
          </div>
        </div>

        {/* Attribution Notice */}
        <div className="px-6 pb-6">
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm text-foreground font-medium">Attribution Required</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Photographer attribution will be automatically included to comply with Unsplash license terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnsplashModal;