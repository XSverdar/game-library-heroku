<template>
  <Navbar></Navbar>
  <div class="parent-container">
    <div class="container">
      <div class="text-wrapper">
        <h1 class="header">Are you sure?</h1>
        <p class="text">This will delete {{ title }} from the store.</p>
      </div>
      <div class="btn-wrapper">
        <button class="cancel-btn" @click="$router.push({ name: 'ViewGame'})">Cancel</button>
        <button class="delete-btn" @click="deleteGame()">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'DeleteGame1',
  components: {
    'Navbar': Navbar
  },
  data() {
    return {
      id: this.$route.params.id,
      title: ''
    }
  },
  mounted() {
    const id = this.id
    const url = `http://localhost:3000/api/games/${id}`
    const vm = this
    fetch(url, {
      mode: 'cors'
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      vm.title = data.title
    })
    .catch(err => console.log(err))
  },
  methods: {
    deleteGame() {
      const id = this.id
      const url = `http://localhost:3000/api/games/${id}`
      fetch(url, {
        method: 'DELETE',
        mode: 'cors'
      })
      .then(res => {
        console.log(res)
        this.$router.push({ name: 'Store'})
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style> 
body {
  --light-green: #00DD99;
  --dark-bg-grey: #111111;
  --form-grey: #151515;
  --grey: #222222;
  --light-grey: #444444;
  --white: #FFFFFF;
  --red: #F53649;
  background-color: var(--dark-bg-grey);
  font-size: 16px;
}
</style>

<style scoped>
.parent-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 80px 0px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--grey);
  width: 1000px;
  height: 500px;
  padding: 50px;
  border-top: 20px;
  border-color: var(--red);
  border-top-style: solid;
  border-radius: 8px;
}

.header {
  color: var(--white);
  text-align: center;
  font-size: 2.4em;
}

.text {
  color: var(--white);
  font-size: 1.8em;
  margin: 60px 0px;
}

.btn-wrapper {
  display: flex;
  justify-content: space-between;
}
.cancel-btn {
  background-color: var(--light-grey);
  color: var(--white);
  border: none;
  font-size: 1.4em;
  width: 300px;
  height: 70px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn {
  background-color: var(--red);
  color: var(--white);
  border: none;
  font-size: 1.4em;
  width: 300px;
  height: 70px;
  border-radius: 4px;
  cursor: pointer;
}

</style>