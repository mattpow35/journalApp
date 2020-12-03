<template>
<div>
  <h1>My Journal</h1>
  <div v-if="items.length === 0">
    <hr />
    <div class="problem">
      <p>You currently have no journal entries.</p>
    </div>
  </div>
  <section class="image-gallery">
    <div class="image" v-for="entry in items.slice().reverse()" v-bind:key="entry.id">
      <hr />
      <div class="ticket">
        <div class="problem">

          <h3><b>Posted by: {{entry.name}}</b></h3>
          <p>{{entry.date}}</p>
          <img :src="entry.path" />
          <p id="entry">{{entry.message}}</p>
           <span class="glyphicon glyphicon-thumbs-up" v-on:click="addLike(entry)"></span> <p>{{entry.likes}}</p>
          <button v-on:click="deleteItem(entry)" class="auto">Delete</button>

        </div>
      </div>
    </div>
  </section>

</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      items: [],

    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        alert(error);
      }
    },
    async deleteItem(item) {
      var password = prompt("Please enter the password to delete", "");
      if (password == "delete") {
        try {
          await axios.delete("/api/items/" + item._id);
          //this.findItem = null;
          this.getItems();
          return true;
        } catch (error) {
          alert(error);
        }
      } else {
        alert("Incorrect Password");
      }

    },
    async addLike(item) {
    try {
      await axios.put("/api/items/" + item._id, {
        likes: item.likes + 1,

      });
      this.getItems();
      return true;
    } catch (error) {
      alert(error);
    }
  },


  },
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
}

.image p {

  font-size: 12px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

#entry {
  font-size: 18px;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 2;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 1;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 1;
  }
}
</style>
