<template>
  <div>
    <Dest v-if='user'/>
    <Login v-else/>
  </div>
</template>

<script>
import Dest from '@/components/Dest.vue';
import Login from '@/components/Login.vue';
import axios from 'axios';
export default {
  name: 'dashboard',
  components: {
    Dest,
    Login,
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
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