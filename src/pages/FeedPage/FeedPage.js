import React from 'react';
import './FeedPage.css'
import Inputs from '../../components/Inputs/Inputs';
import List from '../../components/List/List';
import Article from '../../components/Article/Article';

const FeedPage = () => {
    return (
        <section className="feedPage">
            <Inputs type={1}/>
            <List type={1} ElementComp={Article}/>
        </section>
    );
}

export default FeedPage;