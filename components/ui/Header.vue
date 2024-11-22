<template>
  <div class="header">
    <div class="header__top-row">
      <NuxtLink :to="link" class="header__link">
        <img src="~/assets/icons/left-arrow-white.svg" />
        <span class="header__link-text">{{ linkText }}</span>
      </NuxtLink>
    </div>
    <div class="header__title">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    linkText: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/header";
</style>
