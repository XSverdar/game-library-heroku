<template>
    <Navbar></Navbar>
    <div class="parent-container">
      <div class="view-game-rectangle">
        <div class="container">
          <div class="game-image"><img :src="image"></div>
          <button class="back-button" @click="$router.back()"><img src="..\assets\img\BackButton.png" alt="Back Button Image" class="back-image"></button>
          <router-link :to="{ name: 'UpdateGame', params: { id: id }}"><button class="edit-button">Edit</button></router-link>
          <router-link :to="{ name: 'DeleteGame', params: { id: id }}"><button class="delete-button">Delete</button></router-link>
        <button @click="addToLib()" class="buy-game-button">
          Add to Library
        </button>
        </div>
        <div class="information">
          <div class="flex-1">
            <div class="title">{{ title }}</div>
            <div class="green-bullet"><img src="..\assets\img\GreenBullet.png" alt="Green Bullet Image"></div>
            <div class="genre">{{ genre }}</div>
          </div>
          <div class="stars">★ {{ rating }}</div>
          <div class="definition">{{ description }}</div>
          <a class="url" :href="url">{{ url }}</a>
        </div>
      </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import TokenService from '../services/TokenService'

export default {
  name: 'ViewGame',
  components: {
    'Navbar': Navbar
  },
  data() {
    return {
      id: this.$route.params.id,
      title: '',
      genre: '',
      rating: '',
      description: '',
      url: '',
      image: ''
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
      vm.title = data.title,
      vm.genre = data.genre,
      vm.rating = data.rating,
      vm.description = data.description,
      vm.url = data.url,
      vm.image = data.image
    })
    .catch(err => console.log(err))
  },
  methods: {
    addToLib() {
      const userId = TokenService.getDecoded()._id
      const gameId = this.id
      const url = `http://localhost:3000/api/users/games/${userId}`

      console.log(JSON.stringify({gameId}))
      
      fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          gameId
        }),
        mode: 'cors'
      })
      .then(response => {
        this.$router.push({ name: 'Library' })
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
}
</script>

<style>
  body{
    background-color: #111111;

  }
</style>
<style scoped>
  a {
    text-decoration: none;
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    line-height: 44px;

    color: #FFFFFF;
  }

  .back-image {
    position: absolute;
    width: 53px;
    height: 58px;
    left: 20px;
    top: 20px;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .back-button{
    background-color: transparent;
    padding: 0px;
    border: 0px;
    cursor: pointer;
  }
  .parent-container {
    margin: 10%;

    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  .stars {
    margin-top: 10px;
    width: 186px;
    height: 37.99px;
    font-size: 2em;
    color: yellow;
  }
  .green-bullet {
    width: 11px;
    height: 12px; 
  }

    .buy-game-button {
    width: 269px;
    height: 81px;
    left: 900px;
    top: 400px;

    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 39px;
    /* identical to box height */

    text-align: center;

    color: #FFFFFF;

    background: #00DD99;
    border-radius: 4px;
    cursor: pointer;
  }
  .definition {
    margin-top: 50px;
    margin-bottom: 50px;

    width: 1170px;
    height: auto;

    font-style: normal;
    font-weight: 400;
    font-size: 1.6em;
    line-height: 44px;

    color: #FFFFFF;
  }
  .flex-1 {
    display: flex;
    align-items: center;
    gap: 35px;
  }


  .title {
    font-style: normal;
    font-weight: 400;
    font-size: 48px;
    line-height: 58px;

    color: #FFFFFF;
  }

  .genre {
    width: 343px;
    height: 42px;

    font-style: normal;
    font-weight: 400;
    font-size: 29px;
    line-height: 35px;

    color: #FFFFFF;
  }
  .delete-button {
    left: 1062px;
    cursor: pointer;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .edit-button {
    left: 930px;
    cursor: pointer;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  button{
    position: absolute;
    width: 59px;
    height: 39px;
    top: 27px;

    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 39px;
    /* identical to box height */


    color: #EBEBEB;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    background: transparent;
    border: 0px;
  }

  .container {
    position: relative;
    width: 1199px;
    height: 523px;  
  }
  .view-game-rectangle {
    width: 1199px;
    height: auto;
    padding-bottom: 2%;


    background: #222222;
    border-radius: 8px;
  }
  img {
    width:100%;
    height:100%;
    object-fit:cover;
  }
  .game-image {
    width:100%;
    height:100%;
    object-fit:cover;
  }
  .information {
    margin-left: 29px;
    margin-top: 28px;
  }
  .url {
    font-size: 1.6em;
  }
</style>