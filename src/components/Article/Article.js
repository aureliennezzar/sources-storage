import React, { useLayoutEffect, useState } from 'react';
import './Article.css'

const Article = ({ titre, lien, from, date }) => {
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

    const formatedText = (text) => {
        let title = ""
        try {
            title += text.split('[')[2].split(']]>')[0]
        }
        catch (err) {
            title += text
        }
        let count = 0
        let isBig = false

        const result = title.split(" ").map(word => {
            count += word.length + 1
            if (count <= 100) {
                return word
            }
            else {
                isBig = true
            }
        }).join(' ').trim()
        if (isBig) {
            return result + "..."
        } else {
            return result
        }
    }

    const handleClick = (e) => {
        //Ouvre le lien dans un nouvel onglet
        if (open) {
            window.open(lien, '_blank');
            e.currentTarget.classList.remove("articleClick")
        }
    }

    const addStyle = (e) => {
        setOpen(true)
        e.currentTarget.classList.add("articleClick")
    }
    const removeStyle = (e) => {
        setOpen(false)
        e.currentTarget.classList.remove("articleClick")
    }
    return (
        <article className="article" onMouseUp={handleClick} onMouseDown={addStyle} onMouseLeave={removeStyle}>
            <span style={{ alignSelf: "flex-start" }}>“</span>
            <p className="article-name">{formatedText(titre)}</p>

            <span style={{ alignSelf: "flex-end" }}>”</span>
            <div className="article-footer">
                <p>{from}</p>
                <p>{time}</p>
            </div>

        </article>
    );
}

export default Article;