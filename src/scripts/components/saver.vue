<template>
  
  <div v-if="images">
    <div class="slideshow">
      <div class="slideshow-image" v-for="(item, index) in images" v-bind:style="{ 'background-image': 'url(\'' + images[index] + '\')' }"></div>
    </div>
  </div>

</template>


<script>
  
  import fs from 'fs'
  import yaml from 'js-yaml'

  export default {
    
    data () {
        return {
          images: [],
          slideshow: null
        }
      },

      created: function(){

        var _images = []

        yaml.safeLoad(fs.readFileSync(store.get('dataPath') + 'saver.yml', 'utf8')).fotos.map(function(el,i){
          _images.push(store.get('pGalleryPath') + el)
        })

        function shuffle(a) {
          for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
          }
          return a;
        }

        this.images = shuffle(_images)

      },

      mounted: function(){


      },

      beforeDestroy: function() {

      },

      methods: {

        start() {

          

        },

        stop() {
          
          //this.slideshow.stop()

        }

      },

      computed: {
        
        imgPath() {
          return store.get('pGalleryPath')
        },

      }
  }

</script>