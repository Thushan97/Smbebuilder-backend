html = '{ var map = new google.maps.Map(document.getElementById(' + gmap + '), { zoom: 8, center: {lat: ' + latNewData + ', lng: ' + lngNewData + '} }); var geocoder = new google.maps.Geocoder; var infowindow = new google.maps.InfoWindow; function createmap() { geocodeLatLng(geocoder, map, infowindow); }); google.maps.event.addDomListener(window, 'load', createmap); function geocodeLatLng(geocoder, map, infowindow) { // var input = document.getElementById('latlng').value; // var latlngStr = input.split(',', 2); var latlng = {lat: latNewData), lng: lngNewData}; geocoder.geocode({'location': latlng}, function(results, status) { if (status === google.maps.GeocoderStatus.OK) { if (results[1]) { map.setZoom(11); var marker = new google.maps.Marker({ position: latlng, map: map }); infowindow.setContent(results[1].formatted_address); infowindow.open(map, marker); } else { console.log('No results found'); } } else { console.log('Geocoder failed due to: ' + status); } }); } } '