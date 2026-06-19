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
        <button class="login-btn" v-if="!isLoggedIn">Sign In</button>
        <button class="logout-btn" v-else @click="logout">Logout</button>
      </nav>
    </header>

    <main class="main">
      <section class="hero">
        <h1>Incident Manager</h1>
        <p>Real-time change data capture pipeline</p>
        <div class="stats">
          <div class="stat-card">
            <span class="stat-number">0</span>
            <span class="stat-label">Total Incidents</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">0</span>
            <span class="stat-label">Open</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">0</span>
            <span class="stat-label">Resolved</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    logout() {
      this.isLoggedIn = false
    }
  }
}
</script>