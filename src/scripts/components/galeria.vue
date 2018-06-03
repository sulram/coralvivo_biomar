<template>

  <div class="galeria-wrapper">
    
      <!-- Root element of PhotoSwipe. Must have class pswp. -->
      <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

          <!-- Background of PhotoSwipe. 
               It's a separate element as animating opacity is faster than rgba(). -->
          <div class="pswp__bg"></div>

          <!-- Slides wrapper with overflow:hidden. -->
          <div class="pswp__scroll-wrap">

              <!-- Container that holds slides. 
                  PhotoSwipe keeps only 3 of them in the DOM to save memory.
                  Don't modify these 3 pswp__item elements, data is added later on. -->
              <div class="pswp__container">
                  <div class="pswp__item"></div>
                  <div class="pswp__item"></div>
                  <div class="pswp__item"></div>
              </div>

              <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
              <div class="pswp__ui pswp__ui--hidden">

                  <div class="pswp__top-bar">

                      <!--  Controls are self-explanatory. Order can be changed. -->

                      <div class="pswp__counter"></div>

                      <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

                      <button class="pswp__button pswp__button--share" title="Share"></button>

                      <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                      <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                      <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                      <!-- element will get class pswp__preloader--active when preloader is running -->
                      <div class="pswp__preloader">
                          <div class="pswp__preloader__icn">
                            <div class="pswp__preloader__cut">
                              <div class="pswp__preloader__donut"></div>
                            </div>
                          </div>
                      </div>
                  </div>

                  <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                      <div class="pswp__share-tooltip"></div> 
                  </div>

                  <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                  </button>

                  <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                  </button>

                  <div class="pswp__caption">
                      <div class="pswp__caption__center"></div>
                  </div>

              </div>

          </div>

      </div>
    
  </div>

</template>


<script>
  
  import fs from 'fs'
  import probe from 'probe-image-size'

  export default {
    
    data () {
        return {
          pswp: null
        }
      },

      mounted: function(){

        //this.content = yaml.safeLoad(fs.readFileSync(store.get('dataPath') + this.arquivo, 'utf8'));

      },

      methods: {

        createGallery(fotos,legendas) {

          var items = []

          fotos.map(function(el,i){
            var data = fs.readFileSync(store.get('pGalleryPath') + el)
            var dimensions = probe.sync(data)
            items.push({
              src: store.get('pGalleryPath') + el,
              w: dimensions.width,
              h: dimensions.height,
              title: (legendas !== null && legendas !== undefined) ? legendas[i] : el
            })
          })

          var options = {

            modal: false,
            
            closeEl: false,
            fullscreenEl: false,
            shareEl: false,
            zoomEl: false,
            clickToCloseNonZoomable: false,
            tapToClose: false,
            closeElClasses: [],

            pinchToClose: false,
            closeOnScroll: false,
            closeOnVerticalDrag: false,

          }

          var pswpElement = document.querySelectorAll('.pswp')[0]

          this.pswp = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options)
          this.pswp.init()

          console.log(items)
        },

        closeGallery() {
          
          this.pswp.close()
          this.pswp = null

        }

      },

      computed: {
        
        logoPath() {
          return store.get('uLogoPath')
        },

      }
  }

</script>