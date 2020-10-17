class Apicarto extends LocationAPIWrapper {
    constructor() {
        super("https://apicarto.ign.fr/api/codes-postaux/communes/");
    }

    _getCityCodeUrl(cityCode) {
        return this._apiUrl + cityCode;
    }

    _parse(data) {
        const name = data[0].nomCommune;

        if (name === undefined)
            throw new Error("Error while parsing location data : City name is undefined !");

        return name;
    }
}