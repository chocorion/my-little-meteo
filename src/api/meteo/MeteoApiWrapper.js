class MeteoAPIWrapper {
    constructor(apiUrl) {
        if (this.constructor === MeteoAPIWrapper)
            throw new Error("Abstract interface can't be implemented directly");

        this._apiUrl = apiUrl;
        this._numberOfDays = 0;

        this._meteo = {
            city: {},
            conditions: {}
        }
    }

    getDayInformations(day) {
        if (day < 0 || day >=this._numberOfDays) 
            throw new Error(`Can't get information for day ${day}, there is only ${this._numberOfDays} days.`);
            
        return this._meteo.conditions[day];
    }

    getCityInformations() {
        return this._meteo.city;
    }

    refreshByCity(cityName) {
        return new Promise((resolve, reject) => {
            get(this._getCityUrl(cityName))
                .then(data => {
                    this._parse(data);
                    resolve();
                })
                .catch(error => {
                    console.error(error);
                    reject();
                });
        }); 
    }

    refreshByCoord(lon, lat) {
        return new Promise((resolve, reject) => {
            get(this._getCoordUrl(lon, lat))
                .then(data => {
                    this._parse(data);
                    resolve();
                })
                .catch(error => {
                    console.error(error);
                    reject();
                });
        }); 
    }

    _parse(url) {
        throw new Error("_parse method must be implemented !");
    }
    
    _getCityUrl(cityName) {
        throw new Error("_getCityUrl method must be implemented !");
    }
    
    _getCoordUrl(lon, lat) {
        throw new Error("_getCoordUrl method must be implemented !");
    }
}