import React, { useState, useEffect } from 'react';

import Search, { SearchOptions } from '../search/search';
import DisplayItem from './displayItem/displayItem';

import classes from './displayList.module.css';

const SEARCH_TERM = 'SEARCH_TERM';
const PAGE_NUMBER = 'PAGE_NUMBER';
const RESULTS_PER_PAGE = 'RESULTS_PER_PAGE';
const API_URL = `https://opentable.herokuapp.com/api/restaurants?city=${SEARCH_TERM}&per_page=${RESULTS_PER_PAGE}&page=${PAGE_NUMBER}`;

function DisplayList(props) {
	const [searchQuery, setSearchQuery] = useState({
		searchTerm: SearchOptions.searchTerm,
		pageNumber: SearchOptions.pageNumber[0],
		resultsPerPage: SearchOptions.resultsPerPage[0]
	});
	const [resultList, setResultList] = useState(null);

	useEffect(() => {
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
				setResultList(results.map(r => ({ id: r.id, name: r.name })));
			})
			.catch(error => console.error(error));
	}, [searchQuery]);

	const onClickHandler = searchObject => {
		// Updating searchQuery state will cause re-render,
		// which in turn will re - evaluate useEffect for execution
		// useEffect has deps of searchQuery, so it will execute again
		setSearchQuery(searchObject);
	};

	return (
		<>
			<Search clickHandler={onClickHandler} />
			{resultList
				? resultList.map(result => (
						<DisplayItem key={resultList.id} {...result} />
				  ))
				: 'No results found!'}
		</>
	);
}

export default DisplayList;
