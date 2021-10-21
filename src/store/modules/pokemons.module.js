import { POKEMONS_LIST } from '../actions.type'
import { POKEMONS_SAVE_LIST } from '../mutations.type'

import ApiService from '@/common/api.service'

const state = {
  listPokemons: [],
}

const getters = {
  listPokemons(state) {
    return state.listPokemons
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
}

const mutations = {
  [POKEMONS_SAVE_LIST](state, pokemons) {
    state.listPokemons = pokemons
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
