import React from 'react';

import classes from './displayItem.module.scss';

function DisplayItem({ name, address, city, image_url }) {
	return (
		<div className={classes.DisplayItem}>
			<img src={image_url} alt={name} />
			<div className={classes.Info}>
				<label className={classes.Name}>{name}</label>
				<label>{address}</label>
				<label>{city}</label>
			</div>
		</div>
	);
}

export default DisplayItem;
