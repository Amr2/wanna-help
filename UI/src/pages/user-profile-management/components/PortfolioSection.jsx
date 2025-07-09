import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PortfolioSection = ({ user, onSave }) => {
  const [portfolioItems, setPortfolioItems] = useState(user.portfolio || []);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    category: '',
    images: [],
    link: '',
    completedDate: ''
  });

  const categories = [
    'Web Development', 'Mobile App', 'Design', 'Writing', 'Photography',
    'Video', 'Marketing', 'Consulting', 'Other'
  ];

  const handleAddItem = () => {
    if (newItem.title.trim()) {
      const item = {
        ...newItem,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      setPortfolioItems(prev => [...prev, item]);
      setNewItem({
        title: '',
        description: '',
        category: '',
        images: [],
        link: '',
        completedDate: ''
      });
      setShowAddForm(false);
    }
  };

  const handleRemoveItem = (itemId) => {
    setPortfolioItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setNewItem(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave({ portfolio: portfolioItems });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving portfolio:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-surface rounded-xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary font-heading">
          Portfolio & Work Samples
        </h2>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsEditing(false);
                setShowAddForm(false);
              }}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              loading={isSaving}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Add New Item Form */}
      {isEditing && showAddForm && (
        <div className="mb-6 p-4 border border-border rounded-lg bg-surface-hover">
          <h3 className="text-lg font-medium text-text-primary mb-4">
            Add New Portfolio Item
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Project Title *
              </label>
              <Input
                type="text"
                value={newItem.title}
                onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter project title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Category
              </label>
              <select
                value={newItem.category}
                onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Description
              </label>
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the project, your role, and key achievements..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary placeholder-text-muted bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Project Link
              </label>
              <Input
                type="url"
                value={newItem.link}
                onChange={(e) => setNewItem(prev => ({ ...prev, link: e.target.value }))}
                placeholder="https://project-url.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Completion Date
              </label>
              <Input
                type="date"
                value={newItem.completedDate}
                onChange={(e) => setNewItem(prev => ({ ...prev, completedDate: e.target.value }))}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Project Images
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="portfolio-images"
                />
                <label
                  htmlFor="portfolio-images"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Icon name="Upload" size={24} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    Click to upload images or drag and drop
                  </span>
                </label>
                {newItem.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {newItem.images.map((image, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setNewItem(prev => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index)
                          }))}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-error text-error-foreground rounded-full flex items-center justify-center text-xs"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddItem}
              disabled={!newItem.title.trim()}
            >
              Add Item
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Add New Button */}
      {isEditing && !showAddForm && (
        <div className="mb-6">
          <Button
            variant="outline"
            iconName="Plus"
            onClick={() => setShowAddForm(true)}
          >
            Add Portfolio Item
          </Button>
        </div>
      )}

      {/* Portfolio Grid */}
      {portfolioItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="bg-surface-hover rounded-lg overflow-hidden card-shadow hover:shadow-md transition-shadow duration-200"
            >
              {/* Image */}
              <div className="aspect-video bg-secondary-100 relative overflow-hidden">
                {item.images && item.images.length > 0 ? (
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="Image" size={32} className="text-text-muted" />
                  </div>
                )}
                
                {/* Category Badge */}
                {item.category && (
                  <span className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                    {item.category}
                  </span>
                )}

                {/* Edit/Delete Actions */}
                {isEditing && (
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="w-8 h-8 bg-surface text-text-primary rounded-full flex items-center justify-center hover:bg-surface-hover transition-colors duration-200"
                      title="View details"
                    >
                      <Icon name="Eye" size={16} />
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="w-8 h-8 bg-error text-error-foreground rounded-full flex items-center justify-center hover:bg-error-700 transition-colors duration-200"
                      title="Remove item"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-medium text-text-primary mb-2 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-600 transition-colors duration-200"
                        title="View project"
                      >
                        <Icon name="ExternalLink" size={16} />
                      </a>
                    )}
                    {item.images && item.images.length > 1 && (
                      <span className="text-xs text-text-secondary">
                        +{item.images.length - 1} more
                      </span>
                    )}
                  </div>
                  
                  {item.completedDate && (
                    <span className="text-xs text-text-secondary">
                      {new Date(item.completedDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon name="Briefcase" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            No Portfolio Items Yet
          </h3>
          <p className="text-text-secondary mb-4">
            Showcase your work to build trust with potential clients
          </p>
          {isEditing && (
            <Button
              variant="primary"
              iconName="Plus"
              onClick={() => setShowAddForm(true)}
            >
              Add Your First Project
            </Button>
          )}
        </div>
      )}

      {/* Portfolio Item Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-1050">
          <div className="bg-surface rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-text-primary">
                  {selectedItem.title}
                </h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 bg-secondary-100 text-text-secondary rounded-full flex items-center justify-center hover:bg-secondary-200 transition-colors duration-200"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
              
              {selectedItem.images && selectedItem.images.length > 0 && (
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    {selectedItem.images.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`${selectedItem.title} ${index + 1}`}
                        className="w-full aspect-video object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                {selectedItem.category && (
                  <div>
                    <span className="text-sm font-medium text-text-primary">Category: </span>
                    <span className="text-sm text-text-secondary">{selectedItem.category}</span>
                  </div>
                )}
                
                {selectedItem.description && (
                  <div>
                    <span className="text-sm font-medium text-text-primary">Description: </span>
                    <p className="text-sm text-text-secondary mt-1">{selectedItem.description}</p>
                  </div>
                )}
                
                {selectedItem.link && (
                  <div>
                    <span className="text-sm font-medium text-text-primary">Project Link: </span>
                    <a
                      href={selectedItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:text-primary-600 transition-colors duration-200"
                    >
                      View Project
                    </a>
                  </div>
                )}
                
                {selectedItem.completedDate && (
                  <div>
                    <span className="text-sm font-medium text-text-primary">Completed: </span>
                    <span className="text-sm text-text-secondary">
                      {new Date(selectedItem.completedDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioSection;