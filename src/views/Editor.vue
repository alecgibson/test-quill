<template>
  <div>
    <Sidebar />
    <Quill />
  </div>
</template>

<script>
import Quill from '../components/quill.vue'
import Sidebar from '../components/sidebar.vue'

export default {
  components: {
    Quill,
    Sidebar
  }
}
</script>
