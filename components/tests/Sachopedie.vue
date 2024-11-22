<template>
  <nuxt-link :to="'/'" class="sachopedie">
    <div class="sachopedie__text">
      <div class="sachopedie__title">{{ sachopedie.title }}</div>
      <div class="sachopedie__subtitle">{{ sachopedie.content }}</div>
      <span class="sachopedie__link">{{ sachopedie.button }}</span>
    </div>
    <img
      class="sachopedie__image"
      :src="require('~/assets/images/' + sachopedie.image)"
    />
  </nuxt-link>
</template>

<script>
export default {
  name: "Sachopedie",
  props: {
    sachopedie: {
      type: Object,
      required: true,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/tests/sachopedie";
</style>
