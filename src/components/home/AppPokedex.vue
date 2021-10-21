<template>
  <div v-if="!loading" class="container-pokedex">
    <div class="box-pokedex mt-10">
      <app-input
        type="text"
        placeholder="Search"
        icon="search-icon.png"
        iconWidth="20"
        v-model="search"
      />
      <div class="list-pokemons mt-10">
        <div v-for="pokemon in showPokemons" :key="pokemon.id">
          <div class="item-pokemon" @click="openDetails">
            <label>{{ formatName(pokemon.name) }}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-buttons">
      <div class="box-btns">
        <div class="flex justify-center">
          <app-button
            class="w-full mr-2"
            icon="all-icon.png"
            iconWidth="22"
            type="main-btn"
            text="All"
            @click.native="getPokemons"
          />
          <app-button
            class="w-full ml-2"
            icon="star-icon.png"
            iconWidth="22"
            type="secundary-btn"
            text="Favorites"
          />
        </div>
      </div>
    </div>

    <app-modal
      width="600"
      height="auto"
      ref="modalDetailsPokemon"
      name="modalDetailsPokemon"
    >
      THE MODAL MEN
    </app-modal>
  </div>
  <div v-else class="container-main">
    <app-loader />
  </div>
</template>

<script>
import { POKEMONS_LIST } from '@/store/actions.type'
import { mapGetters } from 'vuex'

export default {
  mounted() {
    this.getPokemons()
  },
  data() {
    return {
      showPokemons: [],
      search: '',
      loading: true,
      screenLimit: 7,
    }
  },
  methods: {
    formatName(item) {
      return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
    },
    openDetails() {
      this.$refs.modalDetailsPokemon.show()
    },
    getPokemons(offset = 0, limit = 1118) {
      this.loading = true
      this.$store
        .dispatch(POKEMONS_LIST, {
          offset,
          limit,
        })
        .then(() => {
          this.showPokemons = this.listPokemons.slice(0, this.screenLimit)
        })
        .finally(() => (this.loading = false))
    },
    filterPokemons() {
      let listFilter = this.listPokemons.filter((pokemon) => {
        return pokemon.name.toLowerCase().match(this.search.toLowerCase())
      })
      this.showPokemons = listFilter.slice(0, this.screenLimit)
    },
  },
  watch: {
    search() {
      this.filterPokemons()
    },
  },
  computed: {
    ...mapGetters(['listPokemons']),
  },
}
</script>

<style lang="scss" scoped>
.list-pokemons {
  max-height: 65vh;
}
.footer-buttons {
  padding: 1rem 0 2rem;
  width: 100%;
  background: #fff;
  .box-btns {
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
  }
}
.container-pokedex {
  width: 100%;
  min-height: 100vh;
  background: var(--tertiary-white);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.box-pokedex {
  width: 100%;
  max-width: 500px;
  justify-content: center;
}
.item-pokemon {
  cursor: pointer;
  margin-top: 0.5rem;
  background: #fff;
  padding: 1rem;
  border-radius: 5px;
  label {
    cursor: pointer;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    display: flex;
    align-items: center;
    color: #353535;
  }
}
</style>
