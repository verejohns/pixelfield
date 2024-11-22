<template>
  <div class="onboarding-header">
    <div class="onboarding-header__container">
      <div class="onboarding-header_logo">My-Chess</div>
      <ul class="onboarding-header__nav">
        <li class="onboarding-header__nav__item">
          <a
            class="onboarding-header__nav__item__link logout-button"
            @click="logout"
          >
            Log out
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "OnboardingHeader",
  methods: {
    logout() {
      this.$auth.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/components/layout/onboarding-header";
@import "/assets/scss/components/ui/buttons/logout-button";
</style>
