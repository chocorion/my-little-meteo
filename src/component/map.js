class Map {
    constructor() {
        this._map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([37.41, 8.82]),
                zoom: 4
            })
        });

        // To solve little bug on map loading when display map for the first time
        document.querySelector("#toggle-map-button").addEventListener(
            'click',
            () => {setTimeout(() => {this._map.updateSize()}, 200)}
        )
    }

}