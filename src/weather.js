// https://www.prevision-meteo.ch/services/json/[nom_ville][lat=xx.xxxlng=yy.yyy]


class Application {
    _API_ENTRY = "https://www.prevision-meteo.ch/services/json/"

    constructor() {
        this._info = document.querySelector("#data");
        this.onSearch = this.onSearch.bind(this);

        this._searchBar = new SearchBar(this.onSearch);
    }

    getCityData(city) {
        return get(`${this._API_ENTRY}${city}`)
    }


    onSearch(city) {
        document.querySelector("#mainContainer").classList.remove("hidden");
        this.getCityData(city)
            .then(data => {
                // this._info.innerHTML = JSON.stringify(data, null, 4);
                
                this._data = data;
                this.updateInformation();

                setTimeout(() => {
                    let d = document.querySelector("#day0-info")
                    console.log(d);

                    if (!d.classList.contains("show")) {
                        document.querySelector("#daily-button-container:first-child button").click()
                    }
                }, 1000);
            });
    }

    updateInformation() {
        console.log("Updating informations...");
        console.log(JSON.stringify(this._data, null, 4));

        for (let day = 0; day < 5; day++) {
            this.updateDailyInfo(day, this._data[`fcst_day_${day}`]);
            this.updateDailyTemperatures(day, this._data[`fcst_day_${day}`]);
        }

        document.querySelector(".jumbotron .city-name").innerHTML = this._data["city_info"]["name"];
        document.querySelector(".jumbotron .condition").innerHTML = this._data["current_condition"]["condition"];
        document.querySelector(".jumbotron .temperature").innerHTML = this._data["current_condition"]["tmp"] + "°c";
        // document.querySelector(".temperature-min-max").innerHTML = `(${this._data["fcst_day_0"]["tmin"]}|${this._data["fcst_day_0"]["tmax"]})`;
        // document.querySelector(".current-date").innerHTML = `Today - ${this._data["current_condition"]["hour"]}`
        // document.querySelector(".sunrise .info").innerHTML = this._data["city_info"]["sunrise"]
        // document.querySelector(".sunset .info").innerHTML = this._data["city_info"]["sunset"]

        const image = document.querySelector('#weather-image');
        image.setAttribute(
            'src',
            `resources/weather_img/${conditions[this._data["current_condition"]["condition"]]}.svg`
        )
    }

    updateDailyInfo(day, infos) {
        console.log("Nothing to do for the moment...");

        const div = document.querySelector(`#day${day}-info .infos`);
        div.innerHTML = `Météo pour ${infos["day_long"]} : <br>`
        div.innerHTML += `Condition : ${infos["condition"]} <br>`
        div.innerHTML += `Température minimum : ${infos['tmin']} <br>`
        div.innerHTML += `Température maximum : ${infos['tmax']} <br>`
    }

    updateDailyTemperatures(day, infos) {
        new TemperatureChart(day, infos);
    }

}

const app = new Application();
