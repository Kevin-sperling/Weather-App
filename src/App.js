import { useState } from "react";
import axios from "axios";

function App() {

  const [data, setData] = useState(null);
  const [location, setLocation] = useState('')
  const [isCelsius, setIsCelsius] = useState(false);
  const [recentSearch, setRecentSearch] = useState([]);


  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c04871ea591bca29c232daac4740a8c3`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(URL).then((response) => {
        setData(response.data);
        console.log(response.data);
        setRecentSearch((recentSearch) => [...recentSearch, response.data]);
        setLocation('');
      })


    }
  }


  const handleToggleUnit = () => {
    if (isCelsius) {
      setIsCelsius(false)
    } else {
      setIsCelsius(true);
    }

  };


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
        <button className="toggleButton" onClick={handleToggleUnit}>
          Swap to {isCelsius ? 'Fahrenheit' : 'Celsius'}
        </button>
      </div>


      {data && (
        <div className="container">
          <div className="top">
            <div className="topLeft">

              <div className="location">
                <p>{data.name}, {data.sys.country}</p>
                <p></p>
              </div>
              <div className="temp">
                <h1>
                  {isCelsius === true ? ((data.main.temp - 273.15).toFixed(1) + "\u00B0C") : (((data.main.temp - 273.15) * 9 / 5 + 32).toFixed(1) + "\u00B0F")}
                </h1>

              </div>
              <div className="description">
                <p>{data.weather[0].main}</p>
              </div>
            </div>
            <div className="topRight">
              {recentSearch.length >= 2 && <h5>Recent Searches</h5>}


              {recentSearch.slice(0, -1).map((city) => (
                <div className="recentSearches" key={city.id}>
                  <h3>{city.name}</h3>
                  <p>{isCelsius === true ? ((city.main.temp - 273.15).toFixed(1) + "\u00B0C") : (((city.main.temp - 273.15) * 9 / 5 + 32).toFixed(1) + "\u00B0F")}</p>
                </div>
              ))}
            </div>
          </div>


          <div className="bottom">

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
      )}

    </div>
  );
}

export default App;
