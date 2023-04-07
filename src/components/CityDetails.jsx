import { useEffect, useState } from 'react';
import { Container} from 'react-bootstrap';

const CityDetails = () => {

  const [location, setLocation] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weather5DayForecast, setWeather5DayForecast] = useState(null);

  const host = "http://api.openweathermap.org";
  const reverseGeocodingEndpoint = `${host}/geo/1.0/reverse`;
  const oneCallEndpoint = `${host}/data/2.5/weather`;
  const forecastEndpoint = `${host}/data/2.5/forecast`;
  const apiKey = '179a9a0266358864f84a80a290948345';

  useEffect(() => {
    const queryString = window.location.search.split('?')[1];
    //localhost:3000/weather?lat=aaaa&lon=bbbb .split('?')
    //[0] localhost:3000/weather
    //[1] lat=aaaa&lon=bbbb

    const queryStrings = queryString.split('&');
    //lat=aaaa&lon+bbbb .split('&')
    //[0] lat=aaaa
    //[1] lon=bbbb

    const latitude = Number(queryStrings[0].split('=')[1]);
    //lat=aaaa .split('=')[1] => aaaa
    const longitude = Number(queryStrings[1].split('=')[1]);
    //lon=bbbb .split('=')[1] => bbbb

    const fetchLocationData = async () => {
      try {
        const requestString = `${reverseGeocodingEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        const response = await fetch(requestString);
        if (response.ok) {
          const data = await response.json();
          setLocation(data[0]);
        } else {
          alert('Error fetching results');
        }
      } catch (error) {
        console.log(error);
      }
    }

    const fetchWeatherData = async () => {
      try {
        const requestString = `${oneCallEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=it`;
        const response = await fetch(requestString);
        if (response.ok) {
          const data = await response.json();
          setCurrentWeather(data);
        } else {
          alert('Error fetching results');
        }
      } catch (error) {
        console.log(error);
      }
    }

    const fetchWeatherData5Days = async () => {
      try {
        const requestString = `${forecastEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=it`;
        const response = await fetch(requestString);
        if (response.ok) {
          const data = await response.json();
          setWeather5DayForecast(data);
        } else {
          alert('Error fetching results');
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchLocationData();
    fetchWeatherData();
    fetchWeatherData5Days();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    location != null &&
    <Container>
      {
        location !== null &&
        <section>
          <h1>{location.name}</h1>
          <small>Latitude: {location.lat} Longitude: {location.lon}</small><br/>
        </section>
      }
      
      {
        currentWeather !== null &&
        <section>
          <small>Ultimo aggiornamento: {new Date(currentWeather.dt * 1000).toLocaleString("it-IT", {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'})}</small>

          <h2>Meteo attuale: {currentWeather.weather[0].description}</h2>
          <img src={`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`} alt=''/>

          <h3>Temperatura</h3>
          <p>{currentWeather.main.temp} °C</p>

          <h3>Umiditá</h3>
          <p>{currentWeather.main.humidity} %</p>

          <h3>Vento</h3>
          <p>Velocitá: {currentWeather.wind.speed} m/s<br/>Direzione: {currentWeather.wind.deg}°</p>
        </section>
      }

      {
        weather5DayForecast !== null &&
        <section>
          <h2>Meteo nei prossimi 5 giorni:</h2>
          <ol className='list-unstyled'>
            {
              weather5DayForecast.list.map((forecast) => (
                <li className='mb-3' style={{border: "1px solid black"}}>
                  <h3>{new Date(forecast.dt * 1000).toLocaleString("it-IT", {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'})}</h3>
                  <h5>{forecast.weather[0].description}</h5>
                  <img src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} alt=''/>

                  <h5>Temperatura</h5>
                  <p>{currentWeather.main.temp} °C</p>

                  <h5>Umiditá</h5>
                  <p>{currentWeather.main.humidity} %</p>

                  <h5>Vento</h5>
                  <p>Velocitá: {currentWeather.wind.speed} m/s<br/>Direzione: {currentWeather.wind.deg}°</p>
                </li>
              ))
            }
          </ol>
        </section>
      }
    </Container>
  )
}

export default CityDetails;
