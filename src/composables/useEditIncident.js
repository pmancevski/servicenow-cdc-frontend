import { ref } from 'vue'
import { fetchAuthSession } from 'aws-amplify/auth'
import axios from 'axios'

export function useEditIncident(incidentData) {
  const isEditing = ref(false)
  const editStatus = ref('')
  const editForm = ref({
    description: '',
    state: ''
  })

  // Store original data for cancel
  const originalData = ref({
    description: '',
    state: ''
  })

  const startEdit = () => {
    originalData.value = {
    description: incidentData.value.description || '',
    state: incidentData.value.state || ''
  }
  editForm.value = {
    description: '',  // ← Empty
    state: incidentData.value.state || ''
  }
  isEditing.value = true
  editStatus.value = ''
  }

  const cancelEdit = () => {
    // Restore original data
    editForm.value = { ...originalData.value }
    isEditing.value = false
    editStatus.value = ''
  }

  const saveEdit = async () => {
    editStatus.value = '⏳ Saving...'
    try {
      const session = await fetchAuthSession()
      const token = session.tokens.idToken.toString()

      const ticketNumber = incidentData.value.number
      
      await axios.patch(
        `https://3nhftt97bb.execute-api.eu-north-1.amazonaws.com/prod/incident/${ticketNumber}`,
        editForm.value,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
      editStatus.value = '✅ Updated successfully'
      isEditing.value = false
      // Refresh incident data
      setTimeout(() => window.location.reload(), 500)
    } catch (err) {
      editStatus.value = '❌ Failed to update'
    }
  }

  return { isEditing, editStatus, editForm, startEdit, cancelEdit, saveEdit }
}