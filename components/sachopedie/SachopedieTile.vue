<template>
  <div class="sachopedie-tile">
    <NuxtLink :to="link">
      <img class="sachopedie-tile__image" src="~/assets/images/category3.png" />
    </NuxtLink>
    <div class="sachopedie-tile__content">
      <NuxtLink :to="link" class="sachopedie-tile__title">
        {{ section.name }}
      </NuxtLink>
      <div class="sachopedie-tile__desc">
        {{ section.categories.length }}
        {{ $t("categories") }}, {{ section.number_of_articles }}
        {{ $t("articles") }}
      </div>
      <NuxtLink :to="link" class="sachopedie-tile__learn-more">
        {{ $t("learn_more") }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    section: {
      type: Object,
      required: true,
    },
  },
  computed: {
    link() {
      return `/sachopedie/categories/${this.section.id}/?sectionName=${this.section.name}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/blog/sachopedie-tile";
</style>
