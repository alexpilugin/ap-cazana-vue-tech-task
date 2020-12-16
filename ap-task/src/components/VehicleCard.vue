<template>
  <section class="vehicle-card">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-8 aligh-left">
          <h2 style="color:#37B48C;">{{ info.vehicle }}</h2>  
          <h4>Year of Issue: {{ info.year }}</h4>       
          <h4>Registration: {{ registration }}</h4>
        </div>
        <div class="col-12 col-md-4 aligh-right">
          <h3>VRM: {{ info.vrm }}</h3>
          <h4>Maker: {{ info.madeByBrand }}</h4>
          <h4>Model: {{ info.model }}</h4>         
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "VehicleCard",
  props: ["id"],
  data() {
    return {
      events: null,
      info: null,
      registration: null
    }
  },
  computed: {
    ...mapGetters([
      "getVehicleById"
    ]),
  },
  watch: {
    id(value) {
      this.getInfo(value)  
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo (vehicleId) {
      const id = vehicleId || this.id;
      this.events = this.getVehicleById(id).events;
      this.info = this.events[0].eventInfo; 
      this.registration = moment(this.events[0].eventDate).format("Do MMM YYYY");     
    }
  }
};
</script>

<style>
.vehicle-card {
  border-radius: 4px;
  background-color: #fff;
  background-color: var(--mdc-theme-surface, #fff);
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.aligh-left {
  text-align: left;
}
.aligh-right {
  text-align: right;
}
</style>