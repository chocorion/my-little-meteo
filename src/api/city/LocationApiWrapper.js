class LocationAPIWrapper {
    constructor(apiUrl) {
        if (this.constructor === LocationAPIWrapper)
            throw new Error("Abstract interface can't be implemented directly");
            
        this._apiUrl = apiUrl;
    }
     
    getLocationFromCode(cityCode) {
        return new Promise((resolve, reject) => {
            get(this._getCityCodeUrl(cityCode))
            .then(result => resolve(this._parse(result)))
            .catch(error => reject(error));
        });
    }

    _getCityCodeUrl(cityCode) {
        throw new Error("_getCityCodeUrl method must be implemented !");
    }

    _parse(data) {
        throw new Error("_parse method must be implemented !");
    }
}