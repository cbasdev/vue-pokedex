import { POKEMONS_LIST, POKEMON_GET_DETAILS } from '../actions.type'
import {
  POKEMONS_SAVE_LIST,
  POKEMONS_UPLOAD_FAVORITES,
} from '../mutations.type'

import ApiService from '@/common/api.service'

const state = {
  listPokemons: [],
  favPokemons: new Set(),
}

const getters = {
  listPokemons(state) {
    return state.listPokemons
  },
  favPokemons(state) {
    return state.favPokemons
  },
}

const actions = {
  [POKEMONS_LIST](context, body) {
    const { limit, offset } = body
    return ApiService.get(`/pokemon/?offset=${offset}&limit=${limit}`).then(
      (response) => {
        context.commit(POKEMONS_SAVE_LIST, response.results)
        return Promise.resolve(response)
      }
    )
  },
  [POKEMON_GET_DETAILS](_, url) {
    return ApiService.get(`/${url}`)
  },
}

const mutations = {
  [POKEMONS_SAVE_LIST](state, pokemons) {
    state.listPokemons = pokemons
  },
  [POKEMONS_UPLOAD_FAVORITES](state, pokemon) {
    state.favPokemons.has(pokemon)
      ? state.favPokemons.delete(pokemon)
      : state.favPokemons.add(pokemon)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
