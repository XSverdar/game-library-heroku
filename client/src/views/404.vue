<template>
  <div class="container">
    <div class="notfoundtitle">404 page not found</div>
    <div class="home-link"><router-link :to="{ name: 'Home' }">You may want to go back home</router-link></div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;

}
.notfoundtitle {
  font-size: 5.0em;
}
.home-link {
  text-decoration: underline;
  font-size: 3.0em;
}
</style>