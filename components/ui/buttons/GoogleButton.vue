<template>
  <div class="google-button" @click="loginWithGoogle">
    <div class="button-container">
      <img src="~/assets/icons/google-logo.svg" class="icon" alt="" />
      <div class="label">{{ label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoogleButton",
  props: {
    label: {
      type: String,
      required: true,
      default: "",
    },
    isRegister: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async loginWithGoogle() {
      try {
        await this.$auth.logout();
        const user = await this.$gAuth.signIn();
        const token = user.getAuthResponse().access_token;
        const response = await this.$store.dispatch("oauthGoogleLogin", token);
        await this.$auth.setUserToken(response.token);
        await this.$store.dispatch("user/fetchUserInformation");
        if (this.$auth.user.username === "") {
          this.$router.push("/onboarding/");
        } else {
          this.$router.push("/");
        }
      } catch (error) {
        this.$toast.error(this.$t("google_oauth_error"), {
          action: { text: "" },
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/components/ui/buttons/google-button";
</style>
