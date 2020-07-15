import React, { useRef, useState, useEffect } from 'react';

import classes from './search.module.css';

import Button from '../ui/button/button';

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
			<div className={classes.InputContainer}>
				<label htmlFor="search-term">Search Term</label>
				<input
					name="search-term"
					className={classes.TextInput}
					ref={searchTermRef}
					placeholder="enter city name"
				/>
			</div>
			<div className={classes.InputContainer}>
				<label htmlFor="per-page">Per page</label>
				<select
					name="per-page"
					ref={resultsPerPageRef}
					onChange={() => setPages([])}>
					{SearchOptions.resultsPerPage.map((item, index) => (
						<option key={index} value={item}>
							{item}
						</option>
					))}
				</select>
			</div>
			<div className={classes.InputContainer}>
				<label htmlFor="go-to-page">Go to Page</label>
				<select
					name="go-to-page"
					ref={pageNumberRef}
					disabled={pages.length === 0}>
					{pages.map((item, index) => (
						<option key={index} value={item}>
							{item}
						</option>
					))}
				</select>
			</div>
			<div className={classes.InputContainer}>
				<Button submit onClickHandler={onClickHandler}>
					Search
				</Button>
			</div>
		</form>
	);
}

export default Search;
