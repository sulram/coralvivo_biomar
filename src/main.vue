<template>
  <h2>Hello from {{text}}</h2>
</template>

<script>
export default {
  data () {
    return {
       text: '',
       state: 'menu'
    }
  },
  mounted: function(){
  	console.log("app mounted")
  	var uluru = {lat: -14.000, lng: -37.000};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru,
      mapTypeId: 'satellite',
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      scaleControl: true
    });
  }
}
</script>
