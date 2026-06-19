<template>
  <header class="header">
    <div class="logo">
      <span class="logo-icon">⚡</span>
      <span class="logo-text">ServiceNow CDC</span>
    </div>
    <nav class="nav">
      <a href="/" class="nav-link active">Home</a>
      <a href="/dashboard" class="nav-link">Dashboard</a>
      <button class="login-btn" v-if="!isLoggedIn" @click="signIn">Sign In</button>
      <button class="logout-btn" v-else @click="logout">Logout</button>
    </nav>
  </header>
</template>

<script>
import { signInWithRedirect, signOut } from 'aws-amplify/auth'

export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true
    }
  },
  emits: ['logout'],
  methods: {
    async signIn() {
      try {
        await signInWithRedirect()
      } catch (error) {
        console.error('Login error:', error)
      }
    },
    async logout() {
      try {
        await signOut()
        this.$emit('logout')
      } catch (error) {
        console.error('Logout error:', error)
      }
    }
  }
}
</script>