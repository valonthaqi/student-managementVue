import { createStore } from "vuex";

import StudentsModule from "./modules/students/index.js";
import authModule from "./modules/auth/index.js";

const store = createStore({
  modules: {
    students: StudentsModule,
    auth: authModule,
  },
  state() {
    return {
      studentId: new Date().toISOString(),
      userId: new Date().toISOString(),
    };
  },
});

export default store;
