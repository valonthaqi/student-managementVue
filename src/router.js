import { createRouter, createWebHistory } from "vue-router";

import StudentsList from "./pages/students/StudentsArchiveList.vue";
import StudentDetail from "./pages/students/StudentDetail.vue";
import StudentRegistration from "./pages/requests/StudentRegistration.vue";
import StudentArchive from "./pages/requests/StudentsList.vue";
import StudentHelp from "./pages/requests/StudentHelp.vue";
import RestoreStudents from "./pages/students/RestoreStudents.vue";
import NotFound from "./pages/NotFound.vue";
import UserAuth from "./pages/auth/userAuth.vue";
import SignUp from "./pages/auth/SignUpForm.vue";
import { requireAuth } from "./routeGuards";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/archive",
    },
    {
      path: "/archive",
      component: StudentsList,
      beforeEnter: requireAuth,
    },
    {
      path: "/archive/:id",
      component: StudentDetail,
      props: true,
      beforeEnter: requireAuth,
    },
    {
      path: "/register",
      component: StudentRegistration,
      beforeEnter: requireAuth,
    },
    {
      path: "/students",
      component: StudentArchive,
      beforeEnter: requireAuth,
    },
    {
      path: "/restore",
      component: RestoreStudents,
      beforeEnter: requireAuth,
    },
    {
      path: "/help",
      component: StudentHelp,
      beforeEnter: requireAuth,
    },
    {
      path: "/login",
      component: UserAuth,
      meta: {
        hideHeader: true,
      },
    },
    {
      path: "/signup",
      component: SignUp,
      meta: {
        hideHeader: true, 
      },
    },
    {
      path: "/:notFound(.*)",
      component: NotFound,
    },
  ],
});

export default router;
