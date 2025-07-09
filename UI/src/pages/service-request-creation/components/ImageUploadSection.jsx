import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ImageUploadSection = ({ images, onImagesChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const maxImages = 5;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const remainingSlots = maxImages - images.length;
    const filesToAdd = fileArray.slice(0, remainingSlots);

    filesToAdd.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage = {
            id: Date.now() + Math.random(),
            file: file,
            preview: e.target.result,
            name: file.name,
            size: file.size
          };
          onImagesChange([...images, newImage]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (imageId) => {
    onImagesChange(images.filter(img => img.id !== imageId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-text-primary mb-2">
          Add photos (optional)
        </h2>
        <p className="text-text-secondary">
          Photos help providers understand your needs better and provide more accurate quotes
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
          ${dragActive 
            ? 'border-primary bg-primary-50' :'border-border bg-surface hover:border-primary-200 hover:bg-primary-50/50'
          }
          ${images.length >= maxImages ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={images.length >= maxImages}
        />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary-100 rounded-full">
              <Icon name="Upload" size={32} className="text-primary" />
            </div>
          </div>
          
          <div>
            <p className="text-lg font-medium text-text-primary mb-2">
              {images.length >= maxImages 
                ? `Maximum ${maxImages} images reached`
                : 'Drop your images here, or click to browse'
              }
            </p>
            <p className="text-sm text-text-secondary">
              Supports: JPG, PNG, GIF up to 10MB each
            </p>
            <p className="text-xs text-text-muted mt-1">
              {images.length}/{maxImages} images uploaded
            </p>
          </div>
        </div>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text-primary">
            Uploaded Images ({images.length})
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-secondary-100">
                  <Image
                    src={image.preview}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => removeImage(image.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-error-700"
                  title="Remove image"
                >
                  <Icon name="X" size={14} />
                </button>
                
                {/* Image Info */}
                <div className="mt-2">
                  <p className="text-xs text-text-secondary truncate" title={image.name}>
                    {image.name}
                  </p>
                  <p className="text-xs text-text-muted">
                    {formatFileSize(image.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Lightbulb" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-accent-700 mb-2">
              Photo Tips for Better Results
            </h4>
            <ul className="text-sm text-accent-600 space-y-1">
              <li>• Show the current state or problem area clearly</li>
              <li>• Include multiple angles if relevant</li>
              <li>• Ensure good lighting for clear visibility</li>
              <li>• Include reference objects for scale when helpful</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadSection;