import React, { useLayoutEffect, useState } from 'react';
import './Article.css'

const Article = ({ titre, lien, from, date }) => {
    console.log();
    const [time,setTime] = useState("")
    useLayoutEffect(()=>{
        const newDate = new Date(date)
        const dd = ('0' + newDate.getDate()).slice(-2)
        const mm  = ('0' + (newDate.getMonth()+1)).slice(-2)
        const yyyy  = newDate.getFullYear()
        console.log(yyyy);
        setTime(`${dd}/${mm}/${yyyy}`)
    },[])
    return (
        <article>
            <h3>{titre.split('[')[2].split(']]>')[0]}</h3>
            <div style={{
                display:"flex",
                width:"100%",
                justifyContent:"space-between"
            }}>
                <p>{from}</p>
                <p>{time}</p>
            </div>
        </article>
    );
}

export default Article;