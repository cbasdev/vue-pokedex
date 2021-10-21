<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import Vue from 'vue'
const default_layout = 'default'

export default Vue.extend({
  name: 'App',
  components: {},
  mounted() {
    this.getTitle(this.$route)
  },
  methods: {
    getTitle(route) {
      document.title = `${route.meta.title} | Pokedex`
    },
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout || default_layout}-layout`
    },
  },
  watch: {
    $route(to) {
      this.getTitle(to)
    },
  },
})
</script>

<style lang="scss"></style>
