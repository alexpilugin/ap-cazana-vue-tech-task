<template>
  <tr>
    <td>
      <span class="text-bold">{{ event.eventTitle }}</span><br>
      <span 
        v-if="event.eventType === 'ad'"
      >
        ${{ Number(event.eventInfo.price).toLocaleString() }}
      </span>
      <span 
        v-if="event.eventType === 'mot'"
      >
        Result: {{ event.eventInfo.result }}
      </span>
    </td>
    <td>
      <span>{{ formatDate(event.eventDate) }}</span>
    </td>
    <td>
      <span>{{ daysTillNow(event.eventDate) }}</span>
    </td>
    <td>
      <span v-if="event.eventType === 'registration'">{{ defaultMileageTillNow(event.eventDate) }}</span>
      <span v-if="event.eventType === 'ad'">{{ getMileageFromEvent() }}</span>
      <span v-if="event.eventType === 'mot'">{{ getMileageFromEvent() }}</span>
    </td>
  </tr>

</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "MyTableRow",
  props: ["event"],
  data() {
    return {
      registration: null,
      daysFromReg: null
    }
  },
  mounted() {
    this.getInfo()
  },
  computed: {
    ...mapGetters([
      "getVehicleById",
      "defaultMilesPerDay"
    ]),
  },
  methods: {
    getInfo () {
      const id = this.event.eventInfo.vehicleId;
      const regDate = this.getVehicleById(id).events[0].eventDate;
      const reg = moment(regDate);
      this.registration = reg.format("Do MMM YYYY"); 
      const eventDate = moment(this.event.eventDate);
      this.daysFromReg = eventDate.diff(reg, "days");   
    },
    formatDate(date) {
      return moment(date).format("Do MMM YYYY");
    },
    daysTillNow(date) {
      let a = moment(date);
      let today = moment();
      return today.diff(a, "days"); // https://momentjs.com/docs/#/displaying/difference/
    },
    defaultMileageTillNow(date) {
      const days = this.daysTillNow(date);
      return Math.round(days * this.defaultMilesPerDay).toLocaleString(); // .toFixed(2)
    },
    getMileageFromEvent() {
      if(this.event) {
        const eventDate = moment(this.event.eventDate);
        const daysAfterEvent = this.daysTillNow(this.event.eventDate);
        const m = Number(this.event.eventInfo.mileage);
        const vId = this.event.eventInfo.vehicleId;
        const regDate = this.getVehicleById(vId).events[0].eventDate;
        const daysFromRegToEvent = eventDate.diff(regDate, "days");
        if(daysAfterEvent == 0) {
          console.log("daysAfterEvent: "+ daysAfterEvent + " miles: " +m);
          return Math.round(m).toLocaleString();
        } else {
          console.log("daysAfterEvent: "+ daysAfterEvent + " miles: " +m);
          const averageMilesPerDay = Math.abs(m / daysFromRegToEvent);
          const result = daysAfterEvent * averageMilesPerDay + m;
          return Math.round(result).toLocaleString();
        }
      }
    }
  },
};
</script>

<style>
.text-bold {
  font-weight: bold;
}
</style>