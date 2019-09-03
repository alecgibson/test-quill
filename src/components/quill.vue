<template>
  <div
    ref="editor"
    class="quill-editor"
  />
</template>

<script>
import Quill from 'quill'
import { mapState } from 'vuex'

import quillStore from '../services/quill/quill.service'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

export default {
  data () {
    return {
      editor: null
    }
  },
  computed: {
    ...mapState('richText', ['richTexts'])
  },
  mounted () {
    const richTextId = this.$route.params.id;
    const quill = new Quill(this.$refs.editor, { theme: 'snow' })

    this.$set(this, 'editor', quill)
    quillStore.register(richTextId, quill)

    const richText = this.richTexts[richTextId]
    quill.setContents(richText)
    quill.on('text-change', this.handleTextChange)
  },
  beforeDestroy () {
    const richTextId = this.$route.params.id;
    quillStore.unregister(richTextId)
  },
  methods: {
    handleTextChange (delta, oldDocument, source) {
      if (source !== Quill.sources.USER) {
        console.log('non-user source')
        return
      }

      // TODO: Think about referring to Quill instances by document ID
      // TODO: Think about how to determine which rich-texts are "active" on the page
      this.$store.commit('richText/submitOp', { id: this.$route.params.id, op: delta })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
