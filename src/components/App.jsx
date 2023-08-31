import React, { Component } from 'react';
import { debounce } from 'lodash';
import { fetchImages } from 'api/api';

import Searchbar from './Searchbar/index';
import ImageGallery from './ImageGallery/index';
import Button from './Button/index';
import Loader from './Loader/index';
import Modal from './Modal/index';

class App extends Component {
  state = {
    inputValue: 'nature',
    images: [],
    loading: false,
    currentPage: 1,
    selectedImage: null,
  };

  handleSubmit = inputValue => {
    this.setState({ inputValue, images: [], currentPage: 1 }, () =>
      this.fetchImages(inputValue)
    );
  };

  handleImageClick = imageIndex => {
    if (typeof imageIndex === 'number') {
      this.setState({ selectedImageIndex: imageIndex });
    }
  };

  closeModal = () => {
    this.setState({ selectedImageIndex: null });
  };

  fetchImages = debounce(async (query = this.state.inputValue) => {
    this.setState({ loading: true });
    try {
      const newImages = await fetchImages(query, this.state.currentPage); // Zmieniono

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        currentPage: prevState.currentPage + 1,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  }, 0);

  componentDidMount() {
    this.fetchImages();

    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.closeModal();
    }
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />

        <Modal
          images={this.state.images}
          onClose={this.closeModal}
          currentIndex={this.state.selectedImageIndex}
        />

        <ImageGallery
          images={this.state.images}
          onImageClick={this.handleImageClick}
        />

        {this.state.loading ? (
          <Loader />
        ) : this.state.images.length > 0 ? (
          <Button onClick={() => this.fetchImages(this.state.lastQuery)}>
            Load more
          </Button>
        ) : !this.state.loading && this.state.images.length === 0 ? (
          <p style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
            No images found
          </p>
        ) : null}
      </div>
    );
  }
}

export default App;
