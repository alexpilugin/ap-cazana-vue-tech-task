<template>
  <ModalScreen :active="active">
    <form ref="form" class="event-form">
      <table>
        <tr>
          <td>
            <label for="eventType">Event Type</label>
          </td>
          <td>
            <select v-model="selectedEventType">
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
          <td colspan="2"> <button @click="$emit('hide')"> Close</button></td>
        </tr>
      </table>
    </form>
  </ModalScreen>
</template>

<script>
/*
import { mapActions } from "vuex";
const { v4 } = require("uuid");
import moment from "moment";
*/
import ModalScreen from "@/components/ModalScreen.vue";

export default {
  name: "NewEventForm",
  props: ["active"],
  components: {
    ModalScreen,
  },
  data() {
    return {
      show: false,
      selectedEventType: null,
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
      ]
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