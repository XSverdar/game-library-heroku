<template>
  <div class="container">
    <div class="login-container">
      <h1 class="header">Welcome Back!</h1>
        <form class="input-wrapper">
          <div class="err-msg" v-for="error in errors" :key="error.id">
            {{ error }}
          </div>
          <div class="err-msg" v-if="loginError">{{ loginError }}</div>
          <div class="input-group">
            <label class="label">Username</label>
            <input type="text" v-model="username">
          </div>
          <div class="input-group">
            <label class="label">Password</label>
            <input type="password" v-model="password">
          </div>
          <button class="login-btn" @click.prevent="login">Login</button>
          <p class="to-register">Already have an account? <router-link class="link" to="/register">Sign up.</router-link></p>
        </form>
      </div>
      <div class="background">
      </div>
    </div>
</template>

<script>
import TokenService from '../services/TokenService'

export default {
  data() {
    return {
      username: '',
      password: '',
      errors: [],
      loginError: '',
    }
  },

  methods: {
    async login() {
      if (this.isValid()) {
        const vm = this
        const { username, password } = vm
        
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            password,
          }),
          mode: 'cors'
        })

        if (!response.ok) {
          vm.loginError = await response.text()
        }
        else {
          const parsedPromise = response.json()
          parsedPromise.then(parsed => {
            TokenService.updateLocalAccessToken(parsed.accessToken)
            this.$router.push({ name: 'Home'})
          })
        }
      }
    },
    isValid() {
      let bool = 1
      const invalid = []
      if (this.username == "") {
        invalid.push('Username is required.')
        bool = 0
      }
      if (this.password == "") {
        invalid.push('Password is required.')
        bool = 0
      }
      this.errors = invalid
      return bool
    }
  }
}
</script>
<style scoped>
.background {
  background-image: url("../assets/img/BabaisYou.png");
  opacity: 20%;
}
.container {
  display: flex;
  flex-direction: row;
  height: 100vh;

  font-size: 16px;
} 

.login-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: var(--grey);
  justify-content: center;
}

.login-btn {
  background-color: var(--light-green);
  border: 0;
  color: var(--white);
  height: 6vh;
  cursor: pointer;
  width: 70%;
  font-size: 1.5em;
  border-radius: 4px;
}

.background {
  flex: 1;
  background-color: var(--dark-bg-grey);
}


.input-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 80%;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 70%;
}

.label {
  color: var(--white);
  font-size: 1.2em;
}

.to-register {
  color: var(--white);
}

.to-register .link {
  color: var(--white);
}

.err-msg {
  color: var(--red);
  font-size: 1.2em;
}
.success-msg {
  color: var(--light-green);
  font-size: 1.2em;
}
/* temporary (to be changed)*/
input {
  background-color: var(--form-grey);
  border: 0;
  height: 6vh;
  color: var(--white);
  margin: 10px 0 10px 0; 
  font-size: 1.1em;
  border-radius: 4px;
}

.header {
  color: var(--white);
  text-align: center;
  font-size: 2em;
}
</style>