import store from "@/store";

export function requireAuth(to, from, next) {
  if (!store.getters["auth/isAuthenticated"]) {
    next({ path: "/login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
}
