import Vue from "vue";
import GAuth from "vue-google-oauth2";
const gauthOption = {
  clientId:
    "575756972111-0jfilo5f8mjsn17m1h2lt974c1pvuii6.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account",
};
Vue.use(GAuth, gauthOption);
