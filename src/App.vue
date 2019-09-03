<template>
  <div id="app">
    <div
      v-if="!isInitialLoadCompleted">
      Loading...
    </div>
    <RouterView
      v-else
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Actions from './actions'

export default {
  mounted () {
    this.$store.dispatch(`bookContent/${Actions.LOAD_BOOK_CONTENT}`)
  },
  computed: {
    ...mapState('richText', ['isInitialLoadCompleted'])
  }
}
</script>
