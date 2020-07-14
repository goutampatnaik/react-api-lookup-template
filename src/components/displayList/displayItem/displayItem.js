import React from 'react';

import classes from './displayItem.module.css';

function DisplayItem({ name }) {
	return (
		<>
			<p>{name}</p>
		</>
	);
}

export default DisplayItem;
