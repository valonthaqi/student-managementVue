import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      user: JSON.parse(localStorage.getItem("loggedInUser")) || null,
      token: null,
      tokenExpiration: null,
    };
  },

  mutations,
  actions,
  getters,
};
