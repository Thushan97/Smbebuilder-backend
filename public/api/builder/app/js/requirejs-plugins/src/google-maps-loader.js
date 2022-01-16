define( [
    'jquery',
    'async!http://maps.google.com/maps/api/js?v=3&libraries=places&callback=define'
], function (
$
) {
    this.geocoder = new google.maps.Geocoder();
    new google.maps.places.Autocomplete($('#location'));
});