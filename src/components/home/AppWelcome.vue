<template>
  <div class="container-main">
    <div>
      <img src="@/assets/img/pika-pika.png" width="320" />
    </div>
    <h1 class="mt-10">Welcome to Pokédex</h1>
    <div class="mt-8">
      <p class="first-paragraph">
        The digital encyclopedia created by Professor Oak is an invaluable tool
        to Trainers in the Pokémon world.
      </p>
    </div>
    <div class="mt-10">
      <app-button @click.native="$emit('changeStep', 2)" text="Get started" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.first-paragraph {
  text-align: center;
  max-width: 600px;
}
</style>
