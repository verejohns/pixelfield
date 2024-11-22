<template>
  <div class="auth-tile">
    <img
      class="auth-tile__image"
      src="~/assets/images/landing-group-image.png"
    />
    <div class="auth-tile__title">{{ $t("landing_title") }}</div>
    <div class="auth-tile__auth-buttons">
      <div class="button-login" @click="toLogin">{{ $t("sign_in") }}</div>
      <div class="button-register" @click="toRegister">
        {{ $t("register") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingAuthTile",
  methods: {
    toLogin() {
      this.$router.push("/login/");
    },
    toRegister() {
      this.$router.push("/register/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/landing/auth-tile";
</style>
