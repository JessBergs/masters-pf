import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './Routing.jsx';
import * as serviceWorker from './serviceWorker.js';

ReactDOM.render(<Routing />, document.getElementById('root'));

serviceWorker.unregister();
