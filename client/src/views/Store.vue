<template>
  <Navbar></Navbar>
  <div class="container">
    <h1>Store</h1>
    <br>
    <input class="search-input" type="text" v-model="search" placeholder="Search...">
    <div class="store-container">
      <router-link v-for="game in filteredgames" :key="game._id" :to="{ name: 'ViewGame', params: { id: game._id }}">
        <div class="store-element" ><img class="image-game" :src="'http://localhost:3000/' + game.image"><br>{{ game.title }}<br><p class="rating">★ {{ game.rating }}</p></div>
      </router-link>
      <p class="noresults" v-if="!filteredgames.length">No results found.</p>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Store',
  components: {
    "Navbar": Navbar,
  },
  data() {
    return {
      games: [],
      search: ''
    }
  },
  mounted() {
    const url = 'http://localhost:3000/api/games/'
    const vm = this

    fetch(url, {
      mode: 'cors'
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data)
      vm.games = data
    })
    .catch(err => console.log(err))
  },
  computed: {
    filteredgames() {
      return this.games.filter((game) => {
        return game.title.match(this.search)
      })
    }
  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    line-height: 44px;

    color: #FFFFFF;

    padding-bottom: 50px;
    margin-top: 33px;
    padding-right: 20px;

    height: auto;
  }
  .image-game{
    height: 350px;
    width: 350px;
    border-radius: 2%;
  }

  .rating {
    color: yellow;
    font-size: 1.2em;
  }

  body {
    background-color: black;
    color: white;
  }

  h1 {
    font-size: 36px;
    color: white;
  }

  .container {
    margin: 50px 100px 50px 100px;
  }

  .store-container {
    margin-top: 25px;
    vertical-align: middle;
    display: flex;
    flex-wrap: wrap;
  }

  .store-element {
    font-size: 0.8em;
  }

  .store-element:hover {
    background-color: var(--grey);
    border-radius: 4%;
  }
  .search-input {
    background-color: var(--semi-light-grey);
    color: var(--white);
    border: none;
    font-size: 1.6em;
    border-radius: 4px;
    padding: 10px;
    width: 30%;
  }
  .noresults {
    font-size: 2em;
    text-align: center;
  }
</style>