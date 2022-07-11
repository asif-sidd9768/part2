import { useEffect, useState } from "react";
import axios from 'axios'
import Weather from "./Weather";

const CountryDetail = ({country}) => {

    const [weatherData, setWeatherData] = useState(null)

    const api_key = process.env.REACT_APP_API_KEY
    // const city = props.city;
    const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&APPID=${api_key}`
    
    useEffect(() => {
        axios.get(API_URL).then(response => setWeatherData(response.data))
    }, [API_URL])

    return (
        <div>
          <h2>{country.name.common}</h2>
          <p>capital {country.capital[0]}</p>
          <p>area {country.area}</p>
          <h3>languages: </h3>
          <ul>
            {Object.values(country.languages).map((lang) => <li key={lang}>{lang}</li>)}
          </ul>
          <img src={country.flags['png']} alt={`${country.name.common} flag`} />

          {
            weatherData 
                ? <Weather city={country.capital[0]} weatherData={weatherData}  />
                : <p>Loading ...</p>
            }
          
        </div>
      )
}

export default CountryDetail