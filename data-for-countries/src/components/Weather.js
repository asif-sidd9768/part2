const Weather = ({city, weatherData}) => {

    const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    // const icon = "http://openweathermap.org/img/wn/01d@2x.png"

    return(
        <div>
            <h3>Weather in {city}</h3>
            <p>temperature {weatherData.main.temp} Celcius</p>
            <img src={icon} alt="weather-icon" />
            <p>wind {weatherData.wind.speed} m/s</p>
        </div>
    )
}

export default Weather