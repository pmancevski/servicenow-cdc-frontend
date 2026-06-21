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
        <td>{{ incident.description }}</td>
      </tr>
      <tr>
        <td><strong>State</strong></td>
        <td>{{ incident.state }}</td>
      </tr>
      <tr>
        <td><strong>Category</strong></td>
        <td>{{ incident.category }}</td>
      </tr>
      <tr>
        <td><strong>Urgency</strong></td>
        <td>{{ incident.urgency }}</td>
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
    }
  }
}
</script>