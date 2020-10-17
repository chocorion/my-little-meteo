class Application {
    get _CITY_NOT_FOUND_ERROR() {
        return "11";
    }

    constructor() {
        // Change the ref to use another api
        this._api = new APIPrevisionMeteo();
        
        this.onCitySearch       = this.onCitySearch.bind(this);
        this.onCoordinateSearch = this.onCoordinateSearch.bind(this);

        this._searchBar     = new SearchBar(this.onCitySearch);
        this._map           = new Map(this.onCoordinateSearch);
        this._collapseDays  = new CollapseDays();
    }

    onCoordinateSearch(lon, lat) {
        this._api.refreshByCoord(lon, lat)
        .then(() => this.onResult());
    }

    onCitySearch(city) {
        console.log("City search...");
        this._api.refreshByCity(city)
        .then(() => {
            console.log("Success !");
            this.onResult()
        })
        .catch(error => {
            console.error(error);
            document.querySelector("#error-city-not-found").classList.remove("hidden");
        });
    }

    onResult() {               
        document.querySelector("#mainContainer").classList.remove("hidden");
        document.querySelector("#error-city-not-found").classList.add("hidden");
        
        this.updateInformation();

        setTimeout(() => {
            let d = document.querySelector("#day0-info")

            if (!d.classList.contains("show")) {
                document.querySelector("#daily-button-container:first-child button").click()
            }
        }, 1000);
    }

    updateInformation() {
        this.updateJumbotron()
        this._collapseDays.updateCollapseInfos(this._api);
    }
    
    updateJumbotron() {
        const city = this._api.getCityInformations();
        const currentCondition = this._api.getDayInformations(0).hours[(new Date()).getHours()];

        document.querySelector(".jumbotron .city-name").innerHTML = city.name;
        document.querySelector(".jumbotron .condition").innerHTML = currentCondition.condition;
        document.querySelector(".jumbotron .temperature").innerHTML = currentCondition.temperature + "°c";
        document.querySelector("#wind-direction").innerHTML = currentCondition.windDirection;
        document.querySelector("#wind-speed").innerHTML = currentCondition.windSpeed;

        const image = document.querySelector('#weather-image');
        image.setAttribute(
            'src',
            `resources/weather_img/${conditions[currentCondition.condition]}.svg`
        );
    }
}

const app = new Application();
