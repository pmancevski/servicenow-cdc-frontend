<template>
  <div class="app">
    <Header :isLoggedIn="true" @logout="handleLogout" />
    <main class="main">
      <div class="dashboard">
        <h1>Incident Dashboard</h1>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else>
          <table class="incident-table">
            <thead>
              <tr>
                <th @click="sortBy('number')">Number ⬍</th>
                <th @click="sortBy('short_description')">Description ⬍</th>
                <th @click="sortBy('state')">State ⬍</th>
                <th @click="sortBy('category')">Category ⬍</th>
                <th @click="sortBy('urgency')">Urgency ⬍</th>
                <th @click="sortBy('opened_at')">Opened At ⬍</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="inc in paginatedIncidents" :key="inc.sys_id">
                <td>{{ inc.number }}</td>
                <td>{{ inc.short_description }}</td>
                <td>{{ getStateLabel(inc.state) }}</td>
                <td>{{ inc.category }}</td>
                <td>{{ getUrgencyLabel(inc.urgency) }}</td>
                <td>{{ inc.opened_at }}</td>
                <td>
                  <button @click="viewIncident(inc.number)" class="view-btn-sm">View</button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination -->
          <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
          </div>
          <div class="page-size">
            <label>Records per page:</label>
            <select v-model="pageSize">
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { fetchAuthSession } from 'aws-amplify/auth'
import Header from '@/components/Header.vue'
import axios from 'axios'

export default {
  components: { Header },
  data() {
    return {
      loading: true,
      error: null,
      incidents: [],
      sortKey: 'opened_at',
      sortAsc: false,
      currentPage: 1,
      pageSize: 15
    }
  },
  computed: {
    sortedIncidents() {
      const sorted = [...this.incidents]
      sorted.sort((a, b) => {
        const valA = a[this.sortKey] || ''
        const valB = b[this.sortKey] || ''
        if (valA < valB) return this.sortAsc ? -1 : 1
        if (valA > valB) return this.sortAsc ? 1 : -1
        return 0
      })
      return sorted
    },
    totalPages() {
      return Math.ceil(this.sortedIncidents.length / this.pageSize)
    },
    paginatedIncidents() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.sortedIncidents.slice(start, end)
    }
  },
  async mounted() {
    try {
      const session = await fetchAuthSession()
      const token = session.tokens.idToken.toString()
      
      const response = await axios.get(
        'https://3nhftt97bb.execute-api.eu-north-1.amazonaws.com/prod/incident',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
      this.incidents = JSON.parse(response.data.body)
      this.loading = false
    } catch (err) {
      this.error = 'Failed to load incidents'
      this.loading = false
    }
  },
  methods: {
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc
      } else {
        this.sortKey = key
        this.sortAsc = true
      }
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
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
    },
    viewIncident(number) {
      this.$router.push(`/incident/${number}`)
    },
    handleLogout() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.dashboard {
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
h1 {
  color: #232F3E;
  margin-bottom: 24px;
}
.incident-table {
  width: 100%;
  border-collapse: collapse;
}
.incident-table th,
.incident-table td {
  border: 1px solid #ddd;
  padding: 10px 12px;
  text-align: left;
}
.incident-table th {
  background: #f5f5f5;
  font-weight: 600;
  cursor: pointer;
}
.incident-table th:hover {
  background: #e5e5e5;
}
.view-btn-sm {
  background: #FF9900;
  color: #fff;
  border: none;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
.view-btn-sm:hover {
  background: #e68a00;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
}
.pagination button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.pagination span {
  font-weight: 600;
}
.page-size {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}
.page-size select {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>