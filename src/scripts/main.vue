<template>
  <div id="app-main" v-bind:class="[state, substate]" v-on:click="clearTimer">
    
    <maps></maps>

    <div id="panel">
      
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
          <projeto v-on:backToMenu="backToMenu" v-bind:arquivo="contentIndex['um-projeto'][selecionado].arquivo"></projeto>
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

import projeto from './components/projeto.vue'
import maps from './components/maps.vue'

export default {

  data () {
    return {

      state: 'index',
      substate: 'lista-projetos',
      selecionado: null,
      tab: null,
      contentIndex: null,

      counter: 0,
      maxCounter: 120,
      interval: null
    }
  },

  components: {
    projeto: projeto,
    maps: maps
  },

  mounted: function(){
  	console.log("app mounted")
    this.startTimer()
  },

  methods: {

    checkData() {
      console.log('index',this.contentIndex)
    },

    startTimer() {
      this.interval = setInterval(this.countDown, 1000);
    },

    stopTimer() {
      clearInterval(this.interval)
      this.interval = null
      this.counter = 0
    },

    clearTimer() {
      this.counter = 0
      console.log('clearTimer()')
      if(this.state == 'saver'){
        this.state = 'index'
        this.substate = 'lista-projetos'
        this.startTimer()
      }
    },

    countDown() {
      this.counter++
      console.log(this.counter)
      if(this.counter >= this.maxCounter){
        this.state = 'saver'
        this.substate = null
        this.stopTimer()
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
    }
  }
}
</script>