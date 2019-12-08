import React from 'react';
import Routing from './Routing.jsx';
import * as serviceWorker from './serviceWorker.js';
import { hydrate, render } from "react-dom";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<Routing />, rootElement);
} else {
  render(<Routing />, rootElement);
}

serviceWorker.unregister();


