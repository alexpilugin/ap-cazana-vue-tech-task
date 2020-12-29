<template>
  <tr class="event-row" @click.stop="showEditForm($event)">
    <td>
      <span class="text-bold">{{ event.eventTitle }}</span
      ><br />
      <span v-if="event.eventType === 'registration'">
        VRM: {{ event.eventInfo.vrm }}
      </span>
      <span v-if="event.eventType === 'ad'">
        ${{ Number(event.eventInfo.price).toLocaleString() }}
      </span>
      <span v-if="event.eventType === 'mot'">
        Result: {{ event.eventInfo.result }}
      </span>
      <span v-if="event.eventType === 'vrm-change'">
        VRM: {{ event.eventInfo.toVRM }}
      </span>
    </td>
    <td>
      <span>{{ formatDate(event.eventDate) }}</span>
    </td>
    <td>
      <span>{{ daysTillNow(event.eventDate) }}</span>
    </td>
    <td>
      <span v-if="event.eventType === 'registration'">{{
        defaultMileageTillNow(event.eventDate)
      }}</span>
      <span v-if="event.eventType === 'ad'">{{ getMileageFromEvent() }}</span>
      <span v-if="event.eventType === 'mot'">{{ getMileageFromEvent() }}</span>
      <span v-if="event.eventType === 'vrm-change'">-</span>
    </td>
    <td>
      <span v-if="event.eventType === 'vrm-change'">-</span>
      <span v-else>{{ getAnnualAverageMiles() }}</span>
    </td>
    <EditEventForm
      :active="showForm"
      :vId="vehicleId"
      :eId="eventId"
      @hide="closeEditForm"
    />
  </tr>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import EditEventForm from "@/components/EditEventForm.vue";

export default {
  name: "MyTableRow",
  props: ["event"],
  components: {
    EditEventForm
  },
  data() {
    return {
      showForm: false,
      registration: null,
      daysFromReg: null
    };
  },
  mounted() {
    this.getInfo();
  },
  computed: {
    ...mapGetters([
      "getVehicleById",
      "defaultMilesPerDay",
      "defaultMilesPerAnnum"
    ]),
    vehicleId() {
      return this.event.eventInfo.vehicleId;
    },
    eventId() {
      return this.event.eventId;
    }
  },
  methods: {
    showEditForm(event) {
      if (event.target.tagName.toLowerCase() === "button") return;
      this.showForm = true;
    },
    closeEditForm() {
      this.showForm = false;
    },
    getInfo() {
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
      if (this.event) {
        console.log("getMileageFromEvent: " + this.event.eventType);
        const eventDate = moment(this.event.eventDate);
        const daysAfterEvent = this.daysTillNow(this.event.eventDate);
        const m = Number(this.event.eventInfo.mileage);
        const vId = this.event.eventInfo.vehicleId;
        const regDate = this.getVehicleById(vId).events[0].eventDate;
        const daysFromRegToEvent = eventDate.diff(regDate, "days");
        if (daysAfterEvent == 0) {
          console.log("daysAfterEvent: " + daysAfterEvent + " miles: " + m);
          return Math.round(m).toLocaleString();
        } else {
          console.log("daysAfterEvent: " + daysAfterEvent + " miles: " + m);
          const averageMilesPerDay = Math.abs(m / daysFromRegToEvent);
          console.log(
            "daysFromRegToEvent: " +
              daysFromRegToEvent +
              " averageMilesPerAnnum: " +
              averageMilesPerDay * 365
          );
          const result = daysAfterEvent * averageMilesPerDay + m;
          return Math.round(result).toLocaleString();
        }
      }
    },
    getAnnualAverageMiles() {
      if (this.event) {
        if (this.event.eventType == "registration") {
          return Math.round(this.defaultMilesPerAnnum).toLocaleString();
        }
        const vId = this.event.eventInfo.vehicleId;
        const regDate = this.getVehicleById(vId).events[0].eventDate;
        const eventDate = moment(this.event.eventDate);
        const daysFromRegToEvent = eventDate.diff(regDate, "days");
        if (daysFromRegToEvent == 0) {
          return Math.round(this.defaultMilesPerAnnum).toLocaleString();
        } else {
          const m = Number(this.event.eventInfo.mileage);
          const averageMilesPerDay = Math.abs(m / daysFromRegToEvent);
          return Math.round(365 * averageMilesPerDay).toLocaleString();
        }
      }
    }
  }
};
</script>

<style>
.text-bold {
  font-weight: bold;
}
.event-row {
  cursor: pointer;
}
.event-row:hover {
  background-color: #fafafae0;
}
</style>
