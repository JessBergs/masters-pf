import React from 'react';
import '../styles/projectPage.scss';
import { projectsData } from '../../data/projectsData.json';
import Carousel from './Carousel.jsx';

const EmbeddedVideo = link => {
    return <iframe class="block__embedded-vid" src={link} frameborder="0" allowfullscreen></iframe>;
};

const ArticleBlock = blockData => {
    const { type } = blockData;
    const generateBlockType = () => {
        switch (type) {
            case 'text':
                return (
                    <div className="block__text">
                        <div className="block__title">{blockData.title}</div>
                        {blockData.text}
                    </div>
                );
            case 'singleImage':
                return <img className="block__image" src={blockData.src} />;
            case 'carousel':
                return <Carousel items={blockData.items} />;
            case 'embeddedVideo':
                return <EmbeddedVideo link={blockData.link} />;
            default:
                return '';
        }
    };
    const block = generateBlockType();
    return <div className="project-page__article-block">{block}</div>;
};

const ProjectPage = (props) => {
    console.log (props)
    let id;
    if (props.match) {
        id = props.match.params.projectId;
    }
    if (!id){
        throw new Error ('Project ID required')
    }
    const projectContent = projectsData[id].content;
    return (
        <div className="project-page__container">
            <section className="project-page__header">
                <img className="project-page__header-image" src={projectContent.headerImageSrc} />
            </section>

            <section className="project-page__article">
                <div className="project-page__title-container">
                    <div className="project-page__title">{projectContent.title}</div>
                    <div className="project-page__subline">{projectContent.subtitle}</div>
                    <div className="project-page__tags">{projectContent.tags}</div>
                </div>

                {projectContent.articleBlocks.map(block => (
                    <ArticleBlock {...block} />
                ))}
            </section>

            <section className="project-page__footer">
                <div className="project-page__copyright">Jessica Bergs 2019 All rights reserved.</div>
                <a src="https://uk.linkedin.com/in/jbergs" className="project-page__linkedIn-link">
                    <img src="https://jbergs.eu/img_lab2/linkedin.png" className="project-page__linkedIn-img" />
                </a>
            </section>
        </div>
    );
};

export default ProjectPage;
