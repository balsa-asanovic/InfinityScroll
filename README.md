# Infinite Scroll for Images

This is the source code for an implementation of infinite scrolling for images, which uses the Intersection Observer API to trigger loading of new images when the user scrolls to the bottom of the page.

[Live Demo](https://endearing-basbousa-a73c36.netlify.app/)

## Pages, Components, and Hooks

The source code is organized as follows:

### Pages

[index](./pages/index.tsx) - Main page of the application. Here the Intersection Obeserver is used to follow whether the last loaded picture has come into view and then it triggers the increase to offset state, which causes a rerender and useImages hook is called with a new offset, providing us with a new set of images.

### Components

[Cards](./components/Card.tsx) - A component that displays an image, along with a title and text. It takes url and id of image as props, it takes a useRef reference as well so the ref could be attached to the last element loaded.

### Hooks

[useImages](./hooks/useImages.ts) - A custom hook that fetches images from an API endpoint and returns a state object containing the current list of images and booleans which indicate whether if it's sill loading, if there was an error and if there are any more images to load. It takes offset and limit as inputs and attaches the newly provided images to the ones it already had in previous state.

### Testing

[test](./tests/) - This project includes unit tests for the implementation, which can be found in the tests folder. Test files are named according to the files they are testing.

## Getting Started

To run the project locally:

1.  Clone this repository.
2.  Install dependencies by running npm install in the project root directory.
3.  Run the development server using npm run dev.
4.  Open http://localhost:3000 in your browser.
