<template>
  <div id="map"></div>
</template>


<script>

export default {

  data () {
    return {
      map: null,
      strictBounds: null
    }
  },

  mounted: function(){
    this.buildMap()
  },

  methods: {

    buildMap(){

      var initial_location = {lat: -14.000, lng: -37.000};

      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: initial_location,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        disableDefaultUI: true,
        minZoom: 3,
        //zoomControl: true,
        //zoomControlOptions: {
        //  position: google.maps.ControlPosition.LEFT_BOTTOM
        //},
        //scaleControl: true
        styles: [
          {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }
        ]
      })

      this.strictBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-60.0, -180.0),
      new google.maps.LatLng(60.0, 180.0));
      

      // Listen for the dragend event
      google.maps.event.addListener(this.map, 'dragend', this.mapDragEnd);

    },

    mapDragEnd() {
      
      console.log(this.map,this.strictBounds)

      if (this.strictBounds.contains(this.map.getCenter())) return;

        // We're out of bounds - Move the map back within the bounds

        var c = this.map.getCenter(),
           x = c.lng(),
           y = c.lat(),
           maxX = this.strictBounds.getNorthEast().lng(),
           maxY = this.strictBounds.getNorthEast().lat(),
           minX = this.strictBounds.getSouthWest().lng(),
           minY = this.strictBounds.getSouthWest().lat();

        if (x < minX) x = minX;
        if (x > maxX) x = maxX;
        if (y < minY) y = minY;
        if (y > maxY) y = maxY;

        this.map.setCenter(new google.maps.LatLng(y, x));
    }
  }

}
</script>