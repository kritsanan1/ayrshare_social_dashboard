import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MediaUpload = ({ media, onMediaChange, onMediaRemove }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleFiles = async (files) => {
    setUploading(true);
    const newMedia = [];

    for (let i = 0; i < files?.length; i++) {
      const file = files?.[i];
      if (file?.type?.startsWith('image/') || file?.type?.startsWith('video/')) {
        const mediaItem = {
          id: Date.now() + i,
          file,
          type: file?.type?.startsWith('image/') ? 'image' : 'video',
          name: file?.name,
          size: file?.size,
          url: URL.createObjectURL(file),
          uploadProgress: 100
        };
        newMedia?.push(mediaItem);
      }
    }

    setTimeout(() => {
      onMediaChange([...media, ...newMedia]);
      setUploading(false);
    }, 1000);
  };

  const handleFileSelect = (e) => {
    if (e?.target?.files) {
      handleFiles(e?.target?.files);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Media Upload</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Image" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {media?.length} file{media?.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {uploading ? (
          <div className="space-y-4">
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={24} className="text-primary animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Uploading files...</p>
              <p className="text-xs text-muted-foreground">Please wait while we process your media</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Icon name="Upload" size={24} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Drag and drop your files here, or{' '}
                <button
                  onClick={() => fileInputRef?.current?.click()}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  browse
                </button>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports images (JPG, PNG, GIF) and videos (MP4, MOV) up to 100MB
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Media Preview Grid */}
      {media?.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Uploaded Media</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {media?.map((item) => (
              <div key={item?.id} className="relative group">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  {item?.type === 'image' ? (
                    <Image
                      src={item?.url}
                      alt={item?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <Icon name="Play" size={32} className="text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Media Info Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      iconSize={16}
                      className="text-white hover:bg-white/20"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Trash2"
                      iconSize={16}
                      onClick={() => onMediaRemove(item?.id)}
                      className="text-white hover:bg-white/20"
                    />
                  </div>
                </div>

                {/* File Info */}
                <div className="mt-2">
                  <p className="text-xs font-medium text-foreground truncate" title={item?.name}>
                    {item?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(item?.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Upload Guidelines */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">Media Guidelines</p>
            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
              <li>• Images: Recommended 1080x1080px for best quality across platforms</li>
              <li>• Videos: Maximum 60 seconds for optimal engagement</li>
              <li>• File size: Keep under 100MB for faster upload and processing</li>
              <li>• Formats: JPG, PNG, GIF for images; MP4, MOV for videos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUpload;