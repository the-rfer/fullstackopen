const Search = ({
	search,
	handleSearch,
	setSearch,
	setFilteredResults,
	persons,
}) => {
	return (
		<>
			<p>
				Filter contacts with: <input value={search} onChange={handleSearch} />
			</p>
			<button
				onClick={() => {
					setSearch("");
					setFilteredResults(persons);
				}}
			>
				Reset
			</button>
		</>
	);
};
export default Search;
