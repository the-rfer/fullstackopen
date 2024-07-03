import { useState, useEffect } from 'react';
import Countries from '../api/Countries';

const CountryDetails = ({ foundCountry }) => {
    const [currentCountry, setCurrentCountry] = useState(null);

    useEffect(() => {
        Countries.getSpecific(foundCountry[0].name).then((data) =>
            setCurrentCountry(data)
        );
    }, [foundCountry]);

    if (currentCountry != null) {
        return (
            <>
                <Country
                    countryName={currentCountry.name.common}
                    capital={currentCountry.capital}
                    area={currentCountry.area}
                    languages={currentCountry.languages}
                    svg={currentCountry.flags.svg}
                    alt={currentCountry.flags.alt}
                />

                <Weather
                    capital={currentCountry.capital}
                    lat={currentCountry.capitalInfo.latlng[0]}
                    lon={currentCountry.capitalInfo.latlng[1]}
                />
            </>
        );
    }
};

const Country = ({ countryName, capital, area, languages, svg, alt }) => {
    const formatedArea = Intl.NumberFormat('en-US').format(area);
    return (
        <>
            <h2>{countryName}</h2>
            <p>Capital: {capital}</p>
            <p>Area: {formatedArea} m&sup2;</p>
            <h3>Languages</h3>
            <ul>
                {Object.entries(languages).map(([code, name]) => (
                    <li key={code}>{name}</li>
                ))}
            </ul>
            <img src={svg} alt={alt} style={{ width: '250px' }} />
        </>
    );
};

const Weather = ({ capital, lat, lon }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        Countries.getWeather(lat, lon).then((data) => {
            console.log('weather data: ', data);
            setWeather(data);
        });
    }, [lat, lon]);

    if (weather != null)
        return (
            <>
                <h2>Weather in {capital}</h2>
                <p>temperature: {weather.main.temp}º Celcius</p>

                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt='weather icon'
                />
                <p>wind: {weather.wind.speed} m/s</p>
            </>
        );
};

export default CountryDetails;
