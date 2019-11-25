import React from 'react';
import { shallow, mount } from 'enzyme';
import mockAxios from 'axios';
import ListArticlesPage from '../src/components/ListArticlesPage';
import mockArticles from './fixtures/mockArticles.json';
import AppConf from '../src/conf.json';

describe('The List Page', () => {
    describe('when loading', () => {
        it('fetches the available articles from the correct URL and updates the state', async () => {
            jest.mock('axios');
            mockAxios.get.mockImplementationOnce(() =>
                Promise.resolve({
                    data: { data: mockArticles },
                })
            );
            const wrapper = await mount(<ListArticlesPage />);

            const state = wrapper.instance().state;
            wrapper.instance().forceUpdate();
            expect(state.articleHeaders).toEqual(mockArticles);
            expect(mockAxios.get).toHaveBeenCalledWith(`${AppConf.ApiBaseUrl + AppConf.endpoint.getAllArticleHeaders}`);
        });
    });

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ListArticlesPage />);
    });

    it('should render the the list page with the correct base classes', () => {
        expect(wrapper.find('.list-articles-page__container')).toHaveLength(1);
    });

    describe('when given three articles', () => {
        it('should render three article entries with the correct contents', () => {
            wrapper.instance().setState({ articleHeaders: mockArticles });
            wrapper.instance().forceUpdate();

            const entries = wrapper.find('.list-articles-page__entry');
            expect(entries).toHaveLength(3);

            const firstEntryTitle = entries.at(0).find('.list-articles-page__entry__title');
            expect(firstEntryTitle.text()).toEqual(mockArticles[0].title);
            const firstEntryDate = entries.at(0).find('.list-articles-page__entry__dateCreated');
            expect(firstEntryDate.text()).toEqual('created 7 years ago');
        });
    });

    describe('when given no articles', () => {
        it('should render no article entry', () => {
            expect(wrapper.find('.list-articles-page__entry')).toHaveLength(0);
        });
    });
});
