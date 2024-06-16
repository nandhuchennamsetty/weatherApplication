import { useEffect, useState } from "react";
import "./App.css";
import coldBgImg from "./assets/cold.jpg";
import hotBgImg from "./assets/hot.jpg";
import rainBgImg from './assets/rain.jpg';
import Description from "./components/Description";
import { getFormatedWeatherData } from "./components/weatherService";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";


function App() {
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [city, setCity] = useState("Paris");
  const [bg, setBg] = useState(coldBgImg);
  const [error, setError] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getFormatedWeatherData(city, units);
  //       setWeather(data);
  //       console.log("data===>", data);
  //       console.log("data temp===>", data.temp);

  //       // dynamic bg
  //       const threshold = units === "metric" ? 20 : 60;
  //       if (data?.temp <= threshold) {
  //         setBg(coldBgImg);
  //       } else {
  //         setBg(hotBgImg);
  //       }
        
  //     } catch (e) {
  //       console.log("error in data fetch==>",e)
  //     }
      
      
  //   };
  //   fetchData();
  // }, [units, city]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFormatedWeatherData(city, units);
        setWeather(data);
        console.log("data===>", data);
        console.log("data temp===>", data.temp);

        // Dynamic background based on temperature and description
        const tempThreshold = units === "metric" ? 20 : 68;
        const rainDescriptions = ["rain", "drizzle", "thunderstorm"];

        if (
          data.description &&
          rainDescriptions.some((desc) =>
            data.description.toLowerCase().includes(desc)
          )
        ) {
          setBg(rainBgImg);
        } else if (data.temp <= tempThreshold) {
          setBg(coldBgImg);
        } else {
          setBg(hotBgImg);
        }
        // Clear any previous errors
        setError(null);
      } catch (e) {
        console.log("error in data fetch==>", e);
        // alert("No Such Place...");
        setError("No Such Place...");
      }
    };

    fetchData();
  }, [units, city]);

  //  current date and Time

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update the time every second

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);


  const handleClick = (e) => {
    const btn = e.currentTarget;
    const currentUnit = btn.innerText.slice(1);
    console.log(btn.innerText);

    const isCelsius = currentUnit === "C";
    btn.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };
  
 const formatDate = (date) => {
   const options = {
     weekday: "long",
     year: "numeric",
     month: "long",
     day: "numeric",
   };
   return date.toLocaleDateString(undefined, options);
 };

 const formatTime = (date) => {
   return date.toLocaleTimeString();
 };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {error && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Stack sx={{ width: "70%", padding: "3rem" }} spacing={2}>
              <Alert severity="warning">{error}</Alert>
              <button
                onClick={() => {
                  setError(null);
                  setCity("Paris");
                }}
                className="btnStyle"
              >
                ok
              </button>
            </Stack>
          </div>
        )}
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                // value={city}
                placeholder="Enter City..."
                // onChange={handleChange}
              />
              <button onClick={(e) => handleClick(e)}>°F</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name} , ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
                <h3 style={{color:"green",paddingBottom:"2px"}}>{formatDate(currentDateTime)}</h3>
                <h3>{formatTime(currentDateTime)}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>
            {/* bottom description */}
            <Description weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
