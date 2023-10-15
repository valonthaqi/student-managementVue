<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 class="text-2xl font-semibold mb-4">Signup</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label for="name" class="block text-gray-600">Name</label>
          <input v-model="name" type="text" id="name" class="w-full border rounded-md px-3 py-2">
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-600">Email</label>
          <input v-model="email" type="email" id="email" class="w-full border rounded-md px-3 py-2">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-600">Password</label>
          <input v-model="password" type="password" id="password" class="w-full border rounded-md px-3 py-2">
        </div>
        <div class="flex items-center justify-between">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Signup</button>
          <router-link to="/login" class="text-blue-500">Already have an account?</router-link>
        </div>
        
        <div class="mb-4" v-if="successMessage">
          <p class="text-green-500 text-sm">{{ successMessage }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      successMessage: "",
    };
  },
  methods: {
    register() {
      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
      };


      const users = JSON.parse(localStorage.getItem("users")) || [];
      const emailExists = users.some((user) => user.email === this.email);

      if (emailExists) {
        let suggestedEmail = this.email;
        let emailIndex = 1;
        while (users.some((user) => user.email === suggestedEmail)) {
          suggestedEmail = `${this.email.replace(
            /@.*$/,
            ""
          )}${emailIndex}@gmail.com`; 
          emailIndex++;
        }


        this.successMessage = `The email is already in use. Do you want to continue with this email: ${suggestedEmail}`;
        return;
      }


      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      this.name = "";
      this.email = "";
      this.password = "";

      this.successMessage = "User signed up successfully.";
      this.$router.push("/login");
    },
  },
};
</script>
