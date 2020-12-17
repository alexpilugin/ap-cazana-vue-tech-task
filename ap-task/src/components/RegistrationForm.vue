<template>
  <ModalScreen :active="active">
    <form ref="form" class="reg-form">
      <table>
        <tr>
          <td>
            <label for="model">Registration Date</label>
          </td>
          <td>
            <input
              type="date"
              :max="today"
              style="width: 100%"
              v-model="regDate"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label for="vehicle">Vehicle</label>
          </td>
          <td>
            <input id="vehicle" v-model="vehicle" type="text" name="vehicle" />
          </td>
        </tr>
        <tr>
          <td>
            <label for="vrm">VRM (numberplate)</label>
          </td>
          <td>
            <input
              type="text"
              id="vrm"
              name="vrm"
              :value="vrm.toUpperCase()"
              @input="vrm = $event.target.value.toUpperCase()"
              style="text-transform: uppercase"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label for="maker">Maker</label>
          </td>
          <td>
            <input id="maker" v-model="maker" type="text" name="maker" />
          </td>
        </tr>
        <tr>
          <td>
            <label for="model">Model</label>
          </td>
          <td>
            <input type="text" id="model" name="model" v-model="model" />
          </td>
        </tr>
        <tr>
          <td>
            <label for="model">Initial Mileage</label>
          </td>
          <td>
            <input
              type="number"
              v-model="mileage"
              min="0"
              max="1000"
              step="10"
              style="width: 100%"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label for="model">Year of Issue</label>
          </td>
          <td>
            <input
              type="number"
              v-model="year"
              min="1900"
              max="2100"
              step="1"
            />
          </td>
        </tr>
        <tr>
          <td>
            <button class="cancel" @click.prevent="cancel">Cancel</button>
          </td>
          <td>
            <button class="submit" @click.prevent="checkForm">Submit</button>
          </td>
        </tr>
      </table>
    </form>
  </ModalScreen>
</template>

<script>
import { mapActions } from "vuex";
const { v4 } = require("uuid");
import moment from "moment";
import ModalScreen from "@/components/ModalScreen.vue";

export default {
  name: "RegistrationForm",
  props: ["active"],
  components: {
    ModalScreen
  },
  data() {
    return {
      show: false,
      vehicle: "",
      vrm: "",
      maker: "",
      model: "",
      mileage: 0,
      regDate: moment().format("YYYY-MM-DD"), // '2017-07-04',
      today: moment().format("YYYY-MM-DD"), // '2020-12-16'
      year: new Date().getFullYear()
    };
  },
  watch: {
    regDate(value) {
      this.year = moment(value)
        .toDate()
        .getFullYear();
    }
  },
  methods: {
    ...mapActions(["register"]),
    reset() {
      this.show = false;
      this.vehicle = "";
      this.vrm = "";
      this.maker = "";
      this.model = "";
      this.mileage = 0;
      this.regDate = moment().format("YYYY-MM-DD"); // '2020-12-16'
      this.today = moment().format("YYYY-MM-DD"); // '2020-12-16'
      this.year = new Date().getFullYear();
    },
    cancel() {
      this.show = false;
      this.reset();
      this.$emit("hide");
    },
    checkForm() {
      console.log("check form");
      let regEvent = {
        eventTitle: "First Registration",
        eventType: "registration",
        eventDate: moment(this.regDate),
        eventInfo: {
          vehicleId: v4(),
          vehicle: this.vehicle,
          vrm: this.vrm,
          madeByBrand: this.maker,
          model: this.model,
          mileage: this.mileage,
          year: this.year
        }
      };
      console.log(regEvent);
      this.register(regEvent);
      this.show = false;
      this.$emit("hide");
      this.reset();
    }
  }
};
</script>

<style scopped>
.reg-form {
  padding: 20px;
  border: solid 2px white;
  border-radius: 4px;
  background-color: #37b48c;
}
.reg-form label {
  display: block;
  color: white;
  text-align: right;
  padding-right: 10px;
}
.red-form table td {
  text-align: center;
  vertical-align: middle;
}
.reg-form .cancel,
.reg-form .submit {
  float: right;
  padding: 5px 20px;
  margin-top: 20px;
  cursor: pointer;
  width: 100%;
}
.reg-form .cancel {
  margin-right: 10px;
}
</style>
