'use strict'
// MAIN CONTAINER
const container = document.querySelector('.container');

// SEARCH BOX
const inputCity = document.querySelector('input');
const magnify = document.querySelector('button');
const givenName = document.querySelector('.cityName');

// WEATHER BOX
const weatherImg = document.getElementById('weatherImage');
const description = document.querySelector('.description');
const tempreature = document.querySelector('.tempreature');
const weatherBox = document.querySelector('.weather-box');

// WEATHER DETAILS
const humid = document.querySelector('.humidData');
const windSpeed = document.querySelector('.windData');
const weatherDetails = document.querySelector('.brief');
const errorMessage = document.querySelector('.error');


let cityName;

// EVENT
magnify.addEventListener('click',()=>{
    cityName = inputCity.value;
    if(cityName === '') return;
    getData(cityName);
    inputCity.value = '';
});

const getData = async function(city){
    const url =`https://api.weatherapi.com/v1/current.json?key=%20999e947a061d42b9b28183001211406&q=${city}`;
    try{
        const res = await fetch(url);
        const data = await res.json();

console.log(data);
        // INVALID CITYNAME
        if(data.error && data.error.code === 1006){
            errorMessage.classList.remove('hidden');
            weatherBox.classList.add('hidden');
            weatherDetails.classList.add('hidden');
            container.style.height = '400px';
            return;
        }

        errorMessage.classList.add('hidden');

        // SETTING UP VALUES
        const src = data.current.condition.icon;
        const humidValue = data.current.humidity;
        const wind = data.current.wind_kph;
        const text = data.current.condition.text;
        const tempValue = data.current.temp_c;
        const country = data.location.country;
        const placeName = data.location.name;
        
        // CALLING METHOD
        setData(src,humidValue,wind,text,tempValue,country,placeName);

    }catch(err){
        console.error(err);
    }
    
}

const setData = function(src,humidValue,wind,text,tempValue,country,placeName){
    weatherImg.setAttribute('src',src);
    givenName.innerHTML=`${placeName},<span> ${country}</span>`;
    tempreature.innerHTML = `${tempValue } <span>°C</span>`;
    description.textContent = text;
    humid.textContent = `${humidValue}%`;
    windSpeed.textContent = `${wind} Km/h`;

    // SETTING STYLE
    container.style.height = '530px';
    weatherBox.classList.remove('hidden');
    weatherDetails.classList.remove('hidden');
}
