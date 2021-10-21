<template>
  <div>
    <div v-if="step === 2">
      <app-welcome @changeStep="changeStep" />
    </div>
    <div v-if="step === 1">
      <app-pokedex />
    </div>
  </div>
</template>

<script>
import AppWelcome from '@/components/home/AppWelcome.vue'
import AppPokedex from '@/components/home/AppPokedex.vue'
export default {
  name: 'Home',
  data() {
    return {
      step: 1,
    }
  },
  methods: {
    changeStep(step) {
      this.step = step
    },
  },
  components: {
    AppWelcome,
    AppPokedex,
  },
}
</script>
<style lang="scss" scoped></style>
