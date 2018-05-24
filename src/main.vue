<template>
  <div v-bind:class="[state, substate]">>
    <div id="map"></div> 
    <div id="panel" v-on:click="checkData">
      
      <div class="frame"></div>

      <transition name="fade">
        <div class="panel-inside-main " v-if="state === 'index'">
          
          <div class="columns has-text-centered main-tabs">
            <div class="column">
              <a v-on:click="selectSubstate('lista-projetos')">Projeto</a>
            </div>
            <div class="column">
              <a v-on:click="selectSubstate('lista-ucs')">Unidades de<br>Conservação</a>
            </div>
          </div>

          <transition name="fade">
            <div class="panel-inside-content" v-if="substate === 'lista-projetos'">
              <template v-if="contentIndex">
                <div class="lista-projetos">
                  <article class="has-text-centered" v-for="(item, index) in contentIndex['um-projeto']">
                    <a v-on:click="selectProject(index)">{{ item.nome }}</a>
                  </article>
                </div>
              </template>
            </div>
          </transition>
          
          <transition name="fade">
            <div class="panel-inside-content" v-if="substate === 'lista-ucs'">
              <template v-if="contentIndex">
                <div class="lista-ucs">
                  <article class="has-text-centered" v-for="(item, index) in contentIndex['uma-uc']">
                    <a v-on:click="selectUC(index)">{{ item.nome }}</a>
                  </article>
                </div>
              </template>
            </div>
          </transition>

        </div>
      </transition>

      <transition name="fade">
        <div class="panel-inside-main" v-if="state === 'um-projeto'">
          PROJETO
          <button v-on:click="backToMenu">Voltar</button>
        </div>
      </transition>

      <transition name="fade">
        <div class="panel-inside-main" v-if="state === 'uma-uc'">
          UC
          <button v-on:click="backToMenu">Voltar</button>
        </div>
      </transition>

    </div>
    <div id="gallery"></div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      map: null,
      state: 'index',
      substate: 'lista-projetos',
      selecionado: null,
      tab: null,
      contentIndex: null
    }
  },

  mounted: function(){
  	console.log("app mounted")
    this.buildMap()
  },

  methods: {

    checkData() {
      console.log('index',this.contentIndex)
    },

    selectSubstate(val) {
      this.substate = val
    },

    selectProject(val) {
      this.state = 'um-projeto'
      this.substate = 'area'
      this.tab = 'about'
      this.selecionado = val
      console.log(val)
    },

    selectUC(val) {
      this.state = 'uma-uc'
      this.substate = 'area'
      this.tab = 'sobre'
      this.selecionado = val
      console.log(val)
    },

    backToMenu(e){
      // change substates
      this.substate = this.state === 'um-projeto' ? 'lista-projetos' : 'lista-ucs'
      this.selecionado = null
      this.tab = null
      // change state
      this.state = 'index'
    },

    buildMap(){

      var uluru = {lat: -14.000, lng: -37.000};

      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru,
        mapTypeId: 'satellite',
        disableDefaultUI: true,
        //zoomControl: true,
        //zoomControlOptions: {
        //  position: google.maps.ControlPosition.LEFT_BOTTOM
        //},
        //scaleControl: true
      })

    }
  }
}
</script>
