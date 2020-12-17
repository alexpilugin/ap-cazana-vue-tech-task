<template>
  <tr>
    <td>
      <span>{{ event.eventTitle }}</span><br>
      <span 
        v-if="event.eventType === 'ad'"
      >
        ${{ Number(event.eventInfo.price).toLocaleString() }}
      </span>
    </td>
    <td>
      <span>{{ formatDate(event.eventDate) }}</span>
    </td>
    <td>
      <span>{{ fromNow(event.eventDate) }}</span>
    </td>
    <td>
      <span 
        v-if="event.eventType === 'registration'"
      >
        {{ mileageFromNow(event.eventDate) }}
      </span>
      <span 
        v-if="event.eventType === 'ad'"
      >
        {{ getMileageFromAdEvent() }}
      </span>
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
      let reg = moment(regDate);
      this.registration = reg.format("Do MMM YYYY"); 
      let eventDate = moment(this.event.eventDate);
      this.daysFromReg = eventDate.diff(reg, "days");   
    },
    formatDate(date) {
      return moment(date).format("Do MMM YYYY");
    },
    fromNow(date) {
      let a = moment(date);
      let today = moment();
      return today.diff(a, "days"); // https://momentjs.com/docs/#/displaying/difference/
    },
    mileageFromNow(date) {
      const days = this.fromNow(date);
      return Math.round(days * this.defaultMilesPerDay).toLocaleString(); // .toFixed(2)
    },
    getMileageFromAdEvent() {
      if(this.event) {
        const days = this.fromNow(this.event.eventDate);
        const m = Number(this.event.eventInfo.mileage);
        const id = this.event.eventInfo.vehicleId;
        const reg = moment(this.getVehicleById(id).events[0].eventDate)
        const eventDate = moment(this.event.eventDate);
        const daysFromRegTillEvent = eventDate.diff(reg, "days")
        if(days == 0) {
          return Math.round(m).toLocaleString();
        } else {
          const averageMilesPerDay = Math.abs(m / daysFromRegTillEvent);
          const result = days * averageMilesPerDay + m;
          return Math.round(result).toLocaleString();
        }
      }
    }
  },
};
</script>

<style>
</style>