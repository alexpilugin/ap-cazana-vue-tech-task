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
    },
    getLastNumberPlate: state => {
      const vehicles =
      state.vehicles.length && state.vehicles.length > 0
        ? state.vehicles
        : undefined;
      function getById(id) {
        if (vehicles) {
          const selected = vehicles.find(v => v.id === id); // first found
          const events = selected.events;
          const regVRM = events[0].eventInfo.vrm;
          let lastVRMchangeEvent = null;
          for (var i = events.length - 1; i >= 0; i--) {
            const eventType = events[i].eventType;
            if (eventType === 'vrm-change') {
              lastVRMchangeEvent = events[i];
              break; //stop searching  
            }
          }
          return lastVRMchangeEvent ? lastVRMchangeEvent.eventInfo.toVRM : regVRM;
        }
      }
      // return a closure function:
      return getById;
    }
  },
  mutations: {
    addVehicle(state, info) {
      state.vehicles.push({
        id: info.eventInfo.vehicleId,
        vrm: info.eventInfo.vrm,
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
      if(payload.event.eventType == "vrm-change") {
        selected.vrm = payload.event.eventInfo.toVRM;
      }
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
