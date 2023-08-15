var canvas = document.getElementById("mapCanvas");
  var ctx = canvas.getContext("2d");
  var map = null;

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locateSuccess, locateFail);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function loadMap() {
    map = new Microsoft.Maps.Map(document.getElementById("myMap"), {
      credentials: "Alla934zpH5MviQ4XixAhhAZ6bM0dXX0qZRr4D2hqqZjVuXS3HXZAla4_L5S5r-6"
    });
  }

  function locateSuccess(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    if (!map) {
      loadMap();
    }

    //Load the spatial math module
    Microsoft.Maps.loadModule("Microsoft.Maps.SpatialMath", function () {
      //Request the user's location
      navigator.geolocation.getCurrentPosition(function (position) {
          var loc = new Microsoft.Maps.Location(latitude, longitude);

          //Create an accuracy circle
          var path = Microsoft.Maps.SpatialMath.getRegularPolygon(loc, position.coords.accuracy, 36,  Microsoft.Maps.SpatialMath.Meters);
          var poly = new Microsoft.Maps.Polygon(path);
          map.entities.push(poly);
    });
    });

    var center = new Microsoft.Maps.Location(latitude, longitude);
    map.setView({ center: center, zoom: 15 });

    // Update location display
    var timestampDisplay = document.getElementById("timestamp");
    var latitudeDisplay = document.getElementById("latitude");
    var longitudeDisplay = document.getElementById("longitude");
    timestampDisplay.textContent = new Date().toString();
    latitudeDisplay.textContent = latitude.toFixed(6);
    longitudeDisplay.textContent = longitude.toFixed(6);

    // Add a pushpin and label to Bing map
    var userLocation = new Microsoft.Maps.Pushpin(center, { color: 'blue' });
    map.entities.push(userLocation);

    var label = new Microsoft.Maps.Infobox(center, { title: 'You are here!', visible: true });
    map.entities.push(label);
  }

  function locateFail() {
    alert("Geolocation failed. Please check your browser settings.");
  }

  window.onload = function () {
    loadMap();
  };