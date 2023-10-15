export default {
  async signup(context, payload) {
    try {
      const user = {
        email: payload.email,
        password: payload.password,
      };

      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

      context.commit("setUser", user);
    } catch (error) {
      console.error("Signup error:", error);
    }
  },

  async login(context, payload) {
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === payload.email && u.password === payload.password
      );

      if (user) {
        context.commit("setUser", user);
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        localStorage.setItem("isAuthenticated", "true");
      } else {
        console.error("Login failed: Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  },
  setUserAuthenticationStatus(context, isAuthenticated) {
    context.commit("setUserAuthenticationStatus", isAuthenticated);
  },

  logout(context) {
    try {
      context.commit("setUser", null);
      console.log("User successfully logged out.");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
};
