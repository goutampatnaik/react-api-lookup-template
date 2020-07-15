import React from 'react';

import classes from './button.module.css';

function Button({ onClickHandler, submit }) {
	return (
		<button
			type={submit && 'submit'}
			className={classes.Button}
			onClick={onClickHandler}>
			Search
		</button>
	);
}

export default Button;
