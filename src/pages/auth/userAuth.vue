<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 class="text-2xl font-semibold mb-4">Login</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="email" class="block text-gray-600">Email</label>
          <input
            v-model.trim="email"
            type="email"
            id="email"
            class="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-600">Password</label>
          <input
            v-model.trim="password"
            type="password"
            id="password"
            class="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div class="mb-4" v-if="!formIsValid">
          <p class="text-red-500 text-sm">
            Please enter a valid email or password
          </p>
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Log In
          </button>
        </div>
      </form>
      <div class="mt-4 text-center">
        <router-link to="/signup" class="text-blue-500"
          >Don't have an account?</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
    };
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;

      try {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
          (u) => u.email === this.email && u.password === this.password
        );

        if (user) {
          await this.$store.dispatch("auth/login", user);

          if (this.$store.getters["auth/isAuthenticated"]) {
            console.log( "User successfully logged in!" );
            console.log( user );

            this.$router.push("/students");
          } else {
            console.error("Login failed: Invalid credentials");
          }
        } else {
          this.formIsValid = false;
          console.error("Login failed: Invalid credentials");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    },
  },
};
</script>
