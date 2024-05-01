let weather = {
    "apikey": 'd346efdd1071132b93844cc2dd94625f',
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apikey)
            .then((Response) => Response.json())
            .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    // Update the background image source to fetch an image related to the city
    const backgroundImageUrl = `url('https://source.unsplash.com/1600x900/?${name}')`;
    document.body.style.backgroundImage = backgroundImageUrl;

    document.querySelector(".city").innerText =  name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
},

    search: function () {
        this.fetchWeather(document.querySelector(".searchbar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".searchbar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

// Default city when the page loads
weather.fetchWeather("mumbai");