import React, { useRef, useState, useEffect } from 'react';

import classes from './search.module.css';

// Configure this as required.
export const SearchOptions = {
	searchTerm: '',
	resultsPerPage: [5, 10, 15],
	pageNumber: 1
};

function Search({ totalRecords, clickHandler }) {
	const searchTermRef = useRef('');
	const resultsPerPageRef = useRef(0);
	const pageNumberRef = useRef(0);

	const [pages, setPages] = useState([]);

	useEffect(() => {
		// Dynamically set page count based on total records and records per page
		const pageCount = Math.ceil(totalRecords / resultsPerPageRef.current.value);
		const tempPages = [];
		for (let counter = 1; counter <= pageCount; counter++) {
			tempPages.push(counter);
		}
		setPages(tempPages);
	}, [totalRecords, resultsPerPageRef.current.value]);

	function onClickHandler(event) {
		// This prevents form from submitting.
		event.preventDefault();

		// Read the values from the input fields only when submit button is clicked
		clickHandler({
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
			<select ref={resultsPerPageRef} onChange={() => setPages([])}>
				{SearchOptions.resultsPerPage.map((item, index) => (
					<option key={index} value={item}>
						{item}
					</option>
				))}
			</select>
			<label>Go to Page</label>
			<select ref={pageNumberRef} disabled={pages.length === 0}>
				{pages.map((item, index) => (
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
