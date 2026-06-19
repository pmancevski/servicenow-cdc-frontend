<template>
  <div class="app">
    <Header :isLoggedIn="isLoggedIn" @logout="handleLogout" />
    <main class="main">
      <StatsSection :stats="stats" :loading="loading" />
    </main>
  </div>
</template>

<script>
import { getCurrentUser } from 'aws-amplify/auth'
import Header from '@/components/Header.vue'
import StatsSection from '@/components/StatsSection.vue'
import { useStats } from '@/composables/useStats'

export default {
  components: { Header, StatsSection },
  data() {
    return {
      isLoggedIn: false
    }
  },
  setup() {
    const { stats, loading, loadStats } = useStats()
    return { stats, loading, loadStats }
  },
  async mounted() {
    try {
      const user = await getCurrentUser()
      if (user) {
        this.isLoggedIn = true
      }
    } catch {
      this.isLoggedIn = false
    }
    this.loadStats(this.isLoggedIn)
  },
  methods: {
    handleLogout() {
      this.isLoggedIn = false
      this.loadStats(false)
    }
  }
}
</script>