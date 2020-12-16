<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <h1>Technical Task for Cazana</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6">
          <VehicleList @onShowInfo="showInfoCard"/>
        </div>
        <div class="col-12 col-md-6">
          <VehicleCard v-if="id" :id="id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import VehicleList from "@/components/VehicleList.vue";
import VehicleCard from "@/components/VehicleCard.vue";
//import { mapState, mapGetters } from 'vuex'
export default {
  name: "Home",
  components: {
    VehicleList,
    VehicleCard
  },
  data() {
    return {
      id: null
    }
  },
  methods: {
    showInfoCard(id) {
      this.id = id;
    }
  }
};
</script>

<style scoped>
</style>