import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const devMode = process.env.NODE_ENV === "development";

const milesPerAnnum = 7900;
const milesPerDay = milesPerAnnum / 365;

export default new Vuex.Store({
  state: {
    vehicles: []
  },
  getters: {
    defaultMilesPerAnnum: () => milesPerAnnum,
    defaultMilesPerDay: () => milesPerDay,
    getVehicles: state => state.vehicles,
    hasVehicles: state => {
      return state.vehicles.length && state.vehicles.length > 0
    },
    getVehicleById: state => {
      const vehicles =
        state.vehicles.length && state.vehicles.length > 0
          ? state.vehicles
          : undefined;
      function getVehicle(id) {
        if (vehicles) {
          const selected = vehicles.find(v => v.id === id); // first found
          return selected;
        }
      }
      // return a closure function:
      return getVehicle;
    }
  },
  mutations: {
    addVehicle(state, info) {
      state.vehicles.push({
        id: info.eventInfo.vehicleId,
        events: [info]
      });
      if (devMode) {
        console.log(`mutation: addVehicle: ${info.eventInfo.vehicleId}`);
      }
    },
    addEvent(state, payload) {
      const vehicles = state.vehicles;
      const selected = vehicles.find(v => v.id === payload.event.eventInfo.vehicleId);
      selected.events.push(payload.event);
      if (devMode) {
        //console.log(`mutation: addEvent: ${payload.event.eventType}`);
        console.log(`mutation: addEvent:`)
        console.log(`${payload}`)
      }
    }
  },
  actions: {
    register: (context, info) => context.commit("addVehicle", info),
    addEvent: (context, payload) => context.commit("addEvent", payload)
  },
  modules: {}
});
