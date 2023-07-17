import React from 'react';
import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, onClick }) => (
  <li className={style['gallery-item']} onClick={onClick}>
    <img src={src} alt="" />
  </li>
);

export default ImageGalleryItem;
