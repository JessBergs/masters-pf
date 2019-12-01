import React from 'react';
import { shallow, mount } from 'enzyme';
import mockAxios from 'axios';
import ViewArticlePage from '../src/components/ViewArticlePage';
import mockArticles from './fixtures/mockArticles.json';
import AppConf from '../src/conf.json';

describe('The Article View Page', () => {
    describe('when loading', () => {
        it('fetches the available article from the correct URL with the correct id and updates the state', async () => {
            jest.mock('axios');
            mockAxios.get.mockImplementationOnce(() =>
                Promise.resolve({
                    data: { data: mockArticles[0] },
                })
            );
            const mockId = 1;
            const wrapper = await mount(<ViewArticlePage id={mockId} />);

            const state = wrapper.instance().state;
            expect(state.article).toEqual(mockArticles[0]);
            expect(mockAxios.get).toHaveBeenCalledWith(
                `${AppConf.ApiBaseUrl + AppConf.endpoint.getArticleById + mockId}`
            );
        });
    });

    describe('when the user clicks the Delete button', () => {
        it('dispatches the correct API call', async () => {
            jest.mock('axios');
            mockAxios.delete.mockImplementationOnce(() => {});
            const mockId = 1;
            const wrapper = await mount(<ViewArticlePage id={mockId} />);
            const deleteBtn = wrapper.find('.view-article-page__button-delete').find('Button');
            deleteBtn.simulate('click');
            await expect(wrapper.instance().onDelete()).shouldBeFulfilled;
            await expect(mockAxios.delete).toHaveBeenCalledWith(
                `${AppConf.ApiBaseUrl + AppConf.endpoint.deleteArticleById + mockId}`
            );
        });
    });

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ViewArticlePage />);
    });

    it('should render the the page with the correct base classes', () => {
        expect(wrapper.find('.view-article-page__container')).toHaveLength(1);
    });

    describe('when given no article', () => {
        it('should render no article', () => {
            expect(wrapper.find('.view-article-page__title')).toHaveLength(0);
        });
    });

    describe('when given an article', () => {
        it('should render the article components with the correct contents', () => {
            wrapper.instance().setState({ article: mockArticles[0] });
            wrapper.instance().forceUpdate();

            const articleContainer = wrapper.find('.view-article-page__container');
            const articleContent = articleContainer.find('.view-article-page__content');

            const title = articleContent.find('.view-article-page__title');
            expect(title.text()).toEqual(mockArticles[0].title);
        });
    });
});
