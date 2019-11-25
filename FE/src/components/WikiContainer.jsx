import React from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import CreateAndEditArticlePage from './CreateAndEditArticlePage.jsx';
import ListArticlesPage from './ListArticlesPage.jsx';
import ViewArticlePage from './ViewArticlePage.jsx';

import '../styles/WikiContainer.scss';

const headline = 'WIKI';
const subline = 'A simple wiki system for creating and displaying wiki pages';

const WikiContainer = () => (
    <div className="wiki__container">
        <BrowserRouter>
            <div className="wiki__header">
                <Link to="/">
                    <Header as="h1" textAlign="center" content={headline} subheader={subline} />
                </Link>
            </div>
            <div className="wiki__content">
                <Route exact path="/" component={ListArticlesPage} />
                <Route path="/article/:articleId" component={ViewArticlePage} />
                <Route path="/create" component={CreateAndEditArticlePage} />
                <Route path="/edit/:articleId" component={CreateAndEditArticlePage} />
            </div>
        </BrowserRouter>
    </div>
);

export default WikiContainer;
