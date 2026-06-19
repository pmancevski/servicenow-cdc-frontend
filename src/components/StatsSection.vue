<template>
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
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  }
}
</script>