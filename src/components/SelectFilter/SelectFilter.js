import React, { useState } from 'react';

const SelectFilter = () => {
	const [state, setState] = useState({
		value: "date_desc"
	})
	const { value } = state
	const handleChange = ()=>{
		
	}
	return (
		<select value={value} onChange={handleChange}>
			<option value="date_desc">Plus récent d'abbords</option>
			<option value="date_asc">Plus ancien d'abbords</option>
			<option value="color">Couleur</option>
		</select>
	);
}

export default SelectFilter;