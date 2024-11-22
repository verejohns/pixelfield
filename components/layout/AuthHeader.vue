<template>
  <div class="auth-header">
    <img height="33" width="132" :src="getImage" @click="toLanding" />
    <div class="links">
      <div class="login-button icon-spacing" @click="toLogin">
        {{ $t("sign_in") }}
      </div>
      <div class="register-button" @click="toRegister">
        {{ $t("register") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthHeader",
  computed: {
    getImage() {
      return require("~/assets/icons/logo-light.svg");
    },
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    toRegister() {
      this.$router.push("/register");
    },
    toLanding() {
      this.$router.push("/landing/");
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/components/layout/auth-header";
</style>
