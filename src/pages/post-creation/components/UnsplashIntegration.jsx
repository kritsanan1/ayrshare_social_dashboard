import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UnsplashIntegration = ({ onImageSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Mock Unsplash images data
  const mockImages = [
    {
      id: '1',
      urls: {
        small: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
        regular: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop'
      },
      user: { name: 'John Doe', username: 'johndoe' },
      description: 'Social media marketing concept',
      alt_description: 'Person using smartphone for social media'
    },
    {
      id: '2',
      urls: {
        small: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
        regular: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop'
      },
      user: { name: 'Jane Smith', username: 'janesmith' },
      description: 'Digital marketing workspace',
      alt_description: 'Laptop with social media analytics'
    },
    {
      id: '3',
      urls: {
        small: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop',
        regular: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop'
      },
      user: { name: 'Mike Johnson', username: 'mikej' },
      description: 'Content creation setup',
      alt_description: 'Creative workspace with camera and laptop'
    },
    {
      id: '4',
      urls: {
        small: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        regular: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
      },
      user: { name: 'Sarah Wilson', username: 'sarahw' },
      description: 'Business analytics dashboard',
      alt_description: 'Charts and graphs on computer screen'
    },
    {
      id: '5',
      urls: {
        small: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop',
        regular: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=600&fit=crop'
      },
      user: { name: 'Alex Chen', username: 'alexc' },
      description: 'Team collaboration meeting',
      alt_description: 'People working together on project'
    },
    {
      id: '6',
      urls: {
        small: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
        regular: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop'
      },
      user: { name: 'Emma Davis', username: 'emmad' },
      description: 'Modern office workspace',
      alt_description: 'Clean desk with laptop and plants'
    }
  ];

  useEffect(() => {
    // Load default images on component mount
    setImages(mockImages);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery?.trim()) return;
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Filter mock images based on search query
      const filteredImages = mockImages?.filter(img => 
        img?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        img?.alt_description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      
      setImages(filteredImages?.length > 0 ? filteredImages : mockImages);
      setLoading(false);
    }, 1000);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleImageSelect = () => {
    if (selectedImage) {
      const mediaItem = {
        id: Date.now(),
        type: 'image',
        name: `unsplash-${selectedImage?.id}.jpg`,
        url: selectedImage?.urls?.regular,
        source: 'unsplash',
        attribution: {
          photographer: selectedImage?.user?.name,
          username: selectedImage?.user?.username,
          platform: 'Unsplash'
        }
      };
      
      onImageSelect(mediaItem);
      setSelectedImage(null);
    }
  };

  const popularSearches = ['business', 'technology', 'marketing', 'team', 'office', 'creative', 'success', 'growth'];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Search" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Unsplash Images</h3>
        </div>
        <div className="text-xs text-muted-foreground">
          Free high-quality photos
        </div>
      </div>
      {/* Search Bar */}
      <div className="flex space-x-2 mb-4">
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
      <div className="mb-4">
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
      {!loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto scrollbar-thin">
          {images?.map((image) => (
            <div
              key={image?.id}
              className={`relative group cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ${
                selectedImage?.id === image?.id
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' :'hover:scale-105'
              }`}
              onClick={() => handleImageClick(image)}
            >
              <div className="aspect-video">
                <Image
                  src={image?.urls?.small}
                  alt={image?.alt_description}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Icon name="Plus" size={24} className="text-white" />
                </div>
              </div>

              {/* Attribution */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <p className="text-xs text-white font-medium">
                  by {image?.user?.name}
                </p>
              </div>

              {/* Selected Indicator */}
              {selectedImage?.id === image?.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={16} className="text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Selected Image Actions */}
      {selectedImage && (
        <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded overflow-hidden">
                <Image
                  src={selectedImage?.urls?.small}
                  alt={selectedImage?.alt_description}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {selectedImage?.description || 'Selected image'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Photo by {selectedImage?.user?.name} on Unsplash
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedImage(null)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleImageSelect}
                iconName="Plus"
                iconPosition="left"
              >
                Add Image
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Attribution Notice */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">Attribution Required</p>
            <p className="text-xs text-muted-foreground mt-1">
              When using Unsplash images, photographer attribution will be automatically included in your posts to comply with Unsplash license terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnsplashIntegration;