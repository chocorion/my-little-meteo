// https://www.prevision-meteo.ch/services/json/[nom_ville][lat=xx.xxxlng=yy.yyy]


class Application {
    _API_ENTRY = "https://www.prevision-meteo.ch/services/json/"

    constructor() {
        this._info = document.querySelector("#data");
        this.onSearch = this.onSearch.bind(this);

        this._searchBar = new SearchBar(this.onSearch);
        this._collapseDays = new CollapseDays();
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

        this._collapseDays.updateCollapseInfos(this._data);
    }
}

const app = new Application();
