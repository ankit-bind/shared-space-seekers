
import React from 'react';

interface ListingGalleryProps {
  images: string[];
  title: string;
  selectedImage: string;
  onImageSelect: (image: string) => void;
}

export const ListingGallery = ({ 
  images, 
  title, 
  selectedImage, 
  onImageSelect 
}: ListingGalleryProps) => {
  return (
    <div className="mb-8">
      <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 mb-2">
        <img 
          src={selectedImage} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button 
              key={index} 
              onClick={() => onImageSelect(image)}
              className={`h-16 w-24 flex-shrink-0 rounded-md overflow-hidden ${
                selectedImage === image ? "ring-2 ring-primary" : ""
              }`}
            >
              <img 
                src={image} 
                alt={`View ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
