import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import WikiContainer from './components/WikiContainer.jsx';
import * as serviceWorker from './serviceWorker.js';

ReactDOM.render(<WikiContainer />, document.getElementById('root'));

serviceWorker.unregister();

