import { useState, useEffect } from 'react';
import Countries from './api/Countries';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';

function App() {
    const [isLoading, setIsloading] = useState(true);
    const [countryList, setCountryList] = useState([]);
    const [foundCountry, setFoundCountry] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (value) => {
        setSearchValue(value);
        setFoundCountry(
            countryList.filter((country) =>
                country.name.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    const handleCoutryDetails = (country) =>
        setFoundCountry([{ name: country }]);

    useEffect(() => {
        Countries.getAll()
            .then((data) => {
                setCountryList(data);
                setIsloading(false);
            })
            .catch((err) =>
                console.log('Error fetching countries: ', err.message)
            );
    }, []);

    return (
        <>
            <h1>Find countries</h1>
            <input
                type='text'
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                disabled={isLoading}
            />
            {foundCountry.length === 1 ? (
                <CountryDetails foundCountry={foundCountry} />
            ) : (
                <CountryList
                    searchValue={searchValue}
                    foundCountry={foundCountry}
                    handleCoutryDetails={handleCoutryDetails}
                />
            )}
        </>
    );
}

export default App;
