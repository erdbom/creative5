<template>
<div class="wrapper">
  <div class="products">
    <div class="location" v-for="location in this.$root.$data.locations" :key="location.id">
      <div class="info">
        <h1>{{location.name}}</h1>
      </div>
      <div class="image">
        <img :src="'/images/'+location.image">
      </div>
      <div class="price">
        <h2>${{location.price}}</h2>
        <button v-if="!location.isInItinerary" v-on:click="addToItinerary(location)" class="auto">Add to Itinerary</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Dest',
  methods: {
    // addToItinerary(location) {
    //   this.$root.$data.itinerary.push(location);
    //   this.$root.$data.total += location.price;
    //   location.isInItinerary = true;
    // },
    async addToItinerary(location) {
      try {
        this.$root.$data.total += location.price;
        location.isInItinerary = true;
        //console.log(location);
        await axios.post('/api/itinerary', {
          name: location.name,
          price: location.price,
          image: location.image,
          activities: location.activities,
          isInItinerary: location.isInItinerary
        });
        //console.log(r.data);
      }
      catch (error) {
        //console.log(error);
      }
    }
  }

}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}

.info {
  background-color: lightskyblue;
  padding: 20px;
  border: 2px solid gray;
}
.price {
  background-color: #12c6cc;
  margin-bottom: 30px;
  padding: 20px;
}
.wrapper {
  background-color: lightblue;
  margin: 20px;
}
</style>