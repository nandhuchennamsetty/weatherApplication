const API_KEY='f0630317d442d84d6abebab9f4b98230'

const makeIconURL = (iconId) => 
    `https://openweathermap.org/img/wn/${iconId}.png`

const getFormatedWeatherData = async (city, units = 'metric') => {
    try {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
        const data = await fetch(URL)
          .then((res) => res.json())
          .then((data) => data);
        console.log("data==>", data);
        const {
          weather,
          main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
          wind: { speed },
          sys: { country },
          name,
        } = data;
        const { description, icon } = weather[0];
        return {
          description,
          iconURL: makeIconURL(icon),
          temp,
          feels_like,
          temp_min,
          temp_max,
          pressure,
          humidity,
          name,
          country,
          speed,
        };

    } catch (e) {
       console.log("error in Api===>",e) 
    }
    
    
    
}
export {getFormatedWeatherData}