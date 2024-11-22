<template>
  <div>
    <BlogHeader
      :is-blog="false"
      :title="$t('sachopedie')"
      :breadcrumbs="[$t('dashboard')]"
    />
    <div class="main-container">
      <div class="main-container__sidebar">
        <Loading v-if="sectionsIsLoading" />
        <SideBar v-else :sections="sectionsWithArticles" />
      </div>
      <div class="main-container__tiles">
        <div v-if="!sectionsIsLoading">
          <div
            v-for="section in sectionsWithArticles"
            :key="`section_${section.id}`"
          >
            <SachopedieTile :section="section" class="view-margin-bottom-24" />
          </div>
        </div>
        <Loading v-else />
      </div>
      <div class="main-container__favourites">
        <FavouritesTab :limit="true" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SachopedieTile from "~/components/sachopedie/SachopedieTile.vue";
import SideBar from "~/components/sachopedie/SidebarMenu.vue";
import BlogHeader from "~/components/blog/BlogHeader.vue";
import Loading from "~/components/ui/Loading.vue";
import FavouritesTab from "~/components/sachopedie/SachopedieFavouritesTab.vue";

export default {
  components: {
    SachopedieTile,
    FavouritesTab,
    SideBar,
    BlogHeader,
    Loading,
  },
  auth: false,
  computed: {
    ...mapGetters({
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
    this.$store.dispatch("blog/getChesspediaSections");
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/blog/sachopedie";
</style>
