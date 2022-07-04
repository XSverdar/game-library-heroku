<template>
  <Navbar></Navbar>
  <div class="container">
  <h1>Verdant Games</h1>
  <h2>is run by a trio of passionate gamers who want other people to have a platform for their own love of video games.</h2>
  <div class="about-container">
      <div class="about-element"><img class="image-dev" src="../assets/devs/erin.jpg"><br><br>Erin La'O</div>
      <div class="about-element"><img class="image-dev" src="../assets/devs/kriz.jpg"><br><br>Kriz Tahimic</div>
      <div class="about-element"><img class="image-dev" src="../assets/devs/denzel.jpg"><br><br>Denzel Yongco</div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'AboutView',
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

  .container {
    text-align: center;
    margin-top: 50px;
    padding-left: 200px;
    padding-right: 200px;
  }

  h1 {
    font-size: 50px;
    color: #00de9a;
  }

  h2 {
    font-size: 30px;
  }

  .image-dev{
    height: 350px;
    width: 350px;
  }

  .about-container {
    margin-top: 25px;
    vertical-align: middle;
    display: flex;
    
  }

  .about-element {
    flex: 1;
    padding: 10px;
    font-size: 22px;
  }
</style>
