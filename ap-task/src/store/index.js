import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const devMode = process.env.NODE_ENV === "development";

export default new Vuex.Store({
  state: {
    vehicles: []
  },
  getters: {
    getVehicles: state => state.vehicles,
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
        id: info.eventInfo.id,
        events: [info]
      });
      if (devMode) {
        console.log(`mutation: addVehicle: ${info.eventInfo.id}`);
      }
    },
    addEvent(state, payload) {
      const vehicles = state.vehicles;
      const selected = vehicles.find(v => v.id === payload.id);
      selected.events.push(payload.event);
      if (devMode) {
        console.log(`mutation: addEvent: ${payload.event.eventType}`);
      }
    }
  },
  actions: {
    register: (context, info) => context.commit("addVehicle", info),
    addEvent: (context, payload) => context.commit("addEvent", payload)
  },
  modules: {}
});
