import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import IndexPage from './components/IndexPage.jsx';
import ProjectPage from './components/ProjectPage.jsx'
import Test from './components/test.jsx'

const Routing = () =>(
<div className="routes__container">
<BrowserRouter>
<div>
        <Route exact path="/" component={IndexPage} />
        <Route path="/project/:projectId" component={ProjectPage} />
        </div>
</BrowserRouter>
</div>
);

export default Routing;