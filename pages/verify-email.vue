<template>
  <div>Email verification in progress..</div>
</template>

<script>
export default {
  name: "VerifyEmail",
  auth: false,
  components: {},
  data() {
    return {
      email: null,
    };
  },
  mounted() {
    this.verifyEmailWithToken(this.$route.query.token);
  },
  methods: {
    async verifyEmailWithToken(token) {
      try {
        const response = await this.$store.dispatch("verifyEmail", token);
        await this.$auth.setUserToken(response.token);
        const schoolCode = window.localStorage.getItem("code");
        console.log("schoolCode", schoolCode);
        if (schoolCode) {
          try {
            await this.$store.dispatch("user/assignSchool", schoolCode);
            window.localStorage.removeItem("code");
            await this.$auth.fetchUser();
          } catch (e) {}
        }
        this.$router.push("/onboarding");
        this.$toast.success(this.$t("verify_email_success"));
      } catch (e) {
        this.$toast.error(this.$t("verify_email_error"));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/auth";
</style>
