// CLIENT ENTRY POINT

// regeneratorRuntime: support for async/await
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

const renderApp = (element) => {
  render(<App />, element);
}

// Enable Hot Module Replacement (Webpack)
if (module.hot) {
  module.hot.accept()
}

document.addEventListener('DOMContentLoaded', () => {
  let rootElement = document.getElementById('app');
  if (!rootElement) { return }

  let env = process.env.NODE_ENV;
  if (env && env == 'development') {
    try {
      render(<App />, rootElement)
    }
    catch (e) {
      render(<h1>Error: {e}</h1>, rootElement);
    }
  }
  else {
    render(<App />, rootElement)
  }
})
