<template>
  <div>
    <BlogHeader
      :is-blog="false"
      :title="$t('favourites')"
      :breadcrumbs="[pageName]"
    />
    <div class="body">
      <FavouritesTab :show-view-all="false" :is-single="true" />
    </div>
  </div>
</template>

<script>
import BlogHeader from "~/components/blog/BlogHeader.vue";
import FavouritesTab from "~/components/sachopedie/SachopedieFavouritesTab.vue";
export default {
  components: {
    BlogHeader,
    FavouritesTab,
  },
  computed: {
    pageName() {
      return this.$route.query.pageName
        ? this.$route.query.pageName
        : this.$t("sachopedie");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/blog/bookmarks";
</style>
