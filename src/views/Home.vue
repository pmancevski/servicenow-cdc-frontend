<template>
  <div class="app">
    <header class="header">
      <div class="logo">
        <span class="logo-icon">⚡</span>
        <span class="logo-text">ServiceNow CDC</span>
      </div>
      <nav class="nav">
        <a href="/" class="nav-link active">Home</a>
        <a href="/dashboard" class="nav-link">Dashboard</a>
        <button class="login-btn" v-if="!isLoggedIn" @click="signIn">Sign In</button>
        <button class="logout-btn" v-else @click="logout">Logout</button>
      </nav>
    </header>

    <main class="main">
      <section class="hero">
        <h1>Incident Manager</h1>
        <p>Real-time change data capture pipeline</p>
        <div class="stats">
          <div class="stat-card">
            <span class="stat-number">{{ loading ? '...' : stats.total }}</span>
            <span class="stat-label">Total Incidents</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">{{ loading ? '...' : stats.open }}</span>
            <span class="stat-label">Open</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">{{ loading ? '...' : stats.resolved }}</span>
            <span class="stat-label">Resolved</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import { signInWithRedirect } from 'aws-amplify/auth'

export default {
  data() {
    return {
      isLoggedIn: false,
      loading: true,
      stats: {
        total: 0,
        open: 0,
        resolved: 0
      }
    }
  },
  mounted() {
    this.fetchStats()
  },
  methods: {
    async signIn() {
      try {
        await signInWithRedirect()
      } catch (error) {
        console.error('Login error:', error)
      }
    },
    async fetchStats() {
      this.loading = true
      try {
        const response = await axios.get('https://3nhftt97bb.execute-api.eu-north-1.amazonaws.com/prod')
        this.stats = JSON.parse(response.data.body)
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.isLoggedIn = false
    }
  }
}
</script>