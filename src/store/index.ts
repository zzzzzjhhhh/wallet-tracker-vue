import Vue from "vue";
import Vuex from "vuex";
import * as label from "../store/modules/label";
import * as record from "../store/modules/record";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    label,
    record,
  },
});
