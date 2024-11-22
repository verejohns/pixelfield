<template>
  <NuxtLink :to="link" class="category-card">
    <img :src="image" :alt="name" class="category-card_img mr-24" />
    <div class="category-card_details">
      <span class="category-card_details_name">{{ name }}</span>
      <span class="category-card_details_count">
        {{
          $tc("categories_count", categoriesCount, { count: categoriesCount })
        }}, {{ $tc("cards_count", cardsCount, { count: cardsCount }) }}
      </span>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: "CategoryCard",
  props: {
    link: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    categoriesCount: {
      type: Number,
      required: true,
    },
    cardsCount: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/store/collection";
</style>
