<template>
  <div class="nav-container">
    <ul class="nav-group">
      <li class="nav-links" id="logo"><router-link to="/"><img src="../assets/svg/lib_logo.svg"></router-link></li>
      <li v-if="loggedIn" class="nav-links"><router-link :to="{ name: 'CreateGame' }">Create Game</router-link></li>
      <li v-if="loggedIn" class="nav-links"><router-link :to="{ name: 'Store' }">Store</router-link></li>
      <li v-if="loggedIn" class="nav-links"><router-link :to="{ name: 'Library' }">Library</router-link></li>
      <li v-if="loggedIn" class="nav-links"><router-link :to="{ name: 'Account' }">Profile</router-link></li>
      <li class="nav-links"><router-link :to="{ name: 'About' }">About</router-link></li>
      <li v-if="!loggedIn" class="nav-links"><router-link :to="{ name: 'Login' }">Login</router-link></li>
      <li v-if="loggedIn" class="nav-links"><button class="logout-btn" @click="logout()">Logout</button></li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '../stores/authStore'

export default {
  name: 'Navbar',
  computed: {
    ...mapState(useAuthStore, ['loggedIn'])
  },
  mounted() {
    this.checkLoggedIn()
  },
  methods: {
    logout() {
      this.logoutUser()
      this.$router.push({ name: 'Login' })
    },
    ...mapActions(useAuthStore, ['checkLoggedIn']),
    ...mapActions(useAuthStore, ['logoutUser'])
  }
}

</script>
<style scoped>

.nav-container {
  --light-green: #00DD99;
  --dark-bg-grey: #111111;
  --form-grey: #151515;
  --grey: #222222;
  --white: #FFFFFF;

  font-size: 16px;
} 

.nav-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--grey);
  list-style-type: none;
  height: 10vh;
}

.nav-links {
  color: var(--white);
  font-size: 1.2em;
  padding: 0px 20px;
}

.nav-links a {
  color: var(--white);
  text-decoration: none;
}

#logo {
  flex: 1;
}

#logo img {
  height: 50px;
  width: 50px;
}

a {
  font-size: 1.2em;
}
.logout-btn {
  background-color: transparent;
  color: var(--white);
  border: none;
  font-size: 1.2em;
  cursor: pointer;
}
</style>