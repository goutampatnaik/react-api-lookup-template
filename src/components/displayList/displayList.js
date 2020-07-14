import React, { useState, useEffect } from 'react';

import Search, { SearchOptions } from '../search/search';
import DisplayItem from './displayItem/displayItem';

import classes from './displayList.module.css';

// API
const SEARCH_TERM = 'SEARCH_TERM';
const PAGE_NUMBER = 'PAGE_NUMBER';
const RESULTS_PER_PAGE = 'RESULTS_PER_PAGE';
const API_URL = `https://opentable.herokuapp.com/api/restaurants?city=${SEARCH_TERM}&per_page=${RESULTS_PER_PAGE}&page=${PAGE_NUMBER}`;

function DisplayList(props) {
	// Read default values from configured options
	const [searchQuery, setSearchQuery] = useState({
		searchTerm: SearchOptions.searchTerm,
		pageNumber: SearchOptions.pageNumber[0],
		resultsPerPage: SearchOptions.resultsPerPage[0]
	});

	// Initially set results to null
	const [resultList, setResultList] = useState(null);

	useEffect(() => {
		// No need to proceed if search term not provided
		if (!searchQuery.searchTerm) return;

		// Set API dynamic query based on searchQuery
		const url = API_URL.replace(SEARCH_TERM, searchQuery.searchTerm)
			.replace(PAGE_NUMBER, searchQuery.pageNumber)
			.replace(RESULTS_PER_PAGE, searchQuery.resultsPerPage);

		// Make api call and set value of result
		fetch(url)
			.then(response => response.json())
			.then(response => {
				const results = response.restaurants;
				setResultList(
					// Prepare object from as many properties as required in the app
					results.map(r => ({
						id: r.id,
						name: r.name,
						address: r.address,
						city: r.city,
						image_url: r.image_url
					}))
				);
			})
			.catch(error => console.error(error));
	}, [searchQuery]);

	const onClickHandler = searchObject => {
		// Updating searchQuery state will cause re-render,
		// which in turn will re - evaluate useEffect for execution
		// useEffect has deps of searchQuery, so it will execute again
		setSearchQuery(searchObject);
	};

	// Initial value before search initiated
	let result = null;

	if (resultList) {
		// Search returned at least one record
		if (resultList.length) {
			result = resultList.map(result => (
				<DisplayItem key={result.id} {...result} />
			));
		} else {
			// Search returned 0 records
			result = 'No results found!';
		}
	}

	return (
		<div className={classes.Container}>
			<Search clickHandler={onClickHandler} />
			<div className={classes.DisplayLayout}>{result}</div>
		</div>
	);
}

export default DisplayList;
