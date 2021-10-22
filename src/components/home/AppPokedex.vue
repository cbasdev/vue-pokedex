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
      <div class="list-pokemons mt-5" v-if="showPokemons.length > 0">
        <div v-for="pokemon in showPokemons" :key="pokemon.id">
          <div class="item-pokemon flex justify-between">
            <label @click="openDetails(pokemon)">{{
              formatName(pokemon.name)
            }}</label>
            <div class="box-star" @click="setFavorite(pokemon)">
              <div>
                <img
                  :src="require(`@/assets/icons/${getIconFav(pokemon)}`)"
                  width="26"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="not-found">
          <h2>Uh-oh</h2>
          <span>You look lost on your journey!</span>
          <div class="flex justify-center mt-4">
            <app-button
              type="normal-btn"
              @click.native="$emit('changeStep', 1)"
              text="Go back home"
            />
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
            @click.native="updatePokemons('all')"
          />
          <app-button
            class="w-full ml-2"
            icon="star-icon.png"
            iconWidth="22"
            type="secundary-btn"
            text="Favorites"
            @click.native="updatePokemons('fav')"
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
      <app-pokemon
        :pokemonSelected="pokemonSelected"
        :iconFav="getIconFav(pokemonSelected)"
        @setFavorite="setFavorite"
      />
    </app-modal>
  </div>
  <div v-else class="container-main">
    <app-loader />
  </div>
</template>

<script>
import AppPokemon from '@/components/home/AppPokemon'
import { POKEMONS_LIST } from '@/store/actions.type'
import { POKEMONS_UPLOAD_FAVORITES } from '@/store/mutations.type'
import { mapGetters } from 'vuex'

export default {
  components: {
    AppPokemon,
  },
  data() {
    return {
      showPokemons: [],
      actualList: [],
      search: '',
      loading: true,
      screenLimit: 7,
      type: 'all',
      pokemonSelected: {},
    }
  },
  mounted() {
    this.getPokemons()
  },
  methods: {
    updatePokemons(type) {
      this.type = type
      this.type === 'fav'
        ? (this.actualList = Array.from(this.favPokemons))
        : (this.actualList = this.listPokemons)
      this.filterPokemons()
    },
    setFavorite(pokemon) {
      this.$store.commit(POKEMONS_UPLOAD_FAVORITES, pokemon)
      this.updatePokemons(this.type)
    },
    getIconFav(pokemon) {
      return this.favPokemons.has(pokemon)
        ? 'fav-enabled.png'
        : 'fav-disabled.png'
    },
    formatName(item) {
      return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
    },
    openDetails(pokemon) {
      this.pokemonSelected = pokemon
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
          this.actualList = this.listPokemons
          this.showPokemons = this.actualList.slice(0, this.screenLimit)
        })
        .finally(() => (this.loading = false))
    },
    filterPokemons() {
      let listFilter = this.actualList.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(this.search.toLowerCase())
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
    ...mapGetters(['listPokemons', 'favPokemons']),
  },
}
</script>

<style lang="scss" scoped>
.not-found {
  min-height: 400px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  h2 {
    font-weight: bold;
    font-size: 36px;
    line-height: 43px;
    color: #353535;
  }
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 150%;
    /* identical to box height, or 30px */
    text-align: center;
    color: #5e5e5e;
  }
  button {
    width: 30px;
  }
}
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
  padding: 0 5%;
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
  min-height: 550px;
  justify-content: center;
}
.item-pokemon {
  cursor: pointer;
  margin-top: 0.5rem;
  background: #fff;
  border-radius: 5px;
  label {
    padding: 1.1rem 1rem;
    width: 100%;
    cursor: pointer;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    display: flex;
    align-items: center;
    color: #353535;
  }
  .box-star {
    margin-top: 0.55rem;
    margin-right: 1rem;
  }
}
@media (max-width: 767px) {
  .container-pokedex {
    min-height: 95vh;
  }
}
</style>
