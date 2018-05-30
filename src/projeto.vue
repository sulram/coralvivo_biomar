<template>

  <div class="single-projeto" v-if="content">
    
    <div class="single-projeto-header columns is-vcentered has-text-centered">
      <div class="column">
        <div class="title">
          {{content.nome}}
        </div>
        <div class="desde fancy">
          <span>desde {{ content.desde }}</span>
        </div>
      </div>
      <div class="column is-narrow">
        <div class="marca">
          <img v-bind:src="logo" height="120">
        </div>
      </div>
    </div>

    <div class="single-projeto-marcas columns">
      <div class="tab column is-narrow" v-if="content.proponentes">
        <p v-if="content.proponentes.length == 1">Proponente</p>
        <p v-if="content.proponentes.length > 1">Proponentes</p>
        <img v-for="(item, index) in content.proponentes" v-bind:src="logoPath + content.proponentes[index]">
      </div>
      <div class="tab column is-narrow" v-if="content.patrocinio">
        <p>Patrocínio</p>
        <img v-for="(item, index) in content.patrocinio" v-bind:src="logoPath + content.patrocinio[index]">
      </div>
    </div>

    <div class="single-projeto-content columns">

      <div class="content-main column is-8">
        
        <transition name="fade">
          <div class="content-main-page" v-if="state === 'sobre'">
            {{ content.sobre }}
          </div>
        </transition>

        <transition name="fade">
          <div class="content-main-page" v-if="state === 'resultados'">
            {{ content.resultados }}
          </div>
        </transition>

      </div>

      <div class="content-nav column is-4 has-text-centered">
        
        <ul>
          <li><a v-on:click="selectTab('sobre')">Sobre</a></li>
          <li><a v-on:click="selectTab('resultados')">Resultados</a></li>
          <li><a v-on:click="selectTab('colaboradores')">Colaboradores</a></li>
          <li><a v-on:click="selectTab('contato')">Contato</a></li>
        </ul>

        <button v-on:click="$emit('backToMenu')">Voltar</button>

      </div>

    </div>

    <div class="single-projeto-vis-selector">
      <div class="columns">
        <div class="column"></div>
        <div class="column">
          <img v-bind:src="thumb">
        </div>
      </div>
    </div>    
    
  </div>

</template>


<script>
  
  import fs from 'fs'
  import yaml from 'js-yaml'

  export default {
    
    data () {
        return {
          content: null,
          state: 'sobre'
        }
      },

      props: ['arquivo'],

      mounted: function(){

        this.content = yaml.safeLoad(fs.readFileSync(store.get('dataPath') + this.arquivo, 'utf8'));

      },

      methods: {
        selectTab(val) {
          this.state = val
        }
      },

      computed: {
        thumb() {
          return store.get('pGalleryPath') + this.content.fotos[0]
        },

        logoPath() {
          return store.get('uLogoPath')
        },

        logo() {
          return store.get('uLogoPath') + this.content.logo
        }
      }
  }

</script>