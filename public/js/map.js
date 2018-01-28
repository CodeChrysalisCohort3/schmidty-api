const markers = [];
let map;

function removeMarkers() {
  fetch(
    'http://localhost:3000/api/geocodes',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    },
  ).then(() => {
    for (let i = 0; i < markers.length; i += 1) {
      markers[i].setMap(null);
    }
  });
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: { lat: 0, lng: 0 },
  });

  google.maps.event.addDomListener(
    document.getElementById('delete'),
    'click',
    removeMarkers,
  );

  document.getElementById('submit').addEventListener('click', () => {
    geocodeAddress();
  });
}

function geocodeAddress() {
  const address = document.getElementById('address').value;
  fetch(
    'http://localhost:3000/api/geocodes',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ address }),
    },
  )
    .then(response => response.json())
    .then((json) => {
      const marker = new google.maps.Marker({
        position: { lat: json.latitude, lng: json.longitude },
        title: json.address,
      });
      // To add the marker to the map, call setMap();
      marker.setMap(map);

      markers.push(marker);
    });
}

// load initially all existing geocodes
fetch(
  'http://localhost:3000/api/geocodes',
  {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  },
)
  .then(response => response.json())
  .then((json) => {
    json.forEach((pointer) => {
      const marker = new google.maps.Marker({
        position: { lat: pointer.latitude, lng: pointer.longitude },
        title: pointer.address,
      });
      // To add the marker to the map, call setMap();
      marker.setMap(map);

      markers.push(marker);
    });
  });
