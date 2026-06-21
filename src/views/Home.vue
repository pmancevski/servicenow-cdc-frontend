<template>
  <div class="app">
    <Header :isLoggedIn="isLoggedIn" @logout="handleLogout" />
    <main class="main">
      <StatsSection :stats="stats" :loading="loading" />

      <div class="view-section">
        <div class="view-row">
          <input v-model="incidentId" placeholder="Enter Incident Number" class="view-input" />
          <button class="view-btn" @click="viewIncident">Search</button>
        </div>
      </div>

      <div class="actions">
        <button class="primary-btn" @click="$router.push('/create')">Create Incident</button>
      </div>
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
      isLoggedIn: false,
      incidentId: ''
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
    },
    viewIncident() {
      if (this.incidentId) {
        this.$router.push(`/incident/${this.incidentId}`)
      }
    }
  }
}
</script>