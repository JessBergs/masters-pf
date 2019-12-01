import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import WikiContainer from '../src/components/WikiContainer';
import CreateAndEditArticlePage from '../src/components/CreateAndEditArticlePage';
import ListArticlesPage from '../src/components/ListArticlesPage';
import ViewArticlePage from '../src/components/ViewArticlePage';

describe('The WikiContainer', () => {
    let wrapper;
    beforeAll(() => {
        wrapper = shallow(<WikiContainer />);
    });

    it('should render the Wiki header and body with the correct base classes', () => {
        expect(wrapper.find('.wiki__container')).toHaveLength(1);
    });

    it('should route to the correct pages', () => {
        let pathMap = wrapper.find(Route).reduce((pathMap, route) => {
            const routeProps = route.props();
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
        }, {});

        expect(pathMap['/']).toBe(ListArticlesPage);
        expect(pathMap['/article/:articleId']).toBe(ViewArticlePage);
        expect(pathMap['/create']).toBe(CreateAndEditArticlePage);
        expect(pathMap['/edit/:articleId']).toBe(CreateAndEditArticlePage);
    });
});
