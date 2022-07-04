<template>
  <Navbar></Navbar>
  <div class="parent-container">
    <dir class="container">
      <router-link class="back" to="/">Back</router-link>
      <h1>Create Game</h1>
      <form class="edit-form">
        <div class="err-msg" v-for="error in errors" :key="error.id">
          {{ error }}
        </div>
        <label id="img-label">
          <img class="icon" src="../assets/svg/upload_img.svg">
          <p class="fileName">{{ imageName }}</p>
          <div class="upload-btn">Upload Game Poster</div>
          <br>
          <input id="img-input" type="file" accept="image/*" @change="uploadImage">
        </label>
        <div class="text-grp">
          <label class="label">Game title</label>
          <input class="input" type="text" v-model="title">
          <label class="label">Genre</label>
          <select class="input" v-model="genre">
            <option>Action</option>
            <option>Action-adventure</option>
            <option>Adventure</option>
            <option>Puzzle</option>
            <option>Role-playing</option>
            <option>Simulation</option>
            <option>Strategy</option>
            <option>Sports</option>
            <option>MMO</option>
            <option>Other</option>
          </select>
          <label class="label">Rating</label>
          <input class="input" type="number" min="1" max="5" v-model="rating">
          <label class="label">Description</label>
          <textarea class="text-area" v-model="description">
          </textarea>
          <label class="label">Store link</label>
          <input class="input" type="text" v-model="storeurl">
        </div>
        <button class="edit-btn" @click.prevent="create()">Create</button>
      </form>
    </dir>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'CreateGame',
  components: {
    'Navbar': Navbar,
  },
  data() {
    return {
      title: '',
      genre: 'Action',
      rating: 0,
      description: '',
      storeurl: '',
      image: '',
      imageName: '',
      errors: []
    }
  },
  methods: {
    create() {
      if (this.isValid()){
        console.log('create game')
        const url = 'http://localhost:3000/api/games' // server
        const formData = new FormData()
        formData.append('title', this.title)
        formData.append('genre', this.genre)
        formData.append('rating', this.rating)
        formData.append('description', this.description)
        formData.append('url', this.storeurl)
        formData.append('image', this.image)
  
        fetch(url, {
          method: 'POST',
          body: formData,
          mode: 'cors'
        })
        .then(response => {
          this.$router.push({ name: 'Store'})
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    uploadImage(event) {
      this.image = event.target.files[0]
      this.imageName = event.target.files[0].name
    },
    isValid() {
      let bool = 1
      const invalid = []
      if (this.title == "") {
        invalid.push('Title is required.')
        bool = 0
      }
      if (this.genre == "") {
        invalid.push('Genre is required.')
        bool = 0
      }
      if (this.rating == "") {
        invalid.push('Rating is required.')
        bool = 0
      }
      // if (!(String.valueOf(this.rating) <= 5 
      //     && String.valueOf(this.rating.valueOf >=  0))) {
      //   invalid.push('Rating is supposed to be 0 to 5.')
      //   console.log('Rating is only 0 to 5.')
      //   bool = 0
      // }
      if (this.description == "") {
        invalid.push('Description is required.')
        bool = 0
      }
      if (this.storeurl == "") {
        invalid.push('URL is required.')
        bool = 0
      }
      if (this.image == "") {
        invalid.push('Image is required.')
        bool = 0
      }
      this.errors = invalid
      return bool
    }
  }
}
</script>

<style scoped>
.parent-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 80px 0px;
}
.container {
  background-color: var(--grey);
  width: 1200px;
  padding: 50px;
  border-top: 20px;
  border-color: var(--light-green);
  border-top-style: solid;
  border-radius: 8px;
}
.back {
  text-decoration: none;
  color: var(--white);
  font-size: 1.4em;
}
.edit-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-gap: 30px;
}
h1 {
  color: var(--white);
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.4em;
}
.err-msg {
  color: var(--red);
  text-align: center;
}

.label {
  color: var(--white);
  font-size: 1.2em;
}
#img-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px var(--light-green) dashed;
  text-align: center;
  cursor: pointer;
  color: var(--white);
  font-size: 1.6em;
}

.fileName {
  color: green;
  font-size: 1.2em;
}
.icon {
  height: 100px;
  width: 100px;
  margin: 30px 0;
}
.upload-btn {
  background-color: var(--light-green);
  font-size: 1em;
  margin: 30px 0;
  padding: 20px;
  border-radius: 4px;
}
.text-grp {
  display: grid;
  grid-template-columns: 300px 500px;
  grid-gap: 20px;
}
.input {
  background-color: var(--form-grey);
  color: var(--white);
  font-size: 1.2em;
  padding: 0.7em;
  border: 0;
  border-radius: 4px;
}
#img-input {
  border: 2px var(--light-green) dashed;
  display: none;
}
.text-area {
  font-size: 1.2em;
  background-color: var(--form-grey);
  color: var(--white);
  font-size: 1.2em;
  border: 0;
  border-radius: 4px;
  height: 200px;
}
.edit-btn {
  background-color: var(--light-green);
  color: var(--white);
  border: 0;
  cursor: pointer;
  padding: 1em;
  font-size: 1.2em;
  border-radius: 4px;
  font-weight: bold;
}

</style>