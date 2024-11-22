<template>
  <div class="auth register">
    <v-card class="card register">
      <v-card-title class="card__title">
        <h1 class="card__title__content">{{ $t("register") }}</h1>
      </v-card-title>
      <v-layout text-xs-center class="auth-link">
        <v-flex md7>
          <div class="auth-link__text">{{ $t("have_account") }}</div>
        </v-flex>
        <v-flex md5 class="auth-link__to">
          <router-link :to="{ name: 'login' }">
            <img
              class="auth-link__icon"
              src="~/assets/icons/arrow-right-circle-black.svg"
            />
            <div class="auth-link__label">{{ $t("sign_in") }}</div>
          </router-link>
        </v-flex>
      </v-layout>
      <v-card-text class="form">
        <v-form ref="form">
          <GoogleButton :label="$t('register_google')" />
          <v-text-field
            v-model="email"
            label="E-mail"
            :rules="[rules.required, rules.email, unique]"
            outlined
            autocomplete="new-password"
            @focusout="showFooter"
            @click="shouldHideFooter"
          />
          <v-text-field
            v-model="full_name"
            :label="$t('full_name')"
            :rules="[rules.required, rules.min_2, rules.max_32]"
            outlined
            autocomplete="new-password"
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
          />
          <PasswordField
            v-model="repeatPassword"
            :label="$t('retype_password')"
            :validation-rules="[rules.required, rules.passwordMatch]"
            outlined
            @showFooter="showFooter"
            @click="shouldHideFooter"
          />
          <v-btn depressed color="primary" @click="register">{{
            $t("register")
          }}</v-btn>
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
  name: "Register",
  auth: false,
  components: {
    PasswordField,
    GoogleButton,
  },
  mixins: [validation],
  data() {
    return {
      full_name: "",
      email: "",
      password: "",
      repeatPassword: "",
      emailError: false,
    };
  },
  computed: {
    unique() {
      return this.emailError ? this.$t("email_used") : true;
    },
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
    register() {
      if (this.$refs.form.validate()) {
        const payload = {
          full_name: this.full_name,
          email: this.email,
          password: this.password,
        };
        this.$store
          .dispatch("register", payload)
          .then(() => {
            this.$toast.success(this.$t("registration_success"));
            this.$router.push("/verify-email-send");
          })
          .catch((err) => {
            try {
              if (Object.keys(err.response.data).includes("email")) {
                this.emailError = true;
              }
            } catch (e) {}
            this.$toast.error(this.$t("registration_not_success"));
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/auth";
</style>
