import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Form, Input, TextArea, Segment, Sticky, Button } from 'semantic-ui-react';
import AppConf from '../conf.json';

import '../styles/CreateAndEditArticlePage.scss';

class CreateAndEditArticlesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            dateCreated: undefined,
            showUpdateBar: false,
            changeEffected: false,
        };

        this.articleId = undefined;
        this.checkAndSetArticleId();

        this.onCreate = this.onCreate.bind(this);
        this.postNewArticle = this.postNewArticle.bind(this);
        this.postUpdatedArticle = this.postUpdatedArticle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onUnfocus = this.onUnfocus.bind(this);
        this.fetchArticle = this.fetchArticle.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.showUpdateBar = this.showUpdateBar.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    componentDidMount() {
        this.checkAndSetArticleId();
        if (this.articleId) {
            this.fetchArticle(this.articleId, this.updateForm);
        }
    }

    async fetchArticle(articleId, cb) {
        const ApiUrl = `${AppConf.ApiBaseUrl + AppConf.endpoint.getArticleById + articleId}`;
        await axios.get(ApiUrl).then(response => {
            cb(response.data);
        });
    }

    updateForm(articleData) {
        console.log(articleData);
        this.setState({
            title: articleData.data.title,
            body: articleData.data.body,
            dateCreated: articleData.data.dateCreated,
        });
    }

    checkAndSetArticleId() {
        if (this.props.match) {
            this.articleId = this.props.match.params.articleId;
        }
    }

    handleChange(e, { name, value }) {
        this.setState({ [name]: value });
        this.setState({ changeEffected: true });
    }

    onCreate(e) {
        if (this.state.title !== '' && this.state.body !== '' && this.state.changeEffected) {
            this.postNewArticle(this.state.title, this.state.body);
        }
        e.preventDefault();
    }

    onUnfocus(redirectFlag) {
        if (this.state.title !== '' && this.state.body !== '' && this.articleId) {
            this.postUpdatedArticle(this.state.title, this.state.body, this.articleId, redirectFlag);
        }
    }

    async postNewArticle(title, body) {
        const articleData = {
            article: {
                title,
                body,
            },
        };
        await axios
            .post(`${AppConf.ApiBaseUrl + AppConf.endpoint.createArticle}`, articleData)
            .then((window.location.href = '/'));
    }

    async postUpdatedArticle(title, body, id, redirectFlag) {
        const articleData = {
            article: {
                title,
                body,
                id,
            },
        };
        if (this.state.changeEffected) {
            try {
                await axios
                    .post(`${AppConf.ApiBaseUrl + AppConf.endpoint.updateArticle}`, articleData)
                    .then(response => {
                        if (response.status === 200) {
                            this.showUpdateBar('success');
                        }
                    });
            } catch (err) {
                this.showUpdateBar('fail');
            }
        }
        if (!redirectFlag) {
            window.location.href = '/';
        }
    }

    showUpdateBar(status) {
        if (status === 'fail') {
        }
        if (status === 'success') {
        }
    }

    onBack() {
        this.onUnfocus(false);
    }

    render() {
        const dateUpdatedPretty = moment(this.state.dateUpdated).format('MMMM Do YYYY, h:mm a');
        return (
            <div className="edit-article-page__container">
                <Form onSubmit={this.onCreate}>
                    <Form.Field>
                        <Input
                            name="title"
                            placeholder="Title"
                            className="edit-article-page__title-input"
                            onChange={this.handleChange}
                            onBlur={this.onUnfocus}
                            value={this.state.title}
                        />
                    </Form.Field>
                    <Form.Field>
                        <TextArea
                            name="body"
                            type="text"
                            className="edit-article-page__body-input"
                            placeholder="Content in markdown"
                            onChange={this.handleChange}
                            onBlur={this.onUnfocus}
                            value={this.state.body}
                        />
                    </Form.Field>
                    {!this.articleId && (
                        <Form.Field>
                            <Form.Button type="submit" className="edit-article-page__submit-input">
                                Create
                            </Form.Button>
                        </Form.Field>
                    )}
                </Form>
                {this.articleId && (
                    <div className="back-btn">
                        <span>
                            <Button icon="angle left" onClick={this.onBack} />
                        </span>

                        <span className="create-article-page__date">updated: {dateUpdatedPretty}</span>
                    </div>
                )}
            </div>
        );
    }
}

export default CreateAndEditArticlesPage;
