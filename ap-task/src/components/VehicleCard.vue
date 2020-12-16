<template>
  <section class="vehicle-card">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-8 aligh-left">
          <h2 style="color:#37B48C;">{{ info.vehicle }}</h2>  
        </div>
        <div class="col-12 col-md-4 aligh-right">
          <h3><span class="plain">VRM:</span> {{ info.vrm }}</h3>        
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-7 aligh-left">
          <h4 class="pm-0"><span class="plain">Year of Issue:</span> {{ info.year }}</h4>       
          <h4 class="pm-0"><span class="plain">Registration:</span> {{ registration }}</h4>
        </div>
        <div class="col-12 col-md-5 aligh-right">
          <h4 class="pm-0"><span class="plain">Maker:</span> {{ info.madeByBrand }}</h4>
          <h4 class="pm-0"><span class="plain">Model:</span> {{ info.model }}</h4> 
        </div>
        <div class="col-12 line-container">
          <div class="line" />
        </div>
      </div>
      <div class="row">
        <div class="col-12 aligh-left">
          <h3 class="events-header">
            <span>Events</span>
            <button class="add-btn" @click="addEvent()">Add a New Event</button>
          </h3>          
          <table style="width: 100%;">
            <tr>
              <th><span>Name</span></th>
              <th><span class="info">When</span></th>
              <th><span class="info">Days ago</span></th>
              <th><span class="info">Mileage</span></th>
            </tr>
            <tr v-for="e in events" :key="e.id">
              <td>
                <span>{{ e.eventTitle }}</span>
              </td>
              <td>
                <span class="info">{{ formatDate(e.eventDate) }}</span>
              </td>
              <td>
                <span class="info">{{ fromNow(e.eventDate) }}</span>
              </td>
              <td>
                <span class="info">{{ mileageFromNow(e.eventDate) }}</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <NewEventForm :active="showForm" @hide="showForm = false"/>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import NewEventForm from "@/components/NewEventForm.vue";

export default {
  name: "VehicleCard",
  props: ["id"],
  components: {
    NewEventForm
  },
  data() {
    return {
      events: null,
      info: null,
      registration: null,
      showForm: false
    }
  },
  computed: {
    ...mapGetters([
      "getVehicleById",
      "defaultMilesPerDay"
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
    },
    formatDate(date) {
      return moment(date).format("Do MMM YYYY"); 
    },
    fromNow(date) {
      var a = moment(date);
      var today = moment();
      return today.diff(a, 'days') // https://momentjs.com/docs/#/displaying/difference/
    },
    mileageFromNow(date) {
      const days = this.fromNow(date)
      return Math.round(days * this.defaultMilesPerDay).toLocaleString() // .toFixed(2)
    },
    addEvent() {
      console.log("add Event")
      this.showForm = true;
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
span.info {
  padding: 5px 10px;
}
.line-container,
.line {
  width: 100%;
  height: 1px;
}
.line {
  border-bottom: 1px solid #37B48C;
  padding: 10px 0px;
}
.pm-0 {
  padding: 0;
  margin: 0;
}
.plain {
  font-weight: 400;
}
.events-header {
  padding-top: 20px;
}
.add-btn {
  cursor: pointer;
  display: block;
  float: right;
  padding: 0.35em 1.2em;
  border: 0.1em solid #37B48C;
  /* margin: 0 0.3em 0.3em 20px; */
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
.add-btn:hover{
  color:white;
  background-color:#37B48C;
}
@media all and (max-width:30em){
  .add-btn {
    display: block;
    margin: 0.4em auto;
  }
}
</style>