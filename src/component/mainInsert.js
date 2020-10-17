class MainInsert {
    update(apiWrapper) {
        const city = apiWrapper.getCityInformations();
        const currentCondition = apiWrapper.getDayInformations(0).hours[(new Date()).getHours()];

        document.querySelector(".jumbotron .city-name").innerHTML = city.name;
        document.querySelector(".jumbotron .condition").innerHTML = currentCondition.condition;
        document.querySelector(".jumbotron .temperature").innerHTML = currentCondition.temperature + "°c";
        document.querySelector("#wind-direction").innerHTML = currentCondition.windDirection;
        document.querySelector("#wind-speed").innerHTML = currentCondition.windSpeed;
        document.querySelector("#sunrise").innerHTML = city.sunrise;
        document.querySelector("#sunset").innerHTML = city.sunset;

        const image = document.querySelector('#weather-image');
        image.setAttribute(
            'src',
            `resources/weather_img/${conditions[currentCondition.condition]}.svg`
        );
    }
}