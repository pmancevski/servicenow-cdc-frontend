<template>
  <div class="app">
    <Header :isLoggedIn="true" @logout="handleLogout" />
    <main class="main">
      <div class="incident-detail">
        <div class="search-bar">
          <input v-model="searchId" placeholder="Enter Incident Number" class="search-input" />
          <button @click="searchIncident" class="search-btn">Search</button>
          <div class="edit-message" v-if="incident.state === '6' || incident.state === '7'">
              ⚠️ This incident is Resolved or Closed and cannot be edited.
          </div>
          <button v-if="!isEditing" @click="startEdit" class="edit-btn" :disabled="incident.state === '6' || incident.state === '7'"
>             {{ incident.state === '6' || incident.state === '7' ? 'Closed' : 'Edit' }}</button>
          <button v-if="isEditing" @click="cancelEdit" class="cancel-btn">Cancel</button>
          <button v-if="isEditing" @click="saveEdit" class="save-btn">Save</button>
        </div>

        <h1>Incident Details</h1>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else>
          <IncidentTable 
            :incident="incident" 
            :editing="isEditing"
            :editData="editForm"
          />
          <p class="status">{{ editStatus }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useIncidentDetail } from '@/composables/useIncidentDetail'
import { useEditIncident } from '@/composables/useEditIncident'
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
    const { isEditing, editStatus, editForm, startEdit, cancelEdit, saveEdit } = useEditIncident(incident)
    
    return { 
      loading, error, incident, fetchIncident, 
      searchId, searchIncident, editIncident,
      isEditing, editStatus, editForm, startEdit, cancelEdit, saveEdit
    }
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