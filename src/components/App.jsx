import React, { Component } from 'react';
import axios from 'axios';
import { Puff } from 'react-loader-spinner';

const API_KEY = '36836755-9f43607b903fa703cdff42e50';
const API_URL = 'https://pixabay.com/api/';

class App extends Component {
  state = {
    inputValue: '',
    images: [],
    loading: false,
    currentPage: 1,
    selectedImage: null,
    isActiveSearchButton: true,
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState(
      {
        images: [],
        currentPage: 1,
      },
      () => {
        this.fetchImages();
        this.setState({ inputValue: '' });
      }
    );
  };

  handleImageClick = imageURL => {
    this.setState({ selectedImage: imageURL });
  };

  fetchImages = async () => {
    this.setState({ loading: true });
    try {
      const response = await axios.get(
        `${API_URL}?q=${this.state.inputValue}&page=${this.state.currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      console.log(response.data.hits);
      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],
        currentPage: prevState.currentPage + 1,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.setState({ selectedImage: null });
    }
  };

  componentDidMount() {
    if (this.state.inputValue !== '') {
      this.fetchImages();
    }
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !this.state.isActiveSearchButton &&
      prevState.inputValue !== this.state.inputValue
    ) {
      this.setState({ images: [], currentPage: 1 }, () => this.fetchImages());
    }
  }

  toggleSearchMode = () => {
    this.setState(prevState => ({
      isActiveSearchButton: !prevState.isActiveSearchButton,
    }));
  };

  render() {
    return (
      <div className="App">
        <header className="searchbar">
          <form className="form" onSubmit={this.handleSubmit}>
            <button
              type="submit"
              className="button"
              disabled={!this.state.isActiveSearchButton}
            >
              <span className="button-label">Search</span>
            </button>
            <input
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.inputValue}
              onChange={this.handleInputChange}
            />
            <button type="button" onClick={this.toggleSearchMode}>
              Toggle search mode
            </button>
          </form>
        </header>

        {this.state.selectedImage && (
          <div
            className="overlay"
            onClick={() => this.setState({ selectedImage: null })}
          >
            <div className="modal">
              <img src={this.state.selectedImage} alt="Selected" />
            </div>
          </div>
        )}

        <ul className="gallery">
          {this.state.images.map(image => (
            <li
              className="gallery-item"
              key={image.id}
              onClick={() => this.handleImageClick(image.largeImageURL)}
            >
              <img src={image.webformatURL} alt="" />
            </li>
          ))}
        </ul>

        {this.state.loading ? (
          <Puff color="#00BFFF" height={100} width={100} />
        ) : this.state.images.length > 0 ? (
          <button onClick={this.fetchImages}>Load more</button>
        ) : null}
      </div>
    );
  }
}

export default App;
