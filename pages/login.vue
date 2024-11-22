<template>
  <div class="auth login">
    <v-card class="card">
      <v-card-title class="card__title">
        <h1 class="card__title__content">{{ $t("sign_in") }}</h1>
      </v-card-title>
      <v-layout text-xs-center class="auth-link">
        <v-flex md6>
          <div class="auth-link__text">{{ $t("new_here") }}</div>
        </v-flex>
        <v-flex md6 class="auth-link__to">
          <router-link :to="{ name: 'register' }">
            <img
              class="auth-link__icon"
              src="~/assets/icons/arrow-right-circle-black.svg"
            />
            <div class="auth-link__label">{{ $t("register") }}</div>
          </router-link>
        </v-flex>
      </v-layout>
      <v-card-text class="form">
        <v-form ref="form">
          <GoogleButton :label="$t('sign_google')" />
          <v-text-field
            v-model="email"
            label="E-mail"
            autocomplete="new-password"
            placeholder=" "
            :rules="[rules.required, rules.email]"
            outlined
            @focusout="showFooter"
            @click="shouldHideFooter"
          />
          <PasswordField
            v-model="password"
            :label="$t('password')"
            :validation-rules="[rules.required]"
            outlined
            @showFooter="showFooter"
            @click="shouldHideFooter"
            @login="login"
          />
          <div>
            <v-btn depressed color="primary" @click="login">{{
              $t("sign_in")
            }}</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import validation from "~/mixins/validation";
import PasswordField from "~/components/ui/fields/PasswordField";
import GoogleButton from "~/components/ui/buttons/GoogleButton";
export default {
  name: "Login",
  components: {
    PasswordField,
    GoogleButton,
  },
  mixins: [validation],
  data() {
    return {
      email: null,
      password: null,
      toast: [],
    };
  },
  mounted() {
    if (this.$auth.$state.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    shouldHideFooter() {
      const height = window.screen.height;
      const width = window.screen.width;

      if (height <= 812 && width <= 450) {
        this.$nuxt.$emit("hideFooter");
      }
    },
    showFooter() {
      const height = window.screen.height;
      const width = window.screen.width;
      if (height <= 812 && width <= 450) {
        this.$nuxt.$emit("showFooter");
      }
    },
    // https://stage-dot-pfld-mychess.ew.r.appspot.com/verify-email?token=7vmn3mjl6q529bao4ov3wx8pvrkd7gynelbo
    async login() {
      if (this.$refs.form.validate()) {
        try {
          await this.$auth.loginWith("local", {
            data: { email: this.email, password: this.password },
          });
          const schoolCode = window.localStorage.getItem("code");
          if (schoolCode) {
            try {
              await this.$store.dispatch("user/assignSchool", schoolCode);
              window.localStorage.removeItem("code");
            } catch (e) {}
          }
          await this.$store.dispatch("user/fetchUserInformation");
          if (this.$auth.user.username === "") {
            this.$router.push("/onboarding");
          } else {
            this.$router.push("/");
          }
          this.toast = document.getElementsByClassName("toasted");
          if (this.toast.length) this.toast[0].remove();
        } catch (err) {
          this.toast = document.getElementsByClassName("toasted");
          if (!this.toast.length) {
            this.$toast.error(this.$t("bad_email_or_password"));
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/auth";
</style>
