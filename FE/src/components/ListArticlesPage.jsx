import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Button, Segment, Pagination } from 'semantic-ui-react';
import AppConf from '../conf.json';

import '../styles/ListArticlesPage.scss';

class ListArticlesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articleHeaders: [],
            paginationDefaultPageSize: 5,
            activePage: 1,
            defaultActivePage: 1,
            totalPages: 1,
        };
        this.fetchArticleHeaders = this.fetchArticleHeaders.bind(this);
        this.updateArticles = this.updateArticles.bind(this);
        this.generatePagination = this.generatePagination.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.calcEntriesForCurrentPage = this.calcEntriesForCurrentPage.bind(this);
    }

    componentDidMount() {
        this.fetchArticleHeaders(this.updateArticles);
    }

    async fetchArticleHeaders(cb) {
        await axios.get(`${AppConf.ApiBaseUrl + AppConf.endpoint.getAllArticleHeaders}`).then(response => {
            cb(response.data);
        });
    }

    updateArticles(result) {
        if (result.data) {
            this.setState({
                articleHeaders: result.data,
            });
        }
        this.generatePagination();
    }

    entry(item) {
        const linkUrl = `/article/${item.id}`;
        const dateCreatedPretty = moment(item.dateCreated).fromNow();
        return (
            <a href={linkUrl}>
                <Segment className="task_entry ">
                    <div className="list-articles-page__entry" key={item.id}>
                        <div className="list-articles-page__entry__title">{item.title}</div>
                        <div className="list-articles-page__entry__dateCreated">created {dateCreatedPretty}</div>
                    </div>
                </Segment>
            </a>
        );
    }

    generatePagination() {
        const totalEntries = this.state.articleHeaders.length;
        const totalPages = Math.ceil(totalEntries / this.state.paginationDefaultPageSize);
        console.log(totalPages, 'totPages');
        this.setState({
            totalPages,
        });
    }

    calcEntriesForCurrentPage() {
        const startEntry = (this.state.activePage - 1) * this.state.paginationDefaultPageSize;
        const endEntry = startEntry + this.state.paginationDefaultPageSize;
        const entriesForCurrentPage = this.state.articleHeaders.slice(startEntry, endEntry);
        return entriesForCurrentPage;
    }

    onPageChange(e, pageInfo) {
        this.setState({
            activePage: pageInfo.activePage,
        });
    }

    render() {
        let entries;
        if (this.state.articleHeaders.length) {
            const entriesForCurrentPage = this.calcEntriesForCurrentPage();
            entries = entriesForCurrentPage.map(this.entry);
        } else {
            entries = <Segment className="task_entry--empty">No entries - add some!</Segment>;
        }

        return (
            <div className="list-articles-page__container">
                <Segment.Group>{entries}</Segment.Group>

                <div className="list-articles-page__controls">
                    <a href="/create">
                        <Button icon="add" color="white" />
                    </a>
                </div>

                {this.state.totalPages > 1 && (
                    <div className="list-articles-page__pagination-container">
                        <Pagination
                            className="list-articles-page__pagination"
                            defaultActivePage={1}
                            totalPages={this.state.totalPages}
                            onPageChange={this.onPageChange}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default ListArticlesPage;
