<template>
  <div id="app-main" v-bind:class="[state, substate]" v-on:click="screensaverClearTimer">
    
    <!-- SCREENSAVER -->
    
    <transition name="fade">
    <saver ref="saver" v-if="state === 'saver'"></saver>
    </transition>

    <!-- GALERIA -->

    <galeria ref="galeria"></galeria>

    <!-- MAPS -->

    <maps ref="maps"></maps>

    <!-- PANEL -->

    <div id="panel">
      
      <div class="frame"></div>

      <transition name="fade">
        <div class="coral-footer" v-if="substate === 'lista-projetos'"></div>
      </transition>

      <!-- INDEX -->

      <transition name="fade">

        <div class="panel-inside-main" v-if="state === 'index'">
          
          <div class="main-tabs columns is-vcentered has-text-centered main-tabs">
            <div class="column">
              <img
                v-bind:class="{ active: substate === 'lista-projetos' }"
                v-on:click="selectSubstate('lista-projetos')"
                src="img/tab-projetos.svg"
                class="tab tab-projetos"
              >
              <img src="img/coraline.svg" class="line line-projetos">
            </div>
            <div class="column">
              <img
                v-bind:class="{ active: substate === 'lista-ucs' }"
                v-on:click="selectSubstate('lista-ucs')"
                src="img/tab-ucs.svg"
                class="tab tab-ucs"
              >
              <img src="img/coraline.svg" class="line line-ucs">
            </div>
          </div>
          
          <!-- LISTAS -->

          <transition name="fade">
            <div class="panel-inside-content" v-if="substate === 'lista-projetos'">
              <template v-if="contentIndex">
                <div class="lista-projetos">
                  <article class="has-text-centered" v-for="(item, index) in contentIndex['um-projeto']">
                    <a v-on:click="selectProject(index)" v-html="item.nome"></a>
                  </article>
                </div>
              </template>
            </div>
          </transition>
          
          <transition name="fade">
            <div class="panel-inside-content" v-if="substate === 'lista-ucs'">
              <div class="sobre-ucs has-text-centered">
                Visam proteger populações, habitats e ecossistemas, preservando o patrimônio biológico. São de dois tipos: de proteção integral, onde não é possível o consumo, coleta ou dano aos recursos naturais; e de uso sustentável, onde é possível a coleta controlada de recursos naturais de forma a assegurar sua perenidade.
              </div>
              <template v-if="contentIndex">
                <div class="lista-ucs">
                  <article class="has-text-centered" v-for="(item, index) in contentIndex['uma-uc']">
                    <a v-on:click="selectUC(index)" v-html="item.nome"></a>
                  </article>
                </div>
              </template>
            </div>
          </transition>

        </div>
      </transition>
      
      <!-- PROJETO -->

      <transition name="fade">
        <div class="panel-inside-main" v-if="state === 'um-projeto'">
          <projeto
            v-on:backToMenu="backToMenu"
            v-on:createGallery="createGallery"
            v-on:focusArea="focusArea"
            v-bind:arquivo="contentIndex['um-projeto'][selecionado].arquivo"
          ></projeto>
        </div>
      </transition>

      <!-- UC -->

      <transition name="fade">
        <div class="panel-inside-main" v-if="state === 'uma-uc'">
          <unidade
              v-on:backToMenu="backToMenu"
              v-on:createGallery="createGallery"
              v-on:focusArea="focusArea"
              v-bind:arquivo="contentIndex['uma-uc'][selecionado].arquivo"
          ></unidade>
        </div>
      </transition>

    </div>

  </div>
</template>

<script>

import saver from './components/saver.vue'
import galeria from './components/galeria.vue'
import projeto from './components/projeto.vue'
import unidade from './components/unidade.vue'
import maps from './components/maps.vue'


export default {

  data () {
    return {

      state: 'index',
      substate: 'lista-projetos',
      selecionado: null,
      tab: null,
      contentIndex: null,

      screensaver_counter: 0,
      screensaver_seconds: store.get('screensaver_seconds'),
      screensaver_interval: null
    }
  },

  components: {
    saver: saver,
    galeria: galeria,
    projeto: projeto,
    unidade: unidade,
    maps: maps
  },

  mounted: function(){
  	console.log("app mounted")
    this.screensaverStartTimer()
  },

  methods: {

    checkData() {
      console.log('index',this.contentIndex)
    },

    screensaverStartTimer() {
      this.screensaver_interval = setInterval(this.screensaverCountDown, 1000);
    },

    screensaverStopTimer() {
      clearInterval(this.screensaver_interval)
      this.screensaver_interval = null
      this.screensaver_counter = 0
    },

    screensaverClearTimer() {
      this.screensaver_counter = 0
      console.log('screensaverClearTimer()')
      if(this.state == 'saver'){
        this.state = 'index'
        this.substate = 'lista-projetos'
        this.screensaverStartTimer()
      }
    },

    screensaverCountDown() {
      this.screensaver_counter++
      console.log(this.screensaver_counter)
      if(this.screensaver_counter >= this.screensaver_seconds){
        if(this.substate == 'galeria')
          this.$refs.galeria.closeGallery()
        this.state = 'saver'
        this.substate = null
        this.screensaverStopTimer()
      }
    },

    selectSubstate(val) {
      this.substate = val
    },

    selectProject(val) {
      this.state = 'um-projeto'
      this.substate = 'area'
      this.tab = 'about'
      this.selecionado = val
      this.focusArea()
      console.log(val)
    },

    selectUC(val) {
      this.state = 'uma-uc'
      this.substate = 'area'
      this.tab = 'sobre'
      this.selecionado = val
      this.focusArea()
      console.log(val)
    },

    focusArea(){
      if(this.substate == 'galeria'){
        this.closeGallery()
      }
      this.$refs.maps.focusArea(this.contentIndex[this.state][this.selecionado].geodata)
    },

    createGallery(fotos, legendas) {
      
      if(this.substate == 'galeria') return

      this.selectSubstate('galeria')

      var path = (this.state == 'um-projeto') ? store.get('pGalleryPath') : store.get('uGalleryPath')

      this.$refs.galeria.createGallery(fotos, legendas, path)
      //this.$refs.maps.unfocusArea()

    },

    closeGallery() {
      
      if(this.substate == 'area') return

      this.selectSubstate('area')

      this.$refs.galeria.closeGallery()

    },

    backToMenu(e){

      // check if gallery is open
      if(this.substate == 'galeria'){
        this.$refs.galeria.closeGallery()
      }

      // check if area is focused
      if(this.substate == 'area'){
        this.$refs.maps.unfocusArea()
      }

      // change substates
      this.substate = this.state === 'um-projeto' ? 'lista-projetos' : 'lista-ucs'
      this.selecionado = null
      this.tab = null
      // change state
      this.state = 'index'
    }
  }
}
</script>
