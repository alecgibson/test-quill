import Vue from 'vue'
import Vuex from 'vuex'

import bookContent from './book-content'
import richText from './rich-text'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    bookContent,
    richText
  }
})
