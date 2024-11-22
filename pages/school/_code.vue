<template>
  <Loading class="loading" :show-background="false" />
</template>

<script>
export default {
  name: "VerifyEmail",
  auth: false,
  components: {},
  mounted() {
    this.assignSchool(this.$route.params.code);
  },
  methods: {
    assignSchool(code) {
      this.$store.commit("user/assignSchoolCode", code);
      window.localStorage.setItem("code", code);
      if (this.$auth.loggedIn) {
        try {
          this.$toast.success(this.$t("user_school_assign_success"));
        } catch (e) {
          this.$toast.error(this.$t("user_school_assign_fail"));
        }
        this.$router.push("/profile");
      } else {
        this.$toast.error(this.$t("user_school_assign_register_first"));
        this.$router.push("/register");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/auth";
</style>
