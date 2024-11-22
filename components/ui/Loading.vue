<template>
  <div :class="['loading', !showBackground ? 'loading__no-background' : '']">
    <span v-if="showText" class="loading-text">{{ $t("Loading") }}</span>
    <div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    showBackground: {
      type: Boolean,
      default: true,
    },
    showText: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/loading";
</style>
