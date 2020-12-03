<template>
<div class="admin">
  <h1>Add a new Journal Entry!</h1>
  <div class="heading">
      <div class="circle">1</div>
      <h2>Add an Item</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="name" placeholder="Name">
        <textarea v-model="message" placeholder="Your entry"></textarea>
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addItem">
        <h2>{{addItem.name}}</h2>
        <p> Descripton: {{addItem.message}}</p>
        <img :src="addItem.path" />
      </div>
    </div>
  </div>


</template>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      name: "",
      message: "",
      file: null,
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
    }
  },
  computed: {

  },
  created() {

  },
  methods: {
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items', {
          name: this.name,
          path: r1.data.path,
          message: this.message,
        });
        this.addItem = r2.data;
      } catch (error) {
      console.log("error in async upload");
      if(error == 413) {
      alert("File too large");
      }
        alert(error);
      }
    },
    fileChanged(event) {
      this.file = event.target.files[0]
    },


  }
}
</script>



<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

p {
font-size: 12;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  display: flex;

}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>
