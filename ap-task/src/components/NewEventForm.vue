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
        <tr v-if="selectedEventTitle == eventTypes[0].title">
          <!-- ad -->
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
        <tr v-if="selectedEventTitle == eventTypes[1].title">
          <td colspan="2">
            <label for="eventType"><h4>{{ selectedEventTitle }}</h4></label>
          </td>
        </tr>
        <tr v-if="selectedEventTitle == eventTypes[2].title">
          <td colspan="2">
            <label for="eventType"><h4>{{ selectedEventTitle }}</h4></label>
          </td>
        </tr>
        <tr v-if="selectedEventTitle == eventTypes[0].title">
          <td> <button @click.prevent="cancel()">Cancel</button></td>
          <td> <button @click.prevent="saveAdEvent()">Save</button></td>
        </tr>
      </table>
    </form>
  </ModalScreen>
</template>

<script>
import { mapActions } from "vuex";
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
      }
    }
  },
  methods: {
    ...mapActions(["addEvent"]),
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
      console.log("saveAdEvent")
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
      console.log(newEvent)
      console.log("-------------------------")
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