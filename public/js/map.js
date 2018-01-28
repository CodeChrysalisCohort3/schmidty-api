window.onload = () => {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: { lat: 0, lng: 0 },
  });
  
function initMap() {
  

  document.getElementById('submit').addEventListener('click', () => {
    geocodeAddress(map);
  });
}

function geocodeAddress(map) {
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
    });
}

console.log(1);
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
      json.map((pointer) => {
        const marker = new google.maps.Marker({
          position: { lat: pointer.latitude, lng: pointer.longitude },
          title: pointer.address,
        });
        // To add the marker to the map, call setMap();
        marker.setMap(map);
      });
    });
};
