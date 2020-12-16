<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <h1>Technical Task for Cazana</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <VehicleList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import VehicleList from "@/components/VehicleList.vue";
//import { mapState, mapGetters } from 'vuex'
export default {
  name: "Home",
  components: {
    VehicleList
  }
};
</script>
