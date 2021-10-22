<template>
  <div>
    <div v-if="!loadingDetails">
      <div class="bg-image">
        <div class="container-img-pokemon">
          <div>
            <img
              :src="pokemonDetails.sprites.other.dream_world.front_default"
            />
          </div>
        </div>
      </div>
      <div class="box-details">
        <div class="item">
          <div class="box-pokemon">
            <p>Name:</p>
            <label>{{ pokemonDetails.name }}</label>
          </div>
        </div>
        <div class="item">
          <div class="box-pokemon">
            <p>Weight:</p>
            <label>{{ pokemonDetails.weight }}</label>
          </div>
        </div>
        <div class="item">
          <div class="box-pokemon">
            <p>Height:</p>
            <label>{{ pokemonDetails.height }}</label>
          </div>
        </div>
        <div class="item">
          <div class="box-pokemon">
            <p>Types:</p>

            <div v-for="(item, index) in pokemonDetails.types" :key="item.id">
              <label>
                {{ item.type.name
                }}{{ index === pokemonDetails.types.length - 1 ? '' : ',' }}
              </label>
            </div>
          </div>
        </div>
        <div class="flex justify-between mt-4">
          <div class="flex">
            <app-button
              type="normal-btn"
              text="Share to my friends"
              @click.native="sharePokemon"
            />
            <small v-if="showAlert">Pokemon copied to clipboard</small>
          </div>
          <div class="box-star" @click="$emit('setFavorite', pokemonSelected)">
            <div>
              <img :src="require(`@/assets/icons/${iconFav}`)" width="26" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="external-loader">
        <app-loader />
      </div>
    </div>
  </div>
</template>

<script>
import { POKEMON_GET_DETAILS } from '@/store/actions.type'
export default {
  props: {
    pokemonSelected: { type: Object, required: true },
    iconFav: { type: String, required: true },
  },
  data() {
    return {
      loadingDetails: true,
      pokemonDetails: {},
      showAlert: false,
    }
  },
  mounted() {
    this.getDetails()
  },
  methods: {
    sharePokemon() {
      const pokemonShare = `
      Name: ${this.pokemonDetails.name}, 
      Weight: ${this.pokemonDetails.weight}, 
      Height: ${this.pokemonDetails.height}
      Types: ${this.pokemonDetails.types.map((item) => {
        return item.type.name
      })}`
      navigator.clipboard.writeText(pokemonShare)
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false
      }, 3000)
    },
    getDetails() {
      this.loadingDetails = true
      let newUrl = this.pokemonSelected.url.slice(
        26,
        this.pokemonSelected.url.length - 1
      )
      this.$store
        .dispatch(POKEMON_GET_DETAILS, newUrl)
        .then((response) => {
          this.pokemonDetails = response
        })
        .finally(() => (this.loadingDetails = false))
    },
  },
}
</script>

<style lang="scss" scoped>
.box-details {
  small {
    margin-top: 1rem;
    margin-left: 0.5rem;
    color: var(--tertiary-gray);
  }
  padding: 3% 5%;
  .box-pokemon {
    display: flex;
  }
  .item {
    padding: 0.5rem 0rem;
    border-bottom: 1px solid var(--primary-white);
  }
  label {
    margin-left: 0.2rem;
    font-weight: 500;
    font-size: 18px;
    line-height: 150%;
    color: var(--secundary-gray);
  }
  p {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 150%;
    color: var(--secundary-gray);
  }
}
.container-img-pokemon {
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    max-height: 200px;
  }
}
.bg-image {
  border-radius: 5px 5px 0 0;
  height: 240px;
  background-size: 130%;
  background-image: url('../../assets/img/background.png');
}
@media (max-width: 767px) {
  .bg-image {
    background-size: 100%;
    background-image: url('../../assets/img/background-sm.png');
  }
}
</style>
