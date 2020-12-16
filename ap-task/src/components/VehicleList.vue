<template>
  <section class="vehicle-list">
    <h2 v-if="hasVehicles">List of Vehicles</h2>
    <ol v-if="hasVehicles">
      <li 
        v-for="(v, i) in getVehicles" 
        :key="v.id" 
        class="vehicle-list-item"
        @click="showInfo(v.id)"
      >
        <span class="listNumber">{{ i+1 }}</span>
        <span style="color:#37B48C;">{{ v.events[0].eventInfo.vehicle }}</span>
        <span class="numberplate"><b>{{ v.events[0].eventInfo.vrm }}</b></span>
      </li>
    </ol>
    <button class="reg-btn" @click="regNewVehicle()">Register a new Vehicle</button>
    <RegistrationForm :active="showForm" @hide="showForm = false"/>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import RegistrationForm from "@/components/RegistrationForm.vue";


export default {
  name: "VehicleList",
  components: {
    RegistrationForm
  },
  data() {
    return {
      showForm: false
    }
  },
  computed: {
    ...mapGetters([
      "hasVehicles",
      "getVehicles"
    ]),
  },
  methods: {
    regNewVehicle() {
      this.showForm = true;
    },
    getInfo(vehicle) {
      return vehicle.events[0].eventInfo
    },
    showInfo(id) {
      this.$emit('onShowInfo', id)
    }
  }
};
</script>

<style lang="css">
.vehicle-list {
  float: left;
  text-align: left;
  width: 100%;
}
.listNumber {
  margin-right: 15px;
  display: inline-block;
  font-weight: bold;
  width: 1.6rem;
  height: 1.6rem;
  text-align: right;
}
.vehicle-list ol {
  list-style: none;
  padding-inline-start: 0;
}
.vehicle-list-item {
  cursor: pointer;
  margin-bottom: 8px;
}
.vehicle-list-item:hover {
  font-weight: bold;  
  color: black;
}
.numberplate {
  padding: 0px 6px;
  border: 1px solid #ccc;
  background-color: white;
  margin-left: 5px;
  float: right;
}

.reg-btn {
  cursor: pointer;
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #37B48C;
  margin: 0 0.3em 20px 0;
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