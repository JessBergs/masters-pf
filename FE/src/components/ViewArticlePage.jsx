import React from 'react';
import axios from 'axios';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import { Button, Segment, Header, Modal, Icon } from 'semantic-ui-react';
import AppConf from '../conf.json';

import '../styles/ViewArticlePage.scss';

class ViewArticlePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: '',
        };

        this.paramsId = '';
        if (this.props.match) {
            this.paramsId = this.props.match.params.articleId;
        }
        this.id = this.paramsId !== '' ? this.paramsId : this.props.id;
        this.fetchArticle = this.fetchArticle.bind(this);
        this.updateArticle = this.updateArticle.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    componentDidMount() {
        if (this.id) {
            this.fetchArticle(this.id, this.updateArticle);
        }
    }

    async fetchArticle(articleId, cb) {
        const ApiUrl = `${AppConf.ApiBaseUrl + AppConf.endpoint.getArticleById + articleId}`;
        await axios.get(ApiUrl).then(response => {
            cb(response.data);
        });
    }

    updateArticle(result) {
        if (result.data) {
            this.setState({
                article: result.data,
            });
        }
    }

    async onDelete() {
        await axios
            .delete(`${AppConf.ApiBaseUrl + AppConf.endpoint.deleteArticleById + this.id}`)
            .then((window.location.href = '/'));
    }

    onEdit() {
        window.location.href = `/edit/${this.id}`;
    }

    render() {
        const DeleteBtnWithModal = () => (
            <Modal trigger={<Button color="red" icon="trash" />} basic size="mini">
                <Header icon="trash" content="Delete Article" />
                <Modal.Content>
                    <p>Sure?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button className="view-article-page__delete-button" onClick={this.onDelete} color="green" inverted>
                        <Icon name="checkmark" /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        );

        const dateCreatedPretty = moment(this.state.article.dateCreated).format('MMMM Do YYYY, h:mm:ss a');
        const dateUpdatedPretty = moment(this.state.article.dateUpdated).format('MMMM Do YYYY, h:mm:ss a');

        return (
            <div className="view-article-page__container">
                <div className="view-article-page__content">
                    {this.state.article !== '' && (
                        <div>
                            <Segment.Group>
                                <Segment className="view-article-page__header">
                                    <Header as="h2">
                                        <div className="view-article-page__title">{this.state.article.title}</div>
                                    </Header>
                                </Segment>
                                <Segment>
                                    <div className="view-article-page__body">
                                        <ReactMarkdown source={this.state.article.body} />
                                    </div>
                                </Segment>
                            </Segment.Group>
                        </div>
                    )}
                </div>

                <div className="view-article-page__controls">
                    <span className="view-article-page__date">
                        <span className="view-article-page__dateCreated">created: {dateCreatedPretty};</span>{' '}
                        <span className="view-article-page__dateUpdated">updated: {dateUpdatedPretty}</span>
                    </span>
                    <div className="view-article-page__button-wrapper">
                        <div className="view-article-page__button-delete">
                            <DeleteBtnWithModal />
                        </div>
                    </div>
                    <div className="view-article-page__button-wrapper">
                        <Button icon="edit" onClick={this.onEdit} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewArticlePage;
