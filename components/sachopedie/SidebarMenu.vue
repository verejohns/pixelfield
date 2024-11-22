<template>
  <div class="sidebar">
    <div v-for="section in sections" :key="`section_${section.id}`">
      <div class="sidebar__heading">{{ section.name }}</div>
      <div class="sidebar__content">
        <NuxtLink
          v-for="category in section.categories"
          :key="`category_${category.id}`"
          :to="`/sachopedie/articles/${category.id}/?section=${section.name}`"
          class="sidebar__content__link"
        >
          {{ category.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sections: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/blog/sidebar";
</style>
