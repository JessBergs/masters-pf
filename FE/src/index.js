import React from 'react';
import ReactDOM from 'react-dom';
import IndexPage from './components/IndexPage.jsx';
import * as serviceWorker from './serviceWorker.js';

ReactDOM.render(<IndexPage />, document.getElementById('root'));

serviceWorker.unregister();
