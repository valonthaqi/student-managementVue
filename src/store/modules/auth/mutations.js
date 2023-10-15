export default {
  setUser(state, payload) {
    state.user = payload;

    localStorage.setItem("loggedInUser", JSON.stringify(payload));
  },
  setUserAuthenticationStatus(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
};
