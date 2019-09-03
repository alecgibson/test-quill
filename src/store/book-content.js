import Vue from 'vue'
import Actions from '../actions'

import bookContentService from '../services/book-content/book-content.service'

const state = {
  bookContent: null
}

const mutations = {
  SET_BOOK_CONTENT (state, bookContent) {
    // TODO: Test how deep the watchers are?
    Vue.set(state, 'bookContent', bookContent)
  }
}

const actions = {
  [Actions.LOAD_BOOK_CONTENT] ({ dispatch }) {
    // Magical ID hard-coded into the server
    const bookContent = bookContentService.doc
    bookContent.subscribe((error) => {
      if (error) throw new Error(error)
      dispatch('setBookContent', bookContent.data)
    })

    bookContent.on('op', () => {
      dispatch('setBookContent', bookContent.data)
    })
  },
  setBookContent ({ commit, dispatch }, bookContent) {
    commit('SET_BOOK_CONTENT', bookContent)

    bookContent.chapters.forEach(chapter => {
      dispatch('richText/fetchRichText', chapter, { root: true })
    })
  },
  addChapter ({ dispatch, state }) {
    const id = state.bookContent.chapters.length + 1
    dispatch('submitOp', {
      p: ['chapters', state.bookContent.chapters.length],
      li: id
    })
  },
  submitOp (_options, op) {
    return bookContentService.submitOp(op)
  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true
}
