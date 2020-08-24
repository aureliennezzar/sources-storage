import React from 'react';
import './FeedPage.css'
import Inputs from '../Inputs/Inputs';
import ArticlesList from '../ArticlesList/ArticlesList';

const FeedPage = () => {
    return (
        <section className="feedPage">
            <Inputs />
            <ArticlesList />
        </section>
    );
}

export default FeedPage;