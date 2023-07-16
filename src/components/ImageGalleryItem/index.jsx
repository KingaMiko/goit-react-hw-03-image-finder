import React from 'react';

const ImageGalleryItem = ({ src, onClick }) => (
  <li className="gallery-item" onClick={onClick}>
    <img src={src} alt="" />
  </li>
);

export default ImageGalleryItem;
