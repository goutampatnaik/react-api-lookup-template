import React from 'react';
import './App.css';

import DisplayList from './components/displayList/displayList';

function App() {
	return (
		<div className="App">
			<h2>Search API Template</h2>
			<p>Enter name of a city to view a list of restaurants.</p>
			<DisplayList />
		</div>
	);
}

export default App;
