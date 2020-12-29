<template>
  <ModalScreen :active="show">
    <form class="edit-form">
      <table>
        <tr>
          <td colspan="2">
            <h4 class="event-title">{{ currEvent.eventTitle }}</h4>
            <h4
              class="event-subtitle"
              v-if="currEvent.eventType == 'registration'"
            >
              {{ currEvent.eventInfo.vehicle }}
            </h4>
          </td>
        </tr>
        <tr>
          <td>
            <label for="event-date">Date</label>
          </td>
          <td>
            <input
              type="date"
              id="event-date"
              name="event-date"
              :max="today"
              style="width: 100%"
              v-model="eventDate"
            />
          </td>
        </tr>
        <!-- if registration -->
        <tr v-if="currEvent.eventType == 'registration'">
          <td>
            <label for="maker">Maker</label>
          </td>
          <td>
            <input
              type="text"
              id="maker"
              name="maker"
              :value="eventInfo.madeByBrand"
              @input="eventInfo.madeByBrand = $event.target.value"
            />
          </td>
        </tr>
        <tr v-if="currEvent.eventType == 'registration'">
          <td>
            <label for="model">Model</label>
          </td>
          <td>
            <input
              type="text"
              id="model"
              name="model"
              :value="eventInfo.model"
              @input="eventInfo.model = $event.target.value"
            />
          </td>
        </tr>
        <tr v-if="currEvent.eventType == 'registration'">
          <td>
            <label for="vrm">VRM (numberplate)</label>
          </td>
          <td>
            <input
              type="text"
              id="vrm"
              name="vrm"
              :value="eventInfo.vrm.toUpperCase()"
              @input="eventInfo.vrm = $event.target.value.toUpperCase()"
              style="text-transform: uppercase"
            />
          </td>
        </tr>

        <!-- if MOT -->
        <tr v-if="currEvent.eventType == 'mot'">
          <td>
            <label for="mileage">Mileage</label>
          </td>
          <td>
            <input
              type="number"
              id="mileage"
              name="mileage"
              min="0"
              max="1000"
              step="10"
              style="width: 100%"
              :value="eventInfo.mileage"
              @input="eventInfo.mileage = $event.target.value"
            />
          </td>
        </tr>
        <tr v-if="currEvent.eventType == 'mot'">
          <td style="padding-top: 10px;">
            <label for="checkbox">Result</label>
          </td>
          <td style="padding-top: 10px;">
            <input
              type="radio"
              id="pass"
              value="pass"
              v-model="eventInfo.result"
            />
            <span>pass</span>
            <input
              type="radio"
              id="fail"
              value="fail"
              style="margin-left: 15px;"
              v-model="eventInfo.result"
            />
            <span>fail</span>
          </td>
        </tr>

        <!-- if VRM -->
        <tr v-if="currEvent.eventType == 'vrm-change'">
          <td>
            <label><span>Previous VRM</span></label>
          </td>
          <td>
            <span
              ><b>{{ eventInfo.fromVRM }}</b></span
            >
          </td>
        </tr>
        <tr v-if="currEvent.eventType == 'vrm-change'">
          <td>
            <label><span>New VRM</span></label>
          </td>
          <td>
            <input
              type="text"
              id="vrm"
              name="vrm"
              style="width: 100%"
              :value="eventInfo.toVRM.toUpperCase()"
              @input="eventInfo.toVRM = $event.target.value.toUpperCase()"
            />
          </td>
        </tr>

        <!-- if AD -->
        <tr v-if="currEvent.eventType == 'ad'">
          <td>
            <label for="mileage">Mileage</label>
          </td>
          <td>
            <input
              type="number"
              id="mileage"
              name="mileage"
              min="0"
              max="1000"
              step="10"
              style="width: 100%"
              :value="eventInfo.mileage"
              @input="eventInfo.mileage = $event.target.value"
            />
          </td>
        </tr>
        <tr v-if="currEvent.eventType == 'ad'">
          <td>
            <label for="model">Price</label>
          </td>
          <td>
            <input
              type="number"
              min="0"
              step="10"
              :value="eventInfo.price"
              @input="eventInfo.price = $event.target.value"
            />
          </td>
        </tr>

        <!--- buttons --->
        <tr>
          <td>
            <button class="cancel" @click.prevent="cancel">Cancel</button>
          </td>
          <td>
            <button class="submit" @click.prevent="update">Update</button>
          </td>
        </tr>
      </table>
    </form>
  </ModalScreen>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import ModalScreen from "@/components/ModalScreen.vue";

export default {
  name: "EditEventForm",
  props: ["active", "vId", "eId"],
  components: {
    ModalScreen
  },
  data() {
    return {
      show: false,
      currEvent: null,
      eventDate: null,
      today: moment().format("YYYY-MM-DD"), // '2020-12-16'
      eventInfo: null
    };
  },
  created() {
    console.log("EditForm vId: " + this.vId + " eId: " + this.eId);
    this.currEvent = this.thisEvent();
    this.eventDate = moment(this.currEvent.eventDate).format("YYYY-MM-DD"); // '2017-07-04',
    this.eventInfo = this.currEvent.eventInfo;
  },
  watch: {
    active(v) {
      this.show = v;
    },
    eventDate(value) {
      this.year = moment(value)
        .toDate()
        .getFullYear();
    }
  },
  computed: {
    ...mapGetters(["getEvent"])
  },
  methods: {
    ...mapActions(["updateEvent"]),
    thisEvent() {
      return this.getEvent(this.vId, this.eId);
    },
    cancel() {
      this.$emit("hide");
    },
    update() {
      let thisEvent = {
        eventTitle: this.currEvent.eventTitle,
        eventType: this.currEvent.eventType,
        eventDate: moment(this.eventDate),
        eventId: this.currEvent.eventId,
        eventInfo: this.eventInfo
      };
      console.log("update", thisEvent);
      this.updateEvent({ event: thisEvent });
      this.$emit("hide");
    }
  }
};
</script>

<style scoped>
.edit-form {
  padding: 20px;
  border: solid 2px white;
  border-radius: 4px;
  background-color: #37b48c;
  z-index: 100;
}
.edit-form label {
  display: block;
  color: white;
  text-align: right;
  padding-right: 10px;
}
.edit-form table td {
  text-align: center;
  vertical-align: middle;
}
h4.event-title {
  margin: 0.5rem;
  font-size: 1.2rem;
}
h4.event-subtitle {
  margin: 0.5rem;
  color: white;
}
</style>
