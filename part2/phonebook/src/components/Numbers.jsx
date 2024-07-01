const Numbers = ({ filteredResults }) => {
	return (
		<>
			<h2>Contact list</h2>
			{filteredResults.length === 0 && <p>No contacts found.</p>}
			<List filteredResults={filteredResults} />
		</>
	);
};

const List = ({ filteredResults }) => {
	return (
		<ul>
			{filteredResults.map((person) => (
				<li key={person.name}>
					{person.name} : {person.number}
				</li>
			))}
		</ul>
	);
};

export default Numbers;
