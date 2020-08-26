import React from 'react';
import './ArticleSkeleton.css'

const ArticleSkeleton = () => {
    return (
        <article className="article-skeleton">
            <div class="loaderctnr">
                <span class="circle first"></span>
                <span class="circle second"></span>
                <span class="circle third"></span>
            </div>
        </article>
    );
}

export default ArticleSkeleton;