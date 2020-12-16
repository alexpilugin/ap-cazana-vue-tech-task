<template>
  <div class="modal" v-if="show">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form ref="form" class="reg-form">
        <table>
          <tr>
            <td>
              <label for="vehicle">Vehicle</label>
            </td>
            <td>
              <input
                id="vehicle"
                v-model="vehicle"
                type="text"
                name="vehicle"
              />
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
                style="text-transform:uppercase" />
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
              <input
                type="text" 
                id="model" 
                name="model"
                v-model="model"
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
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
const { v4 } = require('uuid');

export default {
  name: "RegistrationForm",
  props: ["active"],
  data() {
    return {
      show: false,
      vehicle: "",
      vrm: "",
      maker: "",
      model: "",
      year: new Date().getFullYear()
    };
  },
  created() {
    this.show = this.active;
  },
  watch: {
    active(value) {
      this.show = value;  
    }
  },
  methods: {
    ...mapActions([
      "register"
    ]),
    cancel() {
      this.show = false;
      this.$emit('onSubmit')
    },
    checkForm() {
      console.log("check form")
      let regEvent = {
        eventTitle: 'First Registration',
        eventType: 'registration',
        eventDate: new Date(),
        eventInfo: {
          id: v4(),
          vehicle: this.vehicle,
          vrm: this.vrm,
          madeByBrand: this.maker,
          model: this.model,
          year: this.year
        }
      }
      console.log(regEvent)
      this.register(regEvent)
      this.show = false;
      this.$emit('onSubmit')
    },
  },
};
</script>

<style scopped>
.reg-form {
  padding: 20px;
  border: solid 2px white;
  border-radius: 4px;
  background-color: #37B48C;
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
  width: 120px;
}
.reg-form .submit {
  width: 100%;
}
.reg-form .cancel {
  margin-right: 10px;
  width: 120px; 
}
.modal {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  z-index: 20;
}
.modal-background {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  background-color: rgba(10, 10, 10, 0.75);
}
.modal-content,
.modal-card {
  margin: 0 20px;
  overflow: auto;
  position: relative;
}
.box {
  background-color: white;
  border-radius: 5px;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;
}
</style>