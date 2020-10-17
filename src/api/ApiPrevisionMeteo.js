class APIPrevisionMeteo extends ApiDataInterface {
    constructor() {
        super("https://www.prevision-meteo.ch/services/json/");
        this._numberOfDays = 5;
    }

    _parse(data) {
        this._meteo = {};
        this._meteo.conditions = {};
        
        this._extractCityInformation(data.city_info);

        for (let day = 0; day < this._numberOfDays; day++) 
            this._extractDayInformation(data[`fcst_day${i}`], i);
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
        currentDay.averageConditino = dayData.condition;

        for (const hour of dayNumber.hourly_data)
            this._extractHourInformation(hour, dayData.hourly_data[hour]);
    }

    _extractHourInformation(hour, data) {
        const intHour = +hour.split("H")[0];
        this._meteo.conditions.hours[intHour] = {};

        const currentHour = this._meteo.conditions.hours[intHour];

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
}