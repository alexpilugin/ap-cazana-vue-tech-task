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
      return state.vehicles.length && state.vehicles.length > 0;
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
            if (eventType === "vrm-change") {
              lastVRMchangeEvent = events[i];
              break; //stop searching
            }
          }
          return lastVRMchangeEvent
            ? lastVRMchangeEvent.eventInfo.toVRM
            : regVRM;
        }
      }
      // return a closure function:
      return getById;
    },
    getEvent: state => {
      const vehicles =
      state.vehicles.length && state.vehicles.length > 0
        ? state.vehicles
        : undefined;
      function getByIds(vId, eId) {
        if (vehicles) {
          console.log("getter getEvent: ...........")
          const selected = vehicles.find(v => v.id === vId); // first found
          const events = selected.events;
          const e = events.find(ev => ev.eventId === eId); // first found
          console.log("getEvent: ")
          console.log(e);
          return e;
        }
      }
      // return a closure function:
      return getByIds;
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
      const selected = vehicles.find(
        v => v.id === payload.event.eventInfo.vehicleId
      );
      selected.events.push(payload.event);
      if (payload.event.eventType == "vrm-change") {
        selected.vrm = payload.event.eventInfo.toVRM;
      }
      if (devMode) {
        //console.log(`mutation: addEvent: ${payload.event.eventType}`);
        console.log(`mutation: addEvent:`);
        console.log(`${payload}`);
      }
    },
    updateEvent(state, payload) {
      const vehicles = state.vehicles;
      const vId = payload.event.eventInfo.vehicleId;
      const selected = vehicles.find(v => v.id === vId);
      const eId = payload.event.eventId;
      let event = selected.events.find(e => e.eventId === eId);
      Object.assign(event, payload.event); // make it reactive
      if (devMode) {
        console.log(`mutation: updateEvent:`, payload); 
      }
    }
  },
  actions: {
    register: (context, info) => context.commit("addVehicle", info),
    addEvent: (context, payload) => context.commit("addEvent", payload),
    updateEvent: (context, payload) => context.commit("updateEvent", payload),
  },
  modules: {}
});
