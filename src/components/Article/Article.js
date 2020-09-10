import React, { useLayoutEffect, useState } from 'react';
import './Article.css'

const Article = ({ lien, from, color, date, titre}) => {
	const [title, setTitle] = useState(titre)
	const [time, setTime] = useState("")
	const [open, setOpen] = useState(false)
	useLayoutEffect(() => {
		//Formatting the publication date
		const newDate = new Date(date)
		const dd = ('0' + newDate.getDate()).slice(-2)
		const mm = ('0' + (newDate.getMonth() + 1)).slice(-2)
		const yyyy = newDate.getFullYear()
		setTime(`${dd}/${mm}/${yyyy}`)
		setTitle(title.replace("<![CDATA[", "").replace("]]>", ""))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	String.prototype.cutString = function(n) {
		let cut= this.indexOf(' ', n);
		if(cut== -1) return this;
		const result = this.substring(0, cut).split(' ')
		const lastWord = result[result.length - 1]
		if( this.indexOf(lastWord)+lastWord.length>n ) result.pop()
		return result.join(' ')+"..."
	}

	const handleClick = (e) => {
		//Open the link in a new tab
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
			<span className="article-badge" style={{ background: color }}></span>
			<span className="article-quotation" style={{ alignSelf: "flex-start" }}>“</span>
			<p className="article-name">{title.cutString(100)}</p>

			<span className="article-quotation" style={{ alignSelf: "flex-end" }}>”</span>
			<div className="article-footer">
				<p>{from}</p>
				<p>{time}</p>
			</div>

		</article>
	);
}

export default Article;