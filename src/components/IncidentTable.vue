<template>
  <table class="detail-table">
    <tbody>
      <tr>
        <td><strong>Number</strong></td>
        <td>{{ incident.number }}</td>
      </tr>
      <tr>
        <td><strong>Short Description</strong></td>
        <td>{{ incident.short_description }}</td>
      </tr>
      <tr>
        <td><strong>Description</strong></td>
        <td>
          <!-- Show old description (read-only) -->
          <div v-if="editing" class="old-description">
            <strong>Current Description:</strong>
            <p style="white-space: pre-line;">{{ incident.description }}</p>
            <hr />
            <strong>Add New Comment:</strong>
            <textarea v-model="editData.description" class="edit-description" placeholder="Enter new comment..."></textarea>
            </div>
            <span v-else style="white-space: pre-line;">{{ incident.description }}</span>
        </td>
      </tr>
      <tr>
        <td><strong>Category</strong></td>
        <td>{{ incident.category }}</td>
      </tr>
      <tr>
        <td><strong>Urgency</strong></td>
        <td>{{ getUrgencyLabel(incident.urgency) }}</td>
      </tr>
      <tr>
        <td><strong>State</strong></td>
        <td>
          <select v-if="editing" v-model="editData.state">
            <option value="1">New</option>
            <option value="2">In Progress</option>
            <option value="3">On Hold</option>
            <option value="6">Resolved</option>
            <option value="7">Closed</option>
          </select>
          <span v-else>{{ getStateLabel(incident.state) }}</span>
        </td>
      </tr>
      <!-- Resolution Notes (only show when editing and state is Resolved) -->
      <tr v-if="editing && editData.state === '6'">
        <td><strong>Resolution Notes</strong></td>
        <td>
          <textarea v-model="editData.close_notes" rows="2" placeholder="Enter resolution notes..." class="edit-description"></textarea>
          <select v-model="editData.close_code" style="margin-top: 8px; width: 100%; padding: 8px;">
            <option value="Solution provided">Solution provided</option>
            <option value="Closed/Resolved by Caller">Closed/Resolved by Caller</option>
            <option value="Workaround provided">Workaround provided</option>
          </select>
        </td>
      </tr>
      <tr>
        <td><strong>Opened At</strong></td>
        <td>{{ incident.opened_at }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    incident: {
      type: Object,
      required: true
    },
    editing: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    getStateLabel(state) {
      const states = {
        '1': 'New',
        '2': 'In Progress',
        '3': 'On Hold',
        '6': 'Resolved',
        '7': 'Closed'
      }
      return states[state] || state || '-'
    },
    getUrgencyLabel(urgency) {
      const urgencies = {
        '1': 'High',
        '2': 'Medium',
        '3': 'Low'
      }
      return urgencies[urgency] || urgency || '-'
    }
  }
}
</script>