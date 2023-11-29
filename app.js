
const geoCodeApi = async ()=>{
    const inputCity = document.getElementById('cityName').value;
    const temprature = document.getElementById('temprature');
    const currentCity = document.getElementById('city');
    const countryName = document.getElementById('countryName');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const weatherImage = document.getElementById('weatherImage');
    const submit = document.getElementById("submit");
    

    const pushWeatherData = (weatherData, data) =>{
        
        if(inputCity.toLowerCase().includes(data[0].name.toLowerCase())){
            
            temprature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)} &deg;`;
            currentCity.innerHTML = data[0].name;
            countryName.innerHTML = `Country : ${data[0].country}`;
            humidity.innerHTML = `${weatherData.main.humidity} % `;
            windSpeed.innerHTML = `${weatherData.wind.speed} km/h `;
        } else {
            currentCity.innerHTML = "Please Input a valid city name";
        }
    }

    const setWeatherImage = (weatherData) =>{
        const condition = weatherData.weather[0].main;
        console.log(condition);
        if(condition == 'Haze'){
            weatherImage.src = './images/sun.png';
        } else if(condition == 'Clouds'){
            weatherImage.src = './images/rainny.png';
        } else if (condition == 'Mist'){
            weatherImage.src = './images/snowing.png';
        } else {
            weatherImage.src = './images/sun.png';
        }
    }

    const getWeatherData = async() =>{

        try{
            const api = '52b1466b7479328a5f112db07e16af0e';
            const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&appid=${api}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            const latitude = data[0].lat;
            const longitude = data[0].lon;
        
            const weatherDataApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api}`;
            const response2 = await fetch(weatherDataApiUrl);
            const weatherData = await response2.json();

            pushWeatherData(weatherData , data);
            setWeatherImage(weatherData);

        } catch(err){
            const inputField = document.getElementById('cityName');
            inputField.style.border = '1px solid red';
            submit.style.background = '#e76b6b';
            inputField.value = 'Not a valid City';
            setTimeout(()=>{
                inputField.style.border = '1px solid white'
                submit.style.background = 'white';
                inputField.value = null;
                inputField.placeholder = 'Enter City Name';
            },1000)
        }
    }
    getWeatherData();

} ;

