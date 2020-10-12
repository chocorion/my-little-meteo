// https://www.prevision-meteo.ch/services/json/[nom_ville][lat=xx.xxxlng=yy.yyy]


class Application {
    get _API_ENTRY() {
        return "https://www.prevision-meteo.ch/services/json/"
    }

    get _CITY_NOT_FOUND_ERROR() {
        return "11";
    }

    constructor() {
        this.onCitySearch = this.onCitySearch.bind(this);
        this.onCoordinateSearch = this.onCoordinateSearch.bind(this);

        this._searchBar = new SearchBar(this.onCitySearch);
        this._collapseDays = new CollapseDays();
        this._map = new Map(this.onCoordinateSearch);
    }

    getCityData(city) {
        return get(`${this._API_ENTRY}${city}`)
    }
    
    getCoordinateData(lon, lat) {
        return get(`${this._API_ENTRY}lat=${lat}lng=${lon}`);
    }

    onCoordinateSearch(lon, lat) {
        this.getCoordinateData(lon, lat)
        .then(data => {
            data["city_info"]["name"] = `
                lat : ${Math.round(lat * 100)/100}
                lon : ${Math.round(lon * 100)/100}`;

            this.onResult(data)
        });
    }

    onCitySearch(city) {
        this.getCityData(city)
        .then(data => this.onResult(data));
    }

    onResult(data) {               
        if (data.errors !== undefined) {
            console.log("There is an error...-> " + data.errors.code);
            if (data.errors[0].code == this._CITY_NOT_FOUND_ERROR) {
                console.log("City not found error !");
                document.querySelector("#error-city-not-found").classList.remove("hidden");

                 return;
             }
         }

         document.querySelector("#mainContainer").classList.remove("hidden");
         document.querySelector("#error-city-not-found").classList.add("hidden");
         

         this._data = data;
         this.updateInformation();

         setTimeout(() => {
             let d = document.querySelector("#day0-info")
             console.log(d);

             if (!d.classList.contains("show")) {
                 document.querySelector("#daily-button-container:first-child button").click()
             }
         }, 1000);
     }

    updateInformation() {
        console.log("Updating informations...");
        console.log(JSON.stringify(this._data, null, 4));

        this.updateJumbotron()
        this._collapseDays.updateCollapseInfos(this._data);
    }
    
    updateJumbotron() {
        document.querySelector(".jumbotron .city-name").innerHTML = this._data["city_info"]["name"];
        document.querySelector(".jumbotron .condition").innerHTML = this._data["current_condition"]["condition"];
        document.querySelector(".jumbotron .temperature").innerHTML = this._data["current_condition"]["tmp"] + "°c";
        
        const image = document.querySelector('#weather-image');
        image.setAttribute(
            'src',
            `resources/weather_img/${conditions[this._data["current_condition"]["condition"]]}.svg`
        );
    }
}

const app = new Application();
