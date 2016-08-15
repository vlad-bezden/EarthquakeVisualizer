(function () {
    'use strict'

    const RELOAD_RATE = 5000;
    const QUAKE_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp';
    const Observable = Rx.Observable;

    function loadJSONP(url) {
        const script = document.createElement('script');
        script.src = url;
        const head = document.getElementsByTagName('head')[0];
        head.appendChild(script);
    }

    function transform(quake) {
        return {
            code: quake.properties.code,
            lng: quake.geometry.coordinates[0],
            lat: quake.geometry.coordinates[1],
            size: quake.properties.mag * 10000
        };
    }

    function drawMap(quake) {
        L.circle([quake.lat, quake.lng], quake.size)
            .addTo(map);
    }

    const map = L.map('map')
        .setView([33.858631, -118.279602], 7);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
        .addTo(map);

    const interval$ = Observable.interval(RELOAD_RATE);

    const quakesWebService$ = Observable.create(observer => {
        window.eqfeed_callback = response => {
            observer.next(response)
            observer.complete()
        }
        loadJSONP(QUAKE_URL);
    })
        .retry(3);

    const startInterval$ = interval$
        .startWith(0)
        .switchMapTo(quakesWebService$);

    startInterval$
        .mergeMap(dataset => Observable.from(dataset.features))
        .map(quake => transform(quake))
        .distinctKey('code')
        .subscribe(quake => drawMap(quake));

} ())