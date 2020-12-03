<template>
<div>
  <h1>My Journal</h1>
  <div v-if="this.$root.$data.entries.length === 0">
    <hr/>
    <div class="problem">
      <p>You currently have no journal entries.</p>
    </div>
  </div>
  <div v-for="entry in items.slice().reverse()" v-bind:key="entry.id">
    <hr/>
    <div class="ticket">
      <div class="problem">

        <p><b>{{entry.name}}</b></p>
        <p><i>{{entry.message}}</i></p>
        <img :src="entry.path"/>

      </div>
    </div>
  </div>

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

  },
}
</script>
