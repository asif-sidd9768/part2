import { useState, useEffect } from "react";
import axios from "axios";

import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([])
  const [countrySearch, setCountrySearch] = useState("")

  useEffect(() => {
    console.log("effect");
    axios.get('https://restcountries.com/v3.1/all').then(response => setCountries(response.data))
  }, [])

  const countriesToShow = countries.filter((country) => {
    return (country.name.common).toLowerCase().includes(countrySearch.toLowerCase())
  })

  const handleCountrySearchChange = (event) => {
    setCountrySearch(event.target.value)
  }

  return (
    <div>
      find countries <input value={countrySearch} onChange={handleCountrySearchChange} />
      {/* {
        countriesToShow.length > 10
          ? (<p>Too many matches, specify another filter</p> )
          : (
            countriesToShow.length > 1? countriesToShow.map(country => {
              return <p>{country.name.common}</p>
            }) : (
              countriesToShow.map(country => {
                return <CountryDetail country={country} />
              })
            )
          )
      } */}
      <Countries countriesToShow={countriesToShow} />
    </div>
  )
}

export default App;