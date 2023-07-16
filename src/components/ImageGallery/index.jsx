import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className="gallery">
    {images.map(image => (
      <ImageGalleryItem
        key={image.id}
        src={image.webformatURL}
        onClick={() => onImageClick(image.largeImageURL)}
      />
    ))}
  </ul>
);

export default ImageGallery;
