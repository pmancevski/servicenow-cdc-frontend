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

<script setup>
import { useCreateIncident } from '@/composables/useCreateIncident'

const { status, form, submitIncident } = useCreateIncident()
</script>