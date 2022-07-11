import CountryDetail from "./CountryDetail"

const Countries = ({countriesToShow}) => {

    return (
        <>
        {
            countriesToShow.length > 10
              ? (<p>Too many matches, specify another filter</p> )
              : (
                countriesToShow.length > 1? countriesToShow.map(country => {
                  return (
                    <p 
                        key={country.name.common}>{country.name.common} 
                        <button>show</button>
                    </p>)
                }) : (
                  countriesToShow.map(country => {
                    return <CountryDetail key={country.name.common} country={country} />
                  })
                )
              )
          }
          </>
    )
}

export default Countries