import React, { useLayoutEffect, useState } from 'react';
import './Article.css'

const Article = ({ titre, lien, from, date }) => {
    console.log();
    const [time,setTime] = useState("")
    useLayoutEffect(()=>{
        //Formatage de la date de publication
        const newDate = new Date(date)
        const dd = ('0' + newDate.getDate()).slice(-2)
        const mm  = ('0' + (newDate.getMonth()+1)).slice(-2)
        const yyyy  = newDate.getFullYear()
        setTime(`${dd}/${mm}/${yyyy}`)
    },[])

    const handleClick = ()=>{
        //Ouvre le lien dans un nouvel onglet
        window.open(lien, '_blank');
    }
    return (
        <article onClick={handleClick}>
            <h3>{titre.split('[')[2].split(']]>')[0]}</h3>
            <div className="article-footer">
                <p>{from}</p>
                <p>{time}</p>
            </div>
        </article>
    );
}

export default Article;