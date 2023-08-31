# React homework template

This project was created with
[Create React App](https://github.com/facebook/create-react-app). To get
acquainted and configure additional features
[refer to documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## Image search

Write a keyword image search application. <br> Create components Searchbar,
ImageGallery, ImageGalleryItem, Loader, Button and Modal. Ready styles of
components can be taken in file styles.css and tweak them if needed.

### Pixabay API instructions

For HTTP requests, use a public image search service Pixabay. Register and get a
private access key.

The URL string of the HTTP request.

Pixabay API supports pagination, by default the page parameter is set to 1. Let
the response comes with 12 objects each, set to per_page. Don't Remember that
when you search for a new keyword, you have to reset the value of page to 1.

The response from the api comes an array of objects in which you are only
interested in the following properties.

<ul>
<li>id - a unique identifier</li>
<li>webformatURL - link to the small image for the list of cards</li>
<li>largeImageURL - link to the large image for the modal window</li>
<ul>

### Description of the component Searchbar

The component takes one prop onSubmit - a function to pass the value of the iput
When the form is submitted.

### Description of the ImageGallery component

A list of image cards.

### Description of the component ImageGalleryItem

A list item component with an image.

### Description of the Button component

Pressing the Load more button should load the next batch of Images and rendered
with the previous ones. The button should be rendered only when there are some
loaded images. If the image array is empty, the button is not rendered.

### Description of the Loader component

Spinner component, displays while images are being loaded. Use any ready made
component, e.g. react-loader-spinner.

### Description of the component Modal

When you click on a gallery item a modal window with a dark overlay and display
a larger version of the image. The modal window should be closed.

The appearance is similar to the functionality of this VanillaJS-plugin, only
instead of white modal window the image is rendered (in the example press Run).
Animation is not required.
