class ApiDataInterface {
    constructor(apiUrl) {
        if (this.constructor === ApiDataInterface) {
            throw new TypeError("Abstract interface can't be implemented directly");
        }

        this._apiUrl = apiUrl;
        this._numberOfDays = 0;

        this._meteo = {
            city: {},
            conditions: {}
        }
    }

    getDayInformations(day) {
        if (day < 0 || day >=this._numberOfDays) 
            throw new Exception(`Can't get information for day ${day}, there is only ${this._numberOfDays} days.`);
        
        return this._meteo.conditions[day];
    }

    getCityInformations() {
        return this._meteo.city;
    }

    refreshCity(cityName) {
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

    refreshCoord(lon, lat) {
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
        throw new Exception("_parse method must be implemented !");
    }
    
    _getCityUrl(cityName) {
        throw new Exception("_getCityUrl method must be implemented !");
    }
    
    _getCoordUrl(lon, lat) {
        throw new Exception("_getCoordUrl method must be implemented !");
    }
}