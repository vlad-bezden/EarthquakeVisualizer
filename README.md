# Real-Time Earthquake Visualizer
Application provides real-time earthquake updates in the world based on USGS (U.S. Geological Survey) eathquake database. 

Application is using:
- RxJS 5 (beta).
- Node.js as a web and application server. It process web requests, so no 'Express', or 'Hapi', or 'Koa' needed.
- Leaflet - a JavaScript library for interactive map
- Since data that comes from USGS comes is JSONP, RxJS wraps it and creates Observable from it.

To run application 
- start server first. 
```
node server.js
```
- open application from browser
```
localhost:8180
```
## Additional Links
- [Earthquake.usgs.gov](http://earthquake.usgs.gov/earthquakes/feed/v1.0/)
- [RxJS](https://github.com/ReactiveX/rxjs)
- [Leaflet](http://leafletjs.com/)