import React from 'react';
import { shallow, mount } from 'enzyme';
import mockAxios from 'axios';
import CreateAndEditArticlePage from '../src/components/CreateAndEditArticlePage';
import AppConf from '../src/conf.json';

describe('The Create-and-Edit Page', () => {
    describe('when the user clicks the Create button', () => {
        it('should post the form data correctly', async () => {
            jest.mock('axios');
            mockAxios.post.mockImplementationOnce(() => {});

            const mockArticle = {
                article: {},
            };

            const wrapper = await mount(<CreateAndEditArticlePage />);

            const form = wrapper.find('Form');
            form
                .find('.edit-article-page__title-input')
                .at(0)
                .instance().value = mockArticle.article.title;
            form
                .find('.edit-article-page__body-input')
                .at(0)
                .instance().value = mockArticle.article.body;
            form.simulate('submit');
            await expect(wrapper.instance().postNewArticle()).shouldBeFulfilled;
            await expect(mockAxios.post).toHaveBeenCalledWith(
                `${AppConf.ApiBaseUrl + AppConf.endpoint.createArticle}`,
                mockArticle
            );
        });
    });

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CreateAndEditArticlePage />);
    });

    it('should render the page with the correct base classes', () => {
        expect(wrapper.find('.edit-article-page__title-input')).toHaveLength(1);
        expect(wrapper.find('.edit-article-page__body-input')).toHaveLength(1);
        expect(wrapper.find('.edit-article-page__submit-input')).toHaveLength(1);
    });
});
