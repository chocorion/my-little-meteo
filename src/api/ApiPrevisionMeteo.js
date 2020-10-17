class APIPrevisionMeteo extends ApiDataInterface {
    constructor() {
        super("https://www.prevision-meteo.ch/services/json/");
        this._numberOfDays = 5;

        this._cityNotFoundError = "11";
    }

    _parse(data) {
        console.log(data);
        this._checkErrors(data);

        this._meteo = {};
        this._meteo.conditions = {};
        
        this._extractCityInformation(data.city_info);

        for (let day = 0; day < this._numberOfDays; day++) 
            this._extractDayInformation(data[`fcst_day_${day}`], day);
    }

    _checkErrors(data) {
        if (data.errors !== undefined) {
            if (data.errors[0].code === this._cityNotFoundError) 
                throw new Error("City no found !");
        }
    }

    _extractCityInformation(cityData) {
        this._meteo.city = {};

        this._meteo.city.name       = cityData.name;
        this._meteo.city.country    = cityData.country;
        this._meteo.city.lat        = cityData.latitude;
        this._meteo.city.lon        = cityData.longitude;
        this._meteo.city.sunrise    = cityData.sunrise;
        this._meteo.city.sunset     = cityData.sunset;
    }

    _extractDayInformation(dayData, dayNumber) {
        this._meteo.conditions[dayNumber] = {};
        this._meteo.conditions[dayNumber].hours = {};

        const currentDay = this._meteo.conditions[dayNumber];

        currentDay.date = dayData.date;
        currentDay.day = dayData.day_long;
        currentDay.temperatureMin = dayData.tmin;
        currentDay.temperatureMax = dayData.tmax;
        currentDay.averageCondition = dayData.condition;

        for (const hour in dayData.hourly_data)
            this._extractHourInformation(hour, dayData.hourly_data[hour], dayNumber);
    }

    _extractHourInformation(hour, data, day) {
        const intHour = +hour.split("H")[0];
        this._meteo.conditions[day].hours[intHour] = {};

        const currentHour = this._meteo.conditions[day].hours[intHour];

        currentHour.condition = data.CONDITION;
        currentHour.temperature = data.TMP2m;
        currentHour.humidity = data.RH2m;
        currentHour.windSpeed = data.WNDSPD10m;
        currentHour.windDirection = data.WNDDIRCARD10;
    }

    _getCityUrl(cityName) {
        return `${this._apiUrl}${cityName}`;
    }

    _getCoordUrl(lon, lat) {
        return `${this._apiUrl}lat=${lat}lng=${lon}`
    }

    refreshByCoord(lon, lat) {
        return new Promise((resolve, reject) => {
            super.refreshByCoord(lon, lat)
            .then(() => {
                this._meteo.city.name = `
                    lat : ${Math.round(lat * 100)/100}
                    lon : ${Math.round(lon * 100)/100}`;
                resolve();
            }).catch(error => reject(error));
        });
    }
}