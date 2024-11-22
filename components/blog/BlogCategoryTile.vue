<template>
  <div class="sachopedie-tile" :class="{ 'full-height': fullHeight }">
    <NuxtLink :to="link">
      <img
        class="sachopedie-tile__image"
        :class="{ 'view-image-resize': !fullHeight, 'full-height': fullHeight }"
        src="~/assets/images/blog-post-image.png"
      />
    </NuxtLink>
    <div
      :class="
        isDetail
          ? 'sachopedie-tile__content__space-evenly'
          : 'sachopedie-tile__content'
      "
    >
      <div class="sachopedie-tile__title">
        <NuxtLink :to="link">{{ category.name }}</NuxtLink>
        <div class="sachopedie-tile__desc2">
          {{
            $tc("articles_l", category.number_of_articles, {
              count: category.number_of_articles,
            })
          }}
        </div>
      </div>
      <NuxtLink v-if="!isDetail" :to="link" class="sachopedie-tile__learn-more">
        {{ $t("open") }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isDetail: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Object,
      required: true,
    },
    sectionName: {
      type: String,
      required: true,
    },
    fullHeight: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    link() {
      return `/sachopedie/articles/${this.category.id}/?sectionName=${this.sectionName}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/blog/sachopedie-tile";
</style>
