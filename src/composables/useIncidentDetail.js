import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchAuthSession } from 'aws-amplify/auth'
import axios from 'axios'

export function useIncidentDetail(incidentId) {
  const router = useRouter()
  const loading = ref(true)
  const error = ref(null)
  const incident = ref({})
  const searchId = ref(incidentId)

  const fetchIncident = async () => {
    try {
      const session = await fetchAuthSession()
      const token = session.tokens.idToken.toString()
      
      const response = await axios.get(
        `https://3nhftt97bb.execute-api.eu-north-1.amazonaws.com/prod/incident/${incidentId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
      incident.value = response.data
      loading.value = false
    } catch (err) {
      error.value = 'Failed to load incident'
      loading.value = false
    }
  }

  const searchIncident = () => {
    console.log('Search clicked:', searchId.value)
    window.location.href = `/incident/${searchId.value}`
    // router.push(`/incident/${searchId.value}`)
  }

  const editIncident = () => {
    if (searchId.value) {
      router.push(`/edit/${searchId.value}`)
    }
  }

  return { loading, error, incident, fetchIncident, searchId, searchIncident, editIncident }
}