<template>

  <div class="single-projeto" v-if="content">
    
    <div class="single-projeto-header columns is-vcentered has-text-centered">
      <div class="column">
        <div class="title" v-html="content.nome"></div>
        <div class="desde fancy">
          <span>desde {{ content.desde }}</span>
        </div>
      </div>
      <div class="column is-narrow" v-if="content.logo">
        <div class="marca">
          <img v-bind:src="logo" height="120">
        </div>
      </div>
    </div>

    <div style="height: 10px;"></div>

    <div class="single-projeto-content is-uc columns">

      <div class="content-main column is-8">
        
        <transition name="fade">
          <div class="content-main-page" v-if="state === 'sobre'" v-html="content.sobre" v-bind:style="{ fontSize: content.smalltext ? '14px' : '16px' }"></div>
        </transition>

        <transition name="fade">
          <div class="content-main-page" v-if="state === 'informacoes'">
            <div style="height:40px;"></div>
            <p v-for="(value, prop) in content.informacoes" style="margin-bottom:10px;">
              <strong class="is-uppercase is-size-7">{{ labels[prop] }}</strong><br><span v-html="value"></span>
            </p>
          </div>
        </transition>

        <transition name="fade">
          <div class="content-main-page" v-if="state === 'contato'">
            <div style="height:40px;"></div>
            <p v-for="(value, prop) in content.contatos" style="margin-bottom:10px;"><strong class="is-uppercase is-size-7">{{ labels[prop] }}</strong><br><span v-html="value"></span></p>
          </div>
        </transition>

      </div>

      <div class="content-nav column is-4 has-text-centered">
        
        <div class="single-projeto-marcas is-uc">
          <div class="tab" v-if="content.orgaogestor">
            <p>Órgão Gestor</p>
            <img v-bind:src="logoPath + content.orgaogestor">
          </div>
        </div>

        <div style="height:40px;"></div>

        <ul>
          <li>
            <a v-on:click="selectTab('sobre')">Sobre</a>
            <img src="img/coraline.svg" class="line" v-bind:class="{ active: state === 'sobre' }">
          </li>
          <li>
            <a v-on:click="selectTab('informacoes')">Informações</a>
            <img src="img/coraline.svg" class="line" v-bind:class="{ active: state === 'informacoes' }">
          </li>
          <li>
            <a v-on:click="selectTab('contato')">Contato</a>
            <img src="img/coraline.svg" class="line" v-bind:class="{ active: state === 'contato' }">
          </li>
        </ul>

        <a class="back-button" v-on:click="$emit('backToMenu')">
          <img src="img/botao-coral.png">
          <br><span>voltar</span>
        </a>

      </div>

    </div>

    <div class="single-projeto-vis-selector">
      <div class="columns is-vcentered">
        <div class="column">
          <div class="vis-opt vis-area">
            <a  v-on:click="focusArea">
              <img src="./img/botao-map.png">
            </a>
          </div>
        </div>
        <div class="column">
          <div class="vis-opt vis-galeria">
            <a v-on:click="openGallery">
              <img v-bind:src="thumb">
            </a>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column has-text-centered font-display vis-area-label">
          Localização
          <img src="img/coraline.svg" class="line">
        </div>
        <div class="column has-text-centered font-display vis-galeria-label">
          Fotos
          <img src="img/coraline.svg" class="line">
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
          state: 'sobre',
          labels: {
              nomecompleto: "Nome da Unidade",
              uf: "Unidade Federal",
              doc: "Data e Documento de criação",
              orgao: "Órgão Gestor",
              area: "Área em hectares",
              site: "Site",
              endereco: "Endereço",
              email: "E-mail",
              telefone: "Telefone",
              facebook: "Facebook",
              instagram: "Instagram",
              twitter: "Twitter",
              youtube: "YouTube",
              flickr: "Flickr"
          }
        }
      },

      props: ['arquivo'],

      mounted: function(){

        this.content = yaml.safeLoad(fs.readFileSync(store.get('dataPath') + this.arquivo, 'utf8'));

      },

      methods: {

        selectTab(val) {
          this.state = val
        },

        openGallery(){
          
          this.$emit('createGallery', this.content.fotos, this.content.legendas)
          
        },

        focusArea() {
          
          this.$emit('focusArea')

        }

      },

      computed: {
        thumb() {
          return store.get('uGalleryPath') + this.content.fotos[0]
        },

        logoPath() {
          return "img/marcas/"
        },

        logo() {
          return "img/marcas/" + this.content.logo
        }
      }
  }

</script>