<template>
<div>
  <div class="wrapper">
    <div class="left">
      <h1>Dream Vacation Builder</h1>
      <p>We supply the destinations, you supply the dreams</p>
    </div>
    <div class="right">
      <img src="/images/hawaii.jpg">
    </div>
  </div>
  <div class="wrapper">
  <div class="left newleft">
    <img src="/images/peru.jpg">
  </div>
  <div class="right newright">
    <info>Select from our locations and add your own Itinerary! The world is just around the corner!</info>
  </div>
</div>
</div>
</template>

<script>


export default {
  name: 'Home',
  
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}

.left {
  background-color: lightskyblue;
  padding:110px;
  text-align: center;
  align-items: center;
}
.right {
  background-color: #12c6cc;
  padding: 20px;
}
.wrapper {
  background-color: lightblue;
  /* display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "left right";
align-items: center; */
  display: flex;
  align-items: center;
  margin: 20px;
}
.newleft {
  background-color: #12c6cc;
  padding: 20px;
}
.newright {
  background-color: lightskyblue;
  padding: 110px;
}

@media screen and (max-width: 600px) {
  .wrapper {
    flex-direction: column;
  }
}

</style>
