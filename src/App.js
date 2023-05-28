import { useState } from "react";
import axios from "axios";



function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('')

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c04871ea591bca29c232daac4740a8c3`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(URL).then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            <h1>{data.main.temp}F</h1>
          </div>
          <div className="description">
            <p>{data.weather[0].main}</p>
          </div>
        </div>


        <div className="bottom">
          <div className="feels">
            <p className="bold">Feels Like</p>
            <p>{data.main.feels_like}F</p>
          </div>
          <div className="humidity">
            <p className="bold">Humidity</p>
            <p>{data.main.humidity}%</p>
          </div>
          <div className="wind">
            <p className="bold">Wind</p>
            <p>{data.wind.speed} mph</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
