import React from 'react';
import './ArticleSkeleton.css'

const ArticleSkeleton = () => {
    return (
        <article className="article-skeleton">
            <div className="loaderctnr">
                <span className="circle first"></span>
                <span className="circle second"></span>
                <span className="circle third"></span>
            </div>
        </article>
    );
}

export default ArticleSkeleton;