<template>
  <client-only>
    <a v-if="external" :href="url" target="_blank" class="nav-tile">
      <img class="nav-tile__image" :src="image" />
      <div class="nav-tile__title">{{ text }}</div>
    </a>
    <nuxt-link v-else :to="url" class="nav-tile">
      <img class="nav-tile__image" :src="image" />
      <div class="nav-tile__title">{{ text }}</div>
    </nuxt-link>
  </client-only>
</template>

<script>
export default {
  name: "LandingNavTile",
  props: {
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    external: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/landing/nav-tile";
</style>
