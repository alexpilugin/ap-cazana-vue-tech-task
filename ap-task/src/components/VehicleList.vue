<template>
  <section>
    <h2>List of Vehicles</h2>
    <h2 v-if="hasVehicles">It has Vehicles</h2>
    <button class="reg-btn" @click="regNewVehicle()">Register a new Vehicle</button>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const { v4 } = require('uuid');

export default {
  name: "VehicleList",
  computed: {
    ...mapGetters([
      "hasVehicles",
      "getVehicles"
    ]),
  },
  methods: {
    ...mapActions([
      "register"
    ]),
    regNewVehicle() {
      let regEvent = {
        eventTitle: 'First Registration',
        eventType: 'registration',
        eventDate: new Date(),
        eventInfo: {
          id: v4(),
          vehicle: 'new vehicle',
          vrm: 'VRM',
          madeByBrand: 'BRAND',
          model: 'MODEL',
          year: 'YEAR'
        }
      }
      console.log(regEvent);
      this.register(regEvent)
    }
  }
};
</script>

<style lang="css">
.reg-btn {
  cursor: pointer;
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #37B48C;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: #37B48C;
  background: transparent;
  text-align: center;
  transition: all 0.2s;
}
.reg-btn:hover{
  color:white;
  background-color:#37B48C;
}
@media all and (max-width:30em){
  .reg-btn {
    display: block;
    margin: 0.4em auto;
  }
}
</style>