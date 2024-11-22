import Vue from "vue";

export default ({ app, store, route }, inject) => {
  inject("bookmarkToast", (isSaved, articleId) => {
    store.dispatch("blog/toggleFavouriteArticle", articleId).then((v) => {
      store.dispatch("blog/getChesspediaFavourites").then((v) => {
        Vue.toasted.show(
          isSaved
            ? app.i18n.t("bookmark_saved")
            : app.i18n.t("bookmark_deleted"),
          {
            className: "toast-color",
            position: "bottom-center",
            action: {
              text: isSaved
                ? app.i18n.t("view_collection")
                : app.i18n.t("undo"),
              onClick: (e, toastObject) => {
                if (isSaved) {
                  app.router.push("/sachopedie/bookmarks/");
                  toastObject.goAway(0);
                } else {
                  app.$bookmarkToast(!isSaved, articleId);
                  toastObject.goAway(0);
                  window.$nuxt.$emit("toggle-saved", articleId);
                }
              },
            },
          }
        );
      });
    });
  });
};
