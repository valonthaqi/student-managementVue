<template>
  <header class="bg-indigo-800 flex justify-center items-center h-20">
    <nav class="container mx-auto flex justify-between items-center w-11/12">
      <h1 class="text-white text-2xl">
        <router-link to="/" class="text-white"
          >Student Management System</router-link
        >
      </h1>
      <ul class="flex items-center">
        <li class="mr-2">
          <router-link
            to="/students"
            class="text-white hover:border-indigo-300 px-4 py-2 border border-transparent rounded-md"
          >
            Students
          </router-link>
        </li>
        <li>
          <router-link
            to="/archive"
            class="text-white hover:border-indigo-300 px-4 py-2 border border-transparent rounded-md"
          >
            Archive
          </router-link>
          <router-link
            to="/help"
            class="text-white hover:border-indigo-300 px-4 py-2 border border-transparent rounded-md"
          >
            Help
          </router-link>
        </li>

        <li class="ml-auto flex items-center py-8">
          <button
            @click="logout"
            class="text-[#B22222] text-sm px-8 py-6 rounded-md"
          >
            Logout
          </button>
        </li>
        <h1>User: {{ user.name }}</h1>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
  },
};
</script>
