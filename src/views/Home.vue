<template>
  <div class="home">
    <h1>🔐 ServiceNow Incident Manager</h1>

    <!-- Login Section -->
    <div v-if="!token" class="card">
      <h2>Login</h2>
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="login">Login</button>
      <p class="status">{{ loginStatus }}</p>
    </div>

    <!-- App Section -->
    <div v-else>
      <div class="card">
        <h2>📝 Create Incident</h2>
        <input v-model="shortDescription" placeholder="Short description" />
        <textarea v-model="description" placeholder="Full description" rows="3"></textarea>
        <select v-model="category">
          <option value="inquiry">Inquiry/Help</option>
          <option value="software">Software</option>
          <option value="hardware">Hardware</option>
          <option value="network">Network</option>
          <option value="database">Database</option>
        </select>
        <select v-model="urgency">
          <option value="3">Low</option>
          <option value="2">Medium</option>
          <option value="1">High</option>
        </select>
        <button @click="createIncident">Create Incident</button>
        <p class="status">{{ createStatus }}</p>
      </div>

      <button @click="$router.push('/dashboard')" class="nav-btn">
        📋 View Incidents
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      token: null,
      username: '',
      password: '',
      loginStatus: '',
      shortDescription: '',
      description: '',
      category: 'inquiry',
      urgency: '3',
      createStatus: ''
    }
  },
  methods: {
    async login() {
      if (this.username && this.password) {
        this.token = 'demo-token-' + Date.now()
        this.loginStatus = '✅ Logged in successfully'
        localStorage.setItem('token', this.token)
      } else {
        this.loginStatus = '❌ Username and password required'
      }
    },
    async createIncident() {
      if (!this.shortDescription) {
        this.createStatus = '❌ Short description is required'
        return
      }

      this.createStatus = '⏳ Creating incident...'

      try {
        // TODO: Replace with your API Gateway URL
        const response = await axios.post(
          'https://your-api-gateway-url/prod/incident',
          {
            short_description: this.shortDescription,
            description: this.description,
            category: this.category,
            urgency: this.urgency
          },
          {
            headers: { Authorization: `Bearer ${this.token}` }
          }
        )

        this.createStatus = '✅ Incident created: ' + response.data.number
        this.shortDescription = ''
        this.description = ''
      } catch (error) {
        this.createStatus = '❌ Error: ' + error.message
      }
    }
  },
  mounted() {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      this.token = savedToken
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 700px;
  margin: 40px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
h1 {
  color: #232F3E;
  text-align: center;
}
.card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
input, textarea, select {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 8px 0 16px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}
button {
  background: #FF9900;
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
button:hover {
  background: #e68a00;
}
.nav-btn {
  background: #232F3E;
  width: 100%;
}
.nav-btn:hover {
  background: #1a2533;
}
.status {
  margin-top: 12px;
  padding: 10px;
  border-radius: 4px;
}
</style>