import { ref } from 'vue'
import { fetchAuthSession } from 'aws-amplify/auth'
import axios from 'axios'

export function useCreateIncident() {
  const status = ref('')
  const form = ref({
    short_description: '',
    description: '',
    category: 'inquiry',
    urgency: '3'
  })

  const submitIncident = async () => {
    if (!form.value.short_description) {
      status.value = '❌ Short description is required'
      return
    }

    status.value = '⏳ Creating...'

    try {
      const session = await fetchAuthSession()
      const token = session.tokens.idToken.toString()

      console.log('Sending payload:', form.value)

      const response = await axios.post(
        'https://3nhftt97bb.execute-api.eu-north-1.amazonaws.com/prod/incident',
        form.value,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )

      if (response.data.statusCode === 200) {
        const result = JSON.parse(response.data.body)
        status.value = '✅ Incident created: ' + result.number
        form.value.short_description = ''
        form.value.description = ''
      } else {
        status.value = '❌ Failed to create incident'
      }
    } catch (error) {
      console.log('Error:', error)
      status.value = '❌ Error: ' + error.message
    }
  }

  return { status, form, submitIncident }
}