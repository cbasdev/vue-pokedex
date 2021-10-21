<template>
  <div class="container-main">
    <div>
      <img src="@/assets/img/pika-pika.png" width="320" />
    </div>
    <h1 class="mt-10">Welcome to Pokédex</h1>
    <div class=" w-1/2 mt-8">
      <p class="text-center">
        The digital encyclopedia created by Professor Oak is an invaluable tool
        to Trainers in the Pokémon world.
      </p>
    </div>
    <router-link to="/">
      <div class="mt-10">
        <app-button @click.native="$emit('changeStep', 2)" text="Get started" />
      </div>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
