<template>
  <div class="category-list">
    <NuxtLink
      v-for="item in list"
      :key="item.id"
      :to="`/store/section/${item.id}`"
      class="category-list_item"
    >
      {{ item.name }}
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: "CategoryList",
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/store/categories";
</style>
