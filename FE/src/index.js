import React from 'react';
import ReactDOM from 'react-dom';
import IndexPage from './components/IndexPage.jsx';
import ProjectPage from './components/ProjectPage.jsx'
import * as serviceWorker from './serviceWorker.js';

ReactDOM.render(<ProjectPage id={0} />, document.getElementById('root'));

serviceWorker.unregister();
