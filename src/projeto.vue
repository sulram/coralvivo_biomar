<template>
  <div class="single-projeto" v-if="content">
    
    <div class="title">
      {{content.nome}}
    </div>

    <button v-on:click="$emit('backToMenu')">Voltar</button>

    <img v-bind:src="thumb">
    
  </div>
</template>


<script>
  
  import fs from 'fs'
  import yaml from 'js-yaml'

  export default {
    
    data () {
        return {
          content: null
        }
      },

      props: ['arquivo'],

      mounted: function(){

        this.content = yaml.safeLoad(fs.readFileSync(store.get('dataPath') + this.arquivo, 'utf8'));

      },

      methods: {

      },

      computed: {
        thumb () {
          return store.get('pGalleryPath') + this.content.fotos[0]
        }
      }
  }

</script>