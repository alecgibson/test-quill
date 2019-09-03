import Vue from 'vue'
import RichText from '../services/rich-text/rich-text.service'

import quillStore from '../services/quill/quill.service'

const state = {
  richTexts: {},
  pendingRichTexts: {},
  isInitialLoadCompleted: false
}

const mutations = {
  setRichText (state, richText) {
    Vue.set(state.richTexts, richText.id, richText.data)
  },
  setPending (state, { id, isPending }) {
    if (state.isInitialLoadCompleted) {
      return
    }

    Vue.set(state.pendingRichTexts, id, isPending)
    const isFinishedLoading = Object.values(state.pendingRichTexts).every(isPending => !isPending)
    if (isFinishedLoading) {
      Vue.set(state, 'isInitialLoadCompleted', true)
    }
  },
  submitOp(state, { id, op }) {
    // State no-op, just for logging and debug replay purposes
    const richText = new RichText(id)
    richText.submitOp(op)
  },
  updateQuill (state, { id, ops }) {
    // State no-op, just for logging and debug replay purposes
    quillStore.submitOp(id, ops);
  }
}

const actions = {
  fetchRichText ({ commit, dispatch, state }, id) {
    id = `${id}`

    if (state.richTexts[id]) {
      return
    }

    commit('setPending', { id, isPending: true })

    const richText = new RichText(id)

    richText.subscribe()
      .then(() => {
        dispatch('setRichText', richText.doc)
      })

    richText.on('op', (ops, source) => {
      // TODO: Handle history
      // TODO: Handle Track changes

      dispatch('setRichText', richText)

      if (!source) {
        commit('updateQuill', { id, ops })
      }
    })
  },
  setRichText ({ commit }, richText) {
    commit('setRichText', richText)
    commit('setPending', { id: richText.id, isPending: false })
  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true
}
