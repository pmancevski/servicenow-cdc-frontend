<template>
  <div class="app">
    <Header :isLoggedIn="true" @logout="handleLogout" />
    <main class="main">
      <div class="incident-detail">
        <div class="search-bar">
          <input v-model="searchId" placeholder="Enter Incident Number" class="search-input" />
          <button @click="searchIncident" class="search-btn">Search</button>
          <button @click="editIncident" class="edit-btn">Edit</button>
        </div>

        <h1>Incident Details</h1>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else>
          <IncidentTable :incident="incident" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useIncidentDetail } from '@/composables/useIncidentDetail'
import Header from '@/components/Header.vue'
import IncidentTable from '@/components/IncidentTable.vue'

export default {
  components: {
    Header,
    IncidentTable
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { loading, error, incident, fetchIncident, searchId, searchIncident, editIncident } = useIncidentDetail(props.id)
    return { loading, error, incident, fetchIncident, searchId, searchIncident, editIncident }
  },
  mounted() {
    this.fetchIncident()
  },
  methods: {
    handleLogout() {
      this.$router.push('/')
    }
  }
}
</script>