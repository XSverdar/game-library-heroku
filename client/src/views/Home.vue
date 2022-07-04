<template>
  <Navbar></Navbar>
  <div class="home-container">
    <h1>Welcome to</h1> <h2 color="#00de9a">Verdant Games</h2><br>
    <h3>Made for gamers.</h3><br><br>
    <img class="home-logo" src="../assets/svg/lib_logo.svg"><br><br><br><br><br><br><br><br>
    <b>Verdant Games (C)</b> LA'O, TAHIMIC, YONGCO
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    'Navbar': Navbar
  }
}
</script>

<style scoped>
  body {
    background-color: black;
    color: white;
  }

  .home-container {
    margin-top: 50px;
    padding-left: 200px;
    padding-right: 200px;
    text-align: center;
    background-image: url('../assets/home-image.png');
    
  }

  .home-logo {
    height: 200px;
    width: 200px;
    text-align: center;
  }

  h1 {
    font-size: 50px;
  }

  h2 {
    font-size: 50px;
    color: #00de9a;
  }

  h3 {
    font-size: 30px;
    font-style: italic;
  }
</style>