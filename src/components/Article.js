import React from 'react';

const Article = ({ titre, lien, from, date }) => {
    return (
        <article>
            <h1>{titre.split('[')[2].split(']]>')[0]} issu de {from}</h1>
            <a href={lien} target="_blank" rel="noopener noreferrer">Voir Article</a>
            <p>Publié le {date}</p>
        </article>
    );
}

export default Article;