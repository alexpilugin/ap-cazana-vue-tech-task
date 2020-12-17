<template>
  <ModalScreen :active="active">
    <form ref="form" class="event-form">
      <table>
        <tr>
          <td>
            <label for="eventType">Event</label>
          </td>
          <td>
            <select v-model="selectedEventTitle" style="padding: 6px 4px;">
              <option 
                v-for="(et, i) in eventTypes" 
                :key="i"
                :value="et.title"
              >
                <span>{{ et.title }}</span>
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <label for="eventType"><h4>{{ selectedEventTitle }}</h4></label>
          </td>
        </tr>
        <tr v-if="selectedEventTitle">
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

        <!-- ad -->
        <tr v-if="selectedEventTitle == eventTypes[0].title">
          <td>
            <label for="mileage">Mileage</label>
          </td>
          <td>
            <input
              type="number"
              id="mileage"
              name="mileage"
              v-model="adEvent.mileage"
              min="0"
              max="1000"
              step="10"
              style="width: 100%"
            />
          </td>
        </tr>
        <tr v-if="selectedEventTitle == eventTypes[0].title">
          <td>
            <label for="model">Price</label>
          </td>
          <td>
            <input
              type="number"
              v-model="adEvent.price"
              min="0"
              step="10"
            />
          </td>
        </tr>
        <tr v-if="selectedEventTitle == eventTypes[0].title">
          <td> <button @click.prevent="cancel()">Cancel</button></td>
          <td> <button @click.prevent="saveAdEvent()">Save</button></td>
        </tr>

        <!-- MOT -->
        <tr v-if="selectedEventTitle == eventTypes[1].title">
          <td>
            <label for="mileage">Mileage</label>
          </td>
          <td>
            <input
              type="number"
              id="mileage"
              name="mileage"
              v-model="motEvent.mileage"
              min="0"
              max="1000"
              step="10"
              style="width: 100%"
            />
          </td>
        </tr>
        <tr v-if="selectedEventTitle == eventTypes[1].title">
          <td>
            <label for="checkbox">Result</label>
          </td>
          <td>
            <input type="radio" id="pass" value="pass" v-model="motEvent.result">
            <label for="pass">pass</label>
            <input type="radio" id="fail" value="fail" style="margin-left: 15px;" v-model="motEvent.result">
            <label for="fail">fail</label>
          </td>
        </tr>
        <tr v-if="selectedEventTitle == eventTypes[1].title">
          <td> <button @click.prevent="cancel()">Cancel</button></td>
          <td> <button @click.prevent="saveMotEvent()">Save</button></td>
        </tr>

        <!-- the numberplate changes -->
        <tr v-if="selectedEventTitle == eventTypes[2].title">
          <td>
            <span>Previous VRM</span>
          </td>
          <td>
            <span>{{ getLastNumberPlate() }}</span>
          </td>
        </tr>
        <tr v-if="selectedEventTitle == eventTypes[2].title">
          <td>
            <span>New VRM</span>
          </td>
          <td>
            <input
              type="text"
              id="vrm"
              name="vrm"
              style="width: 100%"
              v-model="vrmChangeEvent.toVRM"
            />
          </td>
        </tr>

        <tr v-if="selectedEventTitle == eventTypes[2].title">
          <td> <button @click.prevent="cancel()">Cancel</button></td>
          <td> <button @click.prevent="saveVRMEvent()">Save</button></td>
        </tr>
      </table>
    </form>
  </ModalScreen>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import ModalScreen from "@/components/ModalScreen.vue";

export default {
  name: "NewEventForm",
  props: ["active", "id"],
  components: {
    ModalScreen,
  },
  data() {
    return {
      show: false,
      selectedEventTitle: null,
      eventTypes: [
        {
          type: 'ad',
          title: 'Advertised For Sale',
        },
        {
          type: 'mot',
          title: 'MOT Test',
        },
        {
          type: 'vrm-change',
          title: 'Change of VRM',
        }
      ],
      eventDate: moment().format("YYYY-MM-DD"), // '2017-07-04',
      today: moment().format("YYYY-MM-DD"), // '2020-12-16'
      adEvent: {
        mileage: 0,
        price: 0
      },
      motEvent: {
        mileage: 0,
        result: undefined /* Pass / Fail */
      },
      vrmChangeEvent: {
        fromVRM: '',
        toVRM: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      "getVehicleById"
    ]),
  },
  methods: {
    ...mapActions(["addEvent"]),
    getLastNumberPlate() {
      const VRMchangeCode = 2;
      const vId = this.id;
      const events = this.getVehicleById(vId).events;
      const regVRM = events[0].eventInfo.vrm;
      console.log("regVRM: " + regVRM);
      let lastVRMchangeEvent = null;
      for (var i = events.length - 1; i >= 0; i--) {
        const eventType = events[i].eventType;
        if (eventType === this.eventTypes[VRMchangeCode].type) {
          lastVRMchangeEvent = events[i];
          break; //stop searching  
        }
      }
      if (lastVRMchangeEvent) console.log("last VRM: " + lastVRMchangeEvent.eventInfo.toVRM);
      return lastVRMchangeEvent ? lastVRMchangeEvent.eventInfo.toVRM : regVRM;
    },
    reset() {
      this.selectedEventTitle = null;
      this.adEvent = {
        mileage: 0,
        price: 0  
      }
    },
    cancel() {
      this.reset()
      this.$emit('hide')
    },
    saveAdEvent() {
      const newEvent = {
        eventTitle: this.eventTypes[0].title,
        eventType: this.eventTypes[0].type,
        eventDate: this.eventDate,
        eventInfo: {
          vehicleId: this.id,
          mileage: this.adEvent.mileage,
          price: this.adEvent.price,
        }
      }
      this.addEvent({event: newEvent})
      this.reset()
      this.$emit('hide')
    },
    saveMotEvent() {
      console.log("saveMotEvent...")
      const newEvent = {
        eventTitle: this.eventTypes[1].title,
        eventType: this.eventTypes[1].type,
        eventDate: this.eventDate,
        eventInfo: {
          vehicleId: this.id,
          mileage: this.motEvent.mileage,
          result: this.motEvent.result,
        }
      }
      this.addEvent({event: newEvent})
      this.reset()
      this.$emit('hide')
    },
    saveVRMEvent() {
      console.log("saveVRMEvent...")
      const newEvent = {
        eventTitle: this.eventTypes[2].title,
        eventType: this.eventTypes[2].type,
        eventDate: this.eventDate,
        eventInfo: {
          vehicleId: this.id,
          fromVRM: this.getLastNumberPlate(),
          toVRM: this.vrmChangeEvent.toVRM,
        }
      }
      this.addEvent({event: newEvent})
      this.reset()
      this.$emit('hide')
    }
  }
}
</script>

<style scopped>
.event-form {
  padding: 20px;
  border: solid 2px white;
  border-radius: 4px;
  background-color: #37b48c;
}
</style>