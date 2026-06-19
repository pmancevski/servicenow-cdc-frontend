import { ref } from 'vue'
import { fetchRealStats, fetchRandomStats } from '@/services/statsService'

export function useStats() {
  const stats = ref({ total: 0, open: 0, resolved: 0 })
  const loading = ref(true)

  const loadStats = async (isLoggedIn) => {
    loading.value = true
    try {
      if (isLoggedIn) {
        stats.value = await fetchRealStats()
      } else {
        stats.value = fetchRandomStats()
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      loading.value = false
    }
  }

  return { stats, loading, loadStats }
}