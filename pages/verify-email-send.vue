<template>
  <div class="auth verify-email">
    <v-card class="card">
      <v-card-title class="card__title">
        <h1 class="card__title__content verify-email">
          {{ $t("veryfy_email_header") }}
        </h1>
      </v-card-title>
      <v-card-text class="form">
        <v-form>
          <div class="form__message">{{ $t("veryfy_email_body") }}</div>
          <v-btn depressed color="primary" @click="sendEmail">{{
            $t("veryfy_email_button")
          }}</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "SendVerifyEmail",
  auth: false,
  data() {
    return {
      email: null,
    };
  },
  created() {
    if (this.$auth.user && this.$auth.user.is_email_verified) {
      this.$router.push("/verify-email-send/");
    }
  },
  methods: {
    async sendEmail() {
      try {
        await this.$store.dispatch("sendVerifyEmail");
      } catch (e) {
        this.$toast.error(this.$t("verify_email_send_error"));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/auth";
</style>
