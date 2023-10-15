export default {
  userId(state) {
    console.log("userId getter called");
    return state.userId;
  },
  isAuthenticated(state) {
    const isAuthenticated = !!state.user;
    // console.log("isAuthenticated:", isAuthenticated);
    return isAuthenticated;
  },

  isAuthenticatedFromStorage() {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    // console.log("isAuthenticatedFromStorage:", isAuthenticated);
    return isAuthenticated;
  },
};


