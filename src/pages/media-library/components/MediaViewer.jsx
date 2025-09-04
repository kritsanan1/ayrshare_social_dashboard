import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MediaViewer = ({
  mediaId,
  media,
  onClose,
  onNext,
  onPrev
}) => {
  const [currentMedia, setCurrentMedia] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const index = media?.findIndex(item => item?.id === mediaId);
    if (index !== -1) {
      setCurrentMedia(media?.[index]);
      setCurrentIndex(index);
    }
  }, [mediaId, media]);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % media?.length;
    const nextMedia = media?.[nextIndex];
    setCurrentMedia(nextMedia);
    setCurrentIndex(nextIndex);
    onNext(nextMedia?.id);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? media?.length - 1 : currentIndex - 1;
    const prevMedia = media?.[prevIndex];
    setCurrentMedia(prevMedia);
    setCurrentIndex(prevIndex);
    onPrev(prevMedia?.id);
  };

  const handleKeyDown = (e) => {
    switch (e?.key) {
      case 'ArrowRight':
        handleNext();
        break;
      case 'ArrowLeft':
        handlePrev();
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  if (!currentMedia) return null;

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'facebook': return '📘';
      case 'twitter': return '🐦';
      case 'instagram': return '📸';
      case 'linkedin': return '💼';
      case 'youtube': return '📺';
      default: return '📱';
    }
  };

  const handleDownload = () => {
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = currentMedia?.url;
    link.download = currentMedia?.name;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const handleEdit = () => {
    console.log('Edit media:', currentMedia?.id);
    // Open media editor
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this media file?')) {
      console.log('Delete media:', currentMedia?.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-black/50 backdrop-blur-sm border-b border-white/10 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-white font-medium truncate max-w-md">
              {currentMedia?.name}
            </h3>
            <span className="text-white/60 text-sm">
              {currentIndex + 1} of {media?.length}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className={`p-2 rounded transition-colors ${
                showDetails ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title="Show Details"
            >
              <Icon name="Info" size={20} />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
              title="Download"
            >
              <Icon name="Download" size={20} />
            </button>
            <button
              onClick={handleEdit}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
              title="Edit"
            >
              <Icon name="Edit" size={20} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-white/70 hover:text-red-400 hover:bg-white/10 rounded transition-colors"
              title="Delete"
            >
              <Icon name="Trash2" size={20} />
            </button>
            <div className="w-px h-6 bg-white/20 mx-2" />
            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
              title="Close (Esc)"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>
      </div>
      {/* Navigation Buttons */}
      {media?.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors z-10"
            title="Previous (←)"
          >
            <Icon name="ChevronLeft" size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors z-10"
            title="Next (→)"
          >
            <Icon name="ChevronRight" size={24} />
          </button>
        </>
      )}
      {/* Main Content Area */}
      <div className="flex w-full h-full pt-16">
        {/* Media Display */}
        <div className={`flex-1 flex items-center justify-center p-8 transition-all duration-300 ${
          showDetails ? 'mr-80' : ''
        }`}>
          {currentMedia?.type === 'image' ? (
            <div className="max-w-full max-h-full">
              <Image
                src={currentMedia?.url}
                alt={currentMedia?.name}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </div>
          ) : currentMedia?.type === 'video' ? (
            <video
              src={currentMedia?.url}
              controls
              className="max-w-full max-h-full rounded-lg shadow-2xl"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex flex-col items-center justify-center text-white/70">
              <Icon name="File" size={64} className="mb-4" />
              <p className="text-lg font-medium">{currentMedia?.name}</p>
              <p className="text-sm text-white/50">
                {currentMedia?.type?.toUpperCase()} • {formatFileSize(currentMedia?.size)}
              </p>
              <Button
                onClick={handleDownload}
                className="mt-4"
                iconName="Download"
                iconPosition="left"
              >
                Download
              </Button>
            </div>
          )}
        </div>

        {/* Details Panel */}
        {showDetails && (
          <div className="w-80 bg-black/50 backdrop-blur-sm border-l border-white/10 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h4 className="text-white font-semibold mb-3">File Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Name:</span>
                    <span className="text-white truncate ml-2">{currentMedia?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Type:</span>
                    <span className="text-white uppercase">{currentMedia?.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Size:</span>
                    <span className="text-white">{formatFileSize(currentMedia?.size)}</span>
                  </div>
                  {currentMedia?.dimensions && (
                    <div className="flex justify-between">
                      <span className="text-white/60">Dimensions:</span>
                      <span className="text-white">
                        {currentMedia?.dimensions?.width} × {currentMedia?.dimensions?.height}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-white/60">Uploaded:</span>
                    <span className="text-white text-right">
                      {formatDate(currentMedia?.uploadDate)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Usage Statistics */}
              <div>
                <h4 className="text-white font-semibold mb-3">Usage Statistics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Times Used:</span>
                    <span className="text-white">{currentMedia?.usageCount || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Platforms:</span>
                    <span className="text-white">{currentMedia?.platforms?.length || 0}</span>
                  </div>
                </div>

                {/* Platform List */}
                {currentMedia?.platforms?.length > 0 && (
                  <div className="mt-3">
                    <p className="text-white/60 text-xs mb-2">Used on:</p>
                    <div className="flex flex-wrap gap-2">
                      {currentMedia?.platforms?.map((platform) => (
                        <div
                          key={platform}
                          className="flex items-center space-x-1 px-2 py-1 bg-white/10 rounded text-xs text-white"
                        >
                          <span>{getPlatformIcon(platform)}</span>
                          <span className="capitalize">{platform}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              {currentMedia?.tags?.length > 0 && (
                <div>
                  <h4 className="text-white font-semibold mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentMedia?.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/10 text-white text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Attribution */}
              {currentMedia?.attribution && (
                <div>
                  <h4 className="text-white font-semibold mb-3">Attribution</h4>
                  <div className="text-sm text-white/80">
                    <p>Photo by {currentMedia?.attribution?.photographer}</p>
                    <p className="text-white/60">on {currentMedia?.attribution?.platform}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div>
                <h4 className="text-white font-semibold mb-3">Actions</h4>
                <div className="space-y-2">
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    Download
                  </Button>
                  <Button
                    onClick={handleEdit}
                    variant="outline"
                    size="sm"
                    iconName="Edit"
                    iconPosition="left"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={handleDelete}
                    variant="outline"
                    size="sm"
                    iconName="Trash2"
                    iconPosition="left"
                    className="w-full border-red-400/20 text-red-400 hover:bg-red-400/10"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Bottom Navigation Thumbnails */}
      {media?.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm border-t border-white/10 p-4">
          <div className="flex justify-center space-x-2 overflow-x-auto">
            {media?.slice(Math.max(0, currentIndex - 5), currentIndex + 6)?.map((item, index) => {
              const actualIndex = Math.max(0, currentIndex - 5) + index;
              return (
                <button
                  key={item?.id}
                  onClick={() => {
                    setCurrentMedia(item);
                    setCurrentIndex(actualIndex);
                  }}
                  className={`w-16 h-16 rounded overflow-hidden transition-all ${
                    item?.id === currentMedia?.id
                      ? 'ring-2 ring-white/50 opacity-100' :'opacity-60 hover:opacity-80'
                  }`}
                >
                  {item?.type === 'image' ? (
                    <Image
                      src={item?.thumbnail}
                      alt={item?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/10 flex items-center justify-center">
                      <Icon name="File" size={16} className="text-white/70" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaViewer;