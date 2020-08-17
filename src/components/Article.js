import React from 'react';

const Article = ({ titre, lien, from, date }) => {
    return (
        <article>
            <h1>[{from}] - {titre.split('[')[2].split(']]>')[0]}</h1>
            <a href={lien} target="_blank" rel="noopener noreferrer">Voir Article</a>
            <p>Publié le {date}</p>
            <br/>
        </article>
    );
}

export default Article;