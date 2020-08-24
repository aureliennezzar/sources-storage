import React, { useLayoutEffect, useState } from 'react';
import './Article.css'

const Article = ({ titre, lien, from, date }) => {
    console.log();
    const [time, setTime] = useState("")
    const [open, setOpen] = useState(false)
    useLayoutEffect(() => {
        //Formatage de la date de publication
        const newDate = new Date(date)
        const today = new Date()
        const dd = ('0' + newDate.getDate()).slice(-2)
        const mm = ('0' + (newDate.getMonth() + 1)).slice(-2)
        const yyyy = newDate.getFullYear()
        setTime(`${dd}/${mm}/${yyyy}`)
    }, [])

    const handleClick = (e) => {
        //Ouvre le lien dans un nouvel onglet
        if (open) {
            window.open(lien, '_blank');
            e.currentTarget.className = ""
        }
    }
    
    const addStyle = (e) => {
        setOpen(true)
        e.currentTarget.className = "articleClick"
    }
    const removeStyle = (e) => {
        setOpen(false)
        e.currentTarget.className = ""
    }
    return (
        <article onMouseUp={handleClick} onMouseDown={addStyle} onMouseLeave={removeStyle}>
            <span style={{ alignSelf: "flex-start" }}>“</span>
            <p className="article-name">{titre.split('[')[2].split(']]>')[0]}</p>

            <span style={{ alignSelf: "flex-end" }}>”</span>
            <div className="article-footer">
                <p>{from}</p>
                <p>{time}</p>
            </div>

        </article>
    );
}

export default Article;