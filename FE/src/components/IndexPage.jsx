import React from 'react';
import 'whatwg-fetch';

import '../styles/indexPage.scss';
import { Link } from 'react-router-dom';

const allDataEndpoint = 'https://7grnn3y0h9.execute-api.eu-central-1.amazonaws.com/dev/masters-pf';

const Header = () => (
    <div className="index-page__header-container">
        <video
            autoPlay
            muted
            loop
            className="index-page__header-video"
            poster="https://jbergs.eu/img_index/titlemov_poster.jpg"
        >
            <source src="https://jbergs.eu/img_index/titlemov.mp4" type="video/mp4" />
            <source src="https://jbergs.eu/img_index/titlemov.webm" type="video/webm" />
            <source src="https://jbergs.eu/img_index/titlemov.ogv" type="video/ogg" />
        </video>
        <img className="index-page__header-video--hidden" src="https://jbergs.eu/img_index/titlemov_poster.jpg" />

        <div className="index-page__header-text">
            <div className="index-page__header-title">Jessica Bergs</div>
            <div className="index-page__header-subtitle">Master's portfolio</div>
            <div className="index-page__header-subline">
                M.Sc. Visualisation: Serious Games Development
                <br />
                The Glasgow School of Art
            </div>
        </div>
    </div>
);

const ProjectItem = ({ id, promoData }) => {
    const { projectTitle, subline } = promoData;
    return (
        <div className="index-page__project-item">
            <Link className="index-page__project-link" to={`project/${id}`}>
                <div className="index-page__project-image">
                    <img
                        className="index-page__project-image--hidden"
                        src="https://jbergs.eu/img_index/indexer_lab2_square.jpg"
                    />
                </div>
                <div className="index-page__project-text-overlay">
                    <div className="index-page__project-title">{projectTitle}</div>
                    <div className="index-page__project-sub">{subline}</div>
                </div>
            </Link>
        </div>
    );
};

const ProjectCollection = ({ content }) => (
    <div className="index-page__layout-container">
        <div className="index-page__heading">Key projects</div>
        <div className="index-page__projects-container">
            <div className="index-page__projects-grid">
                {content.map(item => (
                    <ProjectItem id={item.id} promoData={item.promo} />
                ))}
            </div>
        </div>
    </div>
);

const FooterItem = ({ itemTitle, text }) => {
    const hasTitle = title => (title ? '' : '--align-bottom');
    return (
        <div className="index-page__footer-item">
            <div className="index-page-footer-title"> {itemTitle}</div>
            <div className={`index-page-footer-text${hasTitle(itemTitle)}`}> {text} </div>
        </div>
    );
};

const Footer = () => (
    <div className="index-page__layout-container">
        <div className="index-page__footer-grid">
            <FooterItem itemTitle="Keywords" text="Spatig, IoT wearables, health games, mobile development " />
            <FooterItem
                itemTitle="Contact"
                text="Spatial virtaces, 3D reconstruction, 3D modelling, IoT wearables, heal"
            />
            <FooterItem text="© 2018 Jessica Bergs All rights reserved" />
        </div>
    </div>
);

class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projectsData: [],
        };

        this.fetchData = this.fetchData.bind(this);
    }

    async fetchData(endpointUrl) {
        const response = await fetch(endpointUrl, {mode: 'cors'});
        const body = await response.json();
        console.log (body);
        this.setState({
                projectsData: body.Items,
         }, () => {console.log(this.state, '__state updated')});
        
    }

    componentDidMount() {
        this.fetchData(allDataEndpoint);
    }

    render() {
        return (
            <div className="index-page__container">
                <section className="index-page__header-section">
                    <Header />
                </section>
                <section className="index-page__projects-section">
                    <ProjectCollection content={this.state.projectsData} />
                </section>
                <section className="index-page__footer-section">
                    <Footer />
                </section>
            </div>
        );
    }
}

export default IndexPage;
