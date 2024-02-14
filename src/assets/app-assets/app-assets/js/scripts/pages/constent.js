import { computed, watch } from 'vue'

export default {
  setup() {
    const route = useRoute()
    const searchQuery = computed(() => route.query.id)

    watch(searchQuery, newSearchQuery => console.log(newSearchQuery))

    return {
      searchQuery
    }
  }
}