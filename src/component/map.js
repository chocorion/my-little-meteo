/**
 * I don't use google map because I don't know how to use it without
 * giving my credit card to google.
 */
class Map {
    constructor(onClick) {
        this._map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([2.7, 47.2]),
                zoom: 5
            })
        });

        this._map.on('singleclick', event => {
            // convert coordinate to EPSG-4326
            const coordinate = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
            const lon = coordinate[0];
            const lat = coordinate[1];
            
            onClick(lon, lat);
        });

        // To solve little bug on map loading when display map for the first time
        document.querySelector("#toggle-map-button").addEventListener(
            'click',
            () => {setTimeout(() => {this._map.updateSize()}, 200)}
        )
    }

}