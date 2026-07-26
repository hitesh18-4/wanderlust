// listing + mapToken are passed in via data-attributes on #map-data (see show.ejs)
// to keep this script free of inline EJS template tags.
const mapDataEl = document.getElementById("map-data");
const mapToken = mapDataEl.dataset.token;
const listing = JSON.parse(mapDataEl.dataset.listing);

if (mapToken) {
  mapboxgl.accessToken = mapToken;

  const coordinates =
    listing.geometry && listing.geometry.coordinates
      ? listing.geometry.coordinates
      : [77.209, 28.6139]; // fallback: New Delhi

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: coordinates,
    zoom: 9,
  });

  const marker = new mapboxgl.Marker({ color: "#fe424d" })
    .setLngLat(coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h6>${listing.title}</h6><p>Exact location provided after booking</p>`
      )
    )
    .addTo(map);
} else {
  document.getElementById("map").innerHTML =
    '<p class="text-muted text-center pt-5">Map unavailable — add a MAP_TOKEN to enable it.</p>';
}
