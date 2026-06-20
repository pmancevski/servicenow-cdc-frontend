<template>
  <div class="create-card">
    <h1>Create Incident</h1>
    <form @submit.prevent="submitIncident">
      <div class="form-group">
        <label>Short Description</label>
        <input v-model="form.short_description" placeholder="Brief description" required />
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea v-model="form.description" placeholder="Full details" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label>Category</label>
        <select v-model="form.category">
          <option value="inquiry">Inquiry/Help</option>
          <option value="software">Software</option>
          <option value="hardware">Hardware</option>
          <option value="network">Network</option>
          <option value="database">Database</option>
        </select>
      </div>
      <div class="form-group">
        <label>Urgency</label>
        <select v-model="form.urgency">
          <option value="3">Low</option>
          <option value="2">Medium</option>
          <option value="1">High</option>
        </select>
      </div>
      <button type="submit" class="primary-btn">Create</button>
      <p class="status">{{ status }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      status: '',
      form: {
        short_description: '',
        description: '',
        category: 'inquiry',
        urgency: '3'
      }
    }
  },
  methods: {
    async submitIncident() {
      this.status = 'Creating...'
      try {
        const response = await axios.post(
          'https://your-api-gateway-url/prod/incident',
          this.form
        )
        this.status = '✅ Incident created: ' + response.data.number
        this.form.short_description = ''
        this.form.description = ''
      } catch (error) {
        this.status = '❌ Error: ' + error.message
      }
    }
  }
}
</script>

<style scoped>
.create-card {
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
h1 {
  color: #232F3E;
  margin-bottom: 24px;
}
.form-group {
  margin-bottom: 16px;
}
label {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
  color: #555;
}
input, textarea, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}
.primary-btn {
  background: #FF9900;
  color: #fff;
  border: none;
  padding: 12px 32px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
}
.primary-btn:hover {
  background: #e68a00;
}
.status {
  margin-top: 12px;
  padding: 10px;
  border-radius: 4px;
}
</style>