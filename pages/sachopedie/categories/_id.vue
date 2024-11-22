<template>
  <div>
    <BlogHeader
      class="view-margin-bottom-24"
      :is-blog="false"
      :title="$t(headerTitle)"
      :breadcrumbs="[$t('sachopedie')]"
    />
    <div class="main-container">
      <div class="main-container__sidebar">
        <Loading v-if="sectionsIsLoading" />
        <SideBar v-else :sections="sectionsWithArticles" />
      </div>
      <div class="main-container__tiles">
        <div v-if="!categoriesIsLoading">
          <BlogCategoryTile
            v-for="category in categories.results"
            :key="category.id"
            :category="category"
            :section-name="headerTitle"
            class="view-margin-bottom-24"
          />
        </div>
        <Loading v-else class="view-margin-bottom-24" />
      </div>
      <div class="main-container__favourites">
        <FavouritesTab :limit="true" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BlogCategoryTile from "~/components/blog/BlogCategoryTile.vue";
import BlogHeader from "~/components/blog/BlogHeader.vue";
import Loading from "~/components/ui/Loading.vue";
import SideBar from "~/components/sachopedie/SidebarMenu.vue";
import FavouritesTab from "~/components/sachopedie/SachopedieFavouritesTab.vue";

export default {
  components: {
    BlogHeader,
    BlogCategoryTile,
    Loading,
    SideBar,
    FavouritesTab,
  },
  data() {
    return {
      headerTitle: this.$route.query.sectionName,
    };
  },
  computed: {
    ...mapGetters({
      categories: "blog/categories",
      categoriesIsLoading: "blog/categoriesIsLoading",
      sections: "blog/sections",
      sectionsIsLoading: "blog/sectionsIsLoading",
    }),
    sectionsWithArticles() {
      return this.sections.results
        .filter((section) => section.number_of_articles > 0)
        .map((section) => {
          return {
            ...section,
            categories: section.categories.filter(
              (category) => category.number_of_articles > 0
            ),
          };
        });
    },
  },
  mounted() {
    this.$store.dispatch("blog/getChesspediaCategories", this.$route.params.id);
    this.$store.dispatch("blog/getChesspediaSections");
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/blog/sachopedie";
</style>
