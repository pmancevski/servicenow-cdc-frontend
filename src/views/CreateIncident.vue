<template>
  <div class="app">
    <Header :isLoggedIn="true" @logout="handleLogout" />
    <main class="main">
      <CreateForm />
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import CreateForm from '@/components/CreateForm.vue'

export default {
  components: { Header, CreateForm },
  methods: {
    handleLogout() {
      this.$router.push('/')
    }
  }
}
</script>