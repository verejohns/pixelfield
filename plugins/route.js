export default ({ app, store, redirect }) => {
  app.router.beforeEach((to, from, next) => {
    console.log(store.$auth);
    console.log(to);
    if (
      to.fullPath.includes("onboarding") &&
      store.$auth.$state.user.role !== "" &&
      store.$auth.$state.user.username !== ""
    ) {
      // Dont push
      next(false);
      app.router.push("/");
    } else {
      // push onboarding
      return next();
    }
  });
};
