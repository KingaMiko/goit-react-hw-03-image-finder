import React, { Component } from 'react';

class Searchbar extends Component {
  state = {
    query: '',
    isActiveSearchButton: true,
  };

  handleInputChange = e => {
    this.setState({ query: e.target.value }, () => {
      if (!this.state.isActiveSearchButton) {
        this.props.onSubmit(this.state.query);
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.isActiveSearchButton) {
      this.props.onSubmit(this.state.query);
      this.setState({ query: '' });
    }
  };

  toggleSearchMode = () => {
    this.setState(prevState => ({
      isActiveSearchButton: !prevState.isActiveSearchButton,
    }));
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button
            type="submit"
            className="SearchForm-button"
            disabled={!this.state.isActiveSearchButton}
          >
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleInputChange}
          />
          <button type="button" onClick={this.toggleSearchMode}>
            Toggle Search Mode
          </button>
        </form>
      </header>
    );
  }
}

export default Searchbar;
