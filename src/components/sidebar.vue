<template>
  <div class="sidebar">
    <button
      @click="addChapter">
      Add chapter
    </button>
    <nav>
      <ul>
        <li
          v-for="id in bookContent.chapters"
          :key="id"
        >
          <RouterLink
            :to="id.toString()"
          >
            Chapter {{ id }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('bookContent', {
      bookContent: 'bookContent'
    })
  },
  methods: {
    addChapter () {
      this.$store.dispatch('bookContent/addChapter')
    }
  }
}
</script>

<style>
</style>
