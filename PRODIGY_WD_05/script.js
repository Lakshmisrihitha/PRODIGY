const apiKey = "d73ca1ff266b81160a8f0222ece6da79";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkweather(city){
    console.log("Fetching weather for", city); //The function first logs a message indicating the city for which weather data is being fetched
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        }else {
            const data = await response.json();

        document.querySelector(".city").innerHTML = data.name; //adds city name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&degC"; //adds temp, which is the api object is inside main object
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";//adds humidy, which is the api object is inside main object
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";//adds humidy, which is the api object is inside main object

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "clouds.png";
          } else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "clear.png";
          }
            else if(data.weather[0].main == "Rain"){  
                weatherIcon.src = "rain.png";
            }
            else if(data.weather[0].main == "Drizzle"){
                    weatherIcon.src = "drizzle.png";
            }
            else if(data.weather[0].main == "Mist"){
                weatherIcon.src = "mist.png";
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";

            localStorage.setItem("city", data.name); //this stores the city in local storage for data persisting
        }
        
        } catch (error) {
        console.log('An error occurred:', error);
      }   
}

searchBtn.addEventListener('click', ()=>{
    checkweather(searchBox.value); //to give data written in the input field.When the button is clicked, the anonymous arrow function is executed, which calls the checkweather() function with the value of the searchBox input field as the argument. 
});

// On page load, check if a city is stored in local storage and fetch its weather
// 1. After successfully retrieving the weather data, the city name is stored in local storage using localStorage.setItem(). 
// It sets the key "city" with the corresponding city name obtained from data.name.

// 2. On page load, the DOMContentLoaded event listener is added to the document object. It checks if a city is stored in local storage using localStorage.getItem(). 
// If a city is found, it populates the search box with the stored city name and immediately calls checkWeather() to fetch and display the weather for that city.
document.addEventListener("DOMContentLoaded", ()=>{
    const storedCity = localStorage.getItem("city");
    if (storedCity){
        searchBox.value = storedCity;
        checkweather(storedCity);
    }
})