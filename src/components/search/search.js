import React, { useRef } from 'react';

import classes from './search.module.css';

export const SearchOptions = {
	searchTerm: '',
	resultsPerPage: [5, 10, 15, 20],
	pageNumber: [1, 2, 3, 4, 5]
};

function Search(props) {
	const searchTermRef = useRef('');
	const resultsPerPageRef = useRef(0);
	const pageNumberRef = useRef(0);

	function onClickHandler(event) {
		event.preventDefault();
		props.clickHandler({
			searchTerm: searchTermRef.current.value,
			pageNumber: pageNumberRef.current.value,
			resultsPerPage: resultsPerPageRef.current.value
		});
	}

	return (
		<div className={classes.Container}>
			<label>Search Term</label>
			<input className={classes.TextInput} ref={searchTermRef} />
			<label>Per page</label>
			<select ref={resultsPerPageRef}>
				{SearchOptions.resultsPerPage.map(item => (
					<option value={item}>{item}</option>
				))}
			</select>
			<label>Go to Page</label>
			<select ref={pageNumberRef}>
				{SearchOptions.pageNumber.map(item => (
					<option value={item}>{item}</option>
				))}
			</select>
			<button className={classes.Button} onClick={onClickHandler}>
				Search
			</button>
		</div>
	);
}

export default Search;
