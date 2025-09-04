import React, { useState, useRef, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const UploadModal = ({ onClose, onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [selectedFolder, setSelectedFolder] = useState('root');
  const [tags, setTags] = useState('');
  const fileInputRef = useRef(null);

  const folderOptions = [
    { value: 'root', label: 'Root' },
    { value: 'campaigns', label: 'Campaigns' },
    { value: 'products', label: 'Products' },
    { value: 'team', label: 'Team Photos' },
    { value: 'archive', label: 'Archive' }
  ];

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileType = (file) => {
    if (file?.type?.startsWith('image/')) return 'image';
    if (file?.type?.startsWith('video/')) return 'video';
    return 'document';
  };

  const handleDrag = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files?.filter(file => {
      // Basic file validation
      const maxSize = 50 * 1024 * 1024; // 50MB
      const allowedTypes = ['image/', 'video/', 'application/pdf'];
      
      return file?.size <= maxSize && allowedTypes?.some(type => file?.type?.startsWith(type));
    });

    const newFiles = validFiles?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file?.name,
      size: file?.size,
      type: getFileType(file),
      status: 'pending'
    }));

    setUploadFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setUploadFiles(prev => prev?.filter(f => f?.id !== fileId));
  };

  const handleUpload = async () => {
    if (uploadFiles?.length === 0) return;

    setUploading(true);
    const progressMap = {};

    // Simulate upload progress for each file
    for (const file of uploadFiles) {
      progressMap[file.id] = 0;
      setUploadProgress({ ...progressMap });

      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        progressMap[file.id] += Math.random() * 30;
        if (progressMap?.[file?.id] >= 100) {
          progressMap[file.id] = 100;
          clearInterval(uploadInterval);
        }
        setUploadProgress({ ...progressMap });
      }, 200);

      // Simulate upload completion after 3 seconds
      setTimeout(() => {
        progressMap[file.id] = 100;
        setUploadProgress({ ...progressMap });
        clearInterval(uploadInterval);
      }, 3000);
    }

    // Complete upload after all files are done
    setTimeout(() => {
      const uploadedFiles = uploadFiles?.map(file => ({
        id: file?.id,
        name: file?.name,
        type: file?.type,
        size: file?.size,
        folder: selectedFolder,
        tags: tags?.split(',')?.map(tag => tag?.trim())?.filter(Boolean),
        url: URL.createObjectURL(file?.file), // In real app, this would be the server URL
        uploadDate: new Date()?.toISOString()
      }));

      onUpload(uploadedFiles);
      setUploading(false);
    }, 3500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Upload Media</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors mb-6 ${
              dragActive
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-primary/5'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Drop files here or click to browse
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Support for images, videos, and documents up to 50MB
            </p>
            <Button
              onClick={() => fileInputRef?.current?.click()}
              variant="outline"
              iconName="FolderOpen"
              iconPosition="left"
            >
              Browse Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,.pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Upload Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Upload to Folder
              </label>
              <Select
                value={selectedFolder}
                onChange={setSelectedFolder}
                options={folderOptions}
                placeholder="Select folder"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tags (optional)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e?.target?.value)}
                placeholder="campaign, hero, marketing"
                className="w-full px-3 py-2 border border-border rounded-lg text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Separate multiple tags with commas
              </p>
            </div>
          </div>

          {/* File List */}
          {uploadFiles?.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">
                Files to Upload ({uploadFiles?.length})
              </h4>
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {uploadFiles?.map((file) => (
                  <div
                    key={file?.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <Icon
                        name={file?.type === 'image' ? 'Image' : file?.type === 'video' ? 'Video' : 'File'}
                        size={16}
                        className="text-muted-foreground flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {file?.name}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{formatFileSize(file?.size)}</span>
                          <span>•</span>
                          <span className="capitalize">{file?.type}</span>
                        </div>
                      </div>
                    </div>

                    {/* Upload Progress */}
                    {uploading && uploadProgress?.[file?.id] !== undefined && (
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${uploadProgress?.[file?.id]}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-8">
                          {Math.round(uploadProgress?.[file?.id])}%
                        </span>
                      </div>
                    )}

                    {/* Remove Button */}
                    {!uploading && (
                      <button
                        onClick={() => removeFile(file?.id)}
                        className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {uploadFiles?.length > 0 && !uploading && (
              <span>{uploadFiles?.length} file{uploadFiles?.length !== 1 ? 's' : ''} ready to upload</span>
            )}
            {uploading && (
              <span>Uploading files...</span>
            )}
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} disabled={uploading}>
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={uploadFiles?.length === 0 || uploading}
              loading={uploading}
              iconName="Upload"
              iconPosition="left"
            >
              Upload {uploadFiles?.length > 0 && `(${uploadFiles?.length})`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;