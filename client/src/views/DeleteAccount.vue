<template>
    <Navbar></Navbar>
    <div class="parent-container">
      <div class="container">
        <div class="bar"></div>
        <div class="content-box">
          <div class="image-box"><img src="..\assets\img\WarningSign.png" alt="Warning Sign Image"></div>
          <h1>Are you sure?</h1>
          <h2>{{ username }}, this will permanently delete your account.</h2>
          <div class="flex-1">
            <button class="cancel-button" @click="$router.push({ name: 'EditAccount'})">Cancel</button>
            <button class="confirm-button" @click="deleteAccount()">Confirm</button>
          </div>
        </div>
    </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import TokenService from '../services/TokenService'

export default {
  name: 'DeleteAccount',
  components: {
    'Navbar': Navbar
  },
  data() {
    return {
      username: ''
    }
  },
  mounted() {
    const token = TokenService.getLocalAccessToken()
    const id = TokenService.getDecoded()._id
    const url = `http://localhost:3000/api/users/${id}`
    const vm = this
    fetch(url, {
      headers: {
        Authorization: `token ${token}`,
      },
      mode: 'cors'
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data)
      vm.username = data.username
    })
    .catch(err => console.log(err))
  },
  methods: {
    async deleteAccount() {
      const token = TokenService.getLocalAccessToken()
      const id = TokenService.getDecoded()._id
      const url = `http://localhost:3000/api/users/${id}`
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
           Authorization: `token ${token}`,
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      })

      if (!response.ok) {
        console.log('Account deletion unsuccessful.')
      }
      else {
        TokenService.removeToken()
        this.$router.push({ name: 'Login'})
      }
    }
  },
}
</script>
<style scoped>
.parent-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.content-box {
  margin-left: 54px;
  margin-top: 45px;
  margin-right: 54px;
  margin-bottom: 45px;
}

.flex-1 {
  margin-top: 136px;
  display: flex;
  justify-content: space-between;
}
button {
  border: 0px;  
}
.cancel-button {
  width: 306px;
  height: 73px;
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 39px;
  /* identical to box height */

  text-align: center;

  background: #444444;
  color: #FFFFFF;
  cursor: pointer;
}

.confirm-button {
  width: 306px;
  height: 73px;

  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 39px;
  /* identical to box height */

  border-radius: 4px;
  background: #F53649;
  text-align: center;

  color: #FFFFFF;
  cursor: pointer
}
.image-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  width: 137px;
  height: 137px;

  
  
}
h1 {
  margin-top: 22px;

  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  text-align: center;

  color: #FFFFFF;

}

h2 {
  margin-top: 29px;

  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 39px;

  color: #E6E6E6;
}
.bar {
  width: 978px;
  height: 30px;

  background: #F53649;
  border-radius: 4px;
}

.container {
  width: 978px;
  height: 646px;

  background: #222222;

  margin: 0;

}
</style>