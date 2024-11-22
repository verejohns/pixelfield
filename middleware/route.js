export default ({ app, store, to }) => {
  if (to.fullPath === "/onboarding" && store.$auth.$state.user.role !== "") {
    return app.router.push("/");
  }
};
