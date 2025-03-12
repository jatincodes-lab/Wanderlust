let mapTokenId = mapToken;
mapboxgl.accessToken = mapTokenId;
const map = new mapboxgl.Map({
  style: "mapbox://styles/mapbox/light-v11",
  container: "map", // container ID
  center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 10, // starting zoom
});

const marker = new mapboxgl.Marker({
  color: "red",
})
  .setLngLat(coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
      .setHTML("<p>Excact Location provided after booking!!</p>")
      .setMaxWidth("300px")
  )
  .addTo(map);
