import React, { useRef } from 'react';

import classes from './search.module.css';

// Configure this as required.
export const SearchOptions = {
	searchTerm: '',
	resultsPerPage: [5, 10, 15],
	pageNumber: [1, 2, 3, 4, 5]
};

function Search(props) {
	const searchTermRef = useRef('');
	const resultsPerPageRef = useRef(0);
	const pageNumberRef = useRef(0);

	function onClickHandler(event) {
		// This prevents form from submitting.
		event.preventDefault();

		// Read the values from the input fields only when submit button is clicked
		props.clickHandler({
			searchTerm: searchTermRef.current.value,
			pageNumber: pageNumberRef.current.value,
			resultsPerPage: resultsPerPageRef.current.value
		});
	}

	return (
		<form className={classes.Container}>
			<label>Search Term</label>
			<input
				className={classes.TextInput}
				ref={searchTermRef}
				placeholder="enter city name"
			/>
			<label>Per page</label>
			<select ref={resultsPerPageRef}>
				{SearchOptions.resultsPerPage.map((item, index) => (
					<option key={index} value={item}>
						{item}
					</option>
				))}
			</select>
			<label>Go to Page</label>
			<select ref={pageNumberRef}>
				{SearchOptions.pageNumber.map((item, index) => (
					<option key={index} value={item}>
						{item}
					</option>
				))}
			</select>
			<button type="submit" className={classes.Button} onClick={onClickHandler}>
				Search
			</button>
		</form>
	);
}

export default Search;
