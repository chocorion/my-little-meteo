class Application {
    constructor() {
        // You can use object that respect MeteoApiWrapper interface.
        this._apiWrapper = new APIPrevisionMeteo();
        
        this.onCitySearch       = this.onCitySearch.bind(this);
        this.onCoordinateSearch = this.onCoordinateSearch.bind(this);

        this._searchBar     = new SearchBar(this.onCitySearch);
        this._map           = new Map(this.onCoordinateSearch);
        this._collapseDays  = new CollapseDays();
        this._mainInsert    = new MainInsert();
    }

    onCoordinateSearch(lon, lat) {
        this._apiWrapper.refreshByCoord(lon, lat)
        .then(() => this.onResult());
    }

    onCitySearch(city) {
        this._apiWrapper.refreshByCity(city)
        .then(() => {
            this.onResult()
        })
        .catch(error => {
            // Little trick. Try to remove "le"/"la" before city name for helping api finding city.
            if (city !== undefined) {
                const splitted = city.split(" ");
                if (splitted.length > 1) {
                    this.onCitySearch(splitted[splitted.length - 1]);
                    return;
                }
            }

            document.querySelector("#error-city-not-found").classList.remove("hidden");
        });
    }

    onResult() {               
        document.querySelector("#mainContainer").classList.remove("hidden");
        document.querySelector("#error-city-not-found").classList.add("hidden");
        
        this.updateInformation();

        // Show with a timeout, just for style.
        setTimeout(() => {
            let d = document.querySelector("#day0-info")

            if (!d.classList.contains("show")) {
                document.querySelector("#daily-button-container:first-child button").click()
            }
        }, 1000);
    }

    updateInformation() {
        this._mainInsert.update(this._apiWrapper);
        this._collapseDays.updateCollapseInfos(this._apiWrapper);
    }
}

const app = new Application();
