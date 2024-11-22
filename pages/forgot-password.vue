<template>
  <div class="auth forgot-password">
    <v-card class="card">
      <v-card-title class="card__title">
        <h1 class="card__title__content forgot-password">
          {{ $t("forgot_password") }}
        </h1>
      </v-card-title>
      <v-layout text-xs-center class="auth-link">
        <v-flex md6>
          <div class="auth-link__newhere">{{ $t("remember_password") }}</div>
        </v-flex>
        <v-flex md6>
          <router-link :to="{ name: 'login' }">
            <img
              class="auth-link__icon"
              src="~/assets/icons/arrow-right-circle-black.svg"
            />
            <div class="auth-link__label">{{ $t("sign_in") }}</div>
          </router-link>
        </v-flex>
      </v-layout>
      <v-card-text class="form forgot-password">
        <v-form v-if="step === 1" ref="firstStepForm">
          <v-text-field
            v-model="email"
            autocomplete="new-password"
            label="E-mail"
            :rules="[rules.required, rules.email]"
            outlined
          />
          <v-btn depressed color="primary" @click="firstStepSubmit">
            {{ submitLabel }}
          </v-btn>
        </v-form>
        <v-form v-if="step === 2" ref="secondStepForm">
          <v-text-field
            v-model="code"
            :label="$t('code')"
            autocomplete="new-password"
            type="number"
            max-length="6"
            :rules="[rules.required, rules.onlyNumbers]"
            outlined
          />
          <PasswordField
            v-model="password"
            :label="$t('password')"
            :validation-rules="[rules.required]"
            outlined
          />
          <PasswordField
            v-model="repeatPassword"
            :label="$t('retype_password')"
            :validation-rules="[rules.required, rules.passwordMatch]"
            outlined
          />
          <v-btn depressed color="primary" @click="secondStepSubmit">
            {{ submitLabel }}
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import PasswordField from "~/components/ui/fields/PasswordField";
import validation from "~/mixins/validation";

export default {
  name: "ForgotPassword",
  auth: false,
  components: {
    PasswordField,
  },
  mixins: [validation],
  data() {
    return {
      email: null,
      code: "",
      password: "",
      repeatPassword: "",
      step: 1,
      submitLabel: this.$t("reset_password"),
    };
  },
  methods: {
    firstStepSubmit() {
      if (this.$refs.firstStepForm.validate()) {
        this.sendEmail().then(() => {
          this.step = 2;
          this.submitLabel = this.$t("submit");
        });
      }
    },
    secondStepSubmit() {
      if (this.$refs.secondStepForm.validate()) {
        this.sendCode();
      }
    },
    sendEmail() {
      return new Promise((resolve) =>
        this.$store
          .dispatch("generateNewPassword", this.email)
          .then(() => {
            this.$toast.success(this.$t("email_with_code_sent"));
            resolve();
          })
          .catch(() => this.$toast.error(this.$t("email_not_exists")))
      );
    },
    sendCode() {
      this.$store
        .dispatch("changePasswordWithCode", {
          code: this.code,
          password: this.password,
        })
        .then(() => {
          this.$toast.success(this.$t("password_change_success"));
          this.$router.push("/login");
        })
        .catch(() => this.$toast.error(this.$t("password_change_error")));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/auth";
</style>
