const CountryList = ({ searchValue, foundCountry, handleCoutryDetails }) => {
    if (searchValue.length === 0) return null;

    if (searchValue.length > 0 && foundCountry.length === 0)
        return <p>No matches</p>;

    if (foundCountry.length > 10)
        return <p>Too many matches, be more specific</p>;
    else
        return foundCountry
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((country) => (
                <p key={country.name}>
                    {country.name}{' '}
                    <span onClick={() => handleCoutryDetails(country.name)}>
                        &#8594;
                    </span>
                </p>
            ));
};
export default CountryList;
