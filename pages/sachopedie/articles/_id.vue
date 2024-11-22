<template>
  <div class="pb-56">
    <BlogHeader
      :is-blog="false"
      :is-detail="true"
      :is-fixed="true"
      :is-articles="true"
      :breadcrumbs="calcBreadcrumbs"
      :title="sectionName"
    />
    <div class="articles__tiles view-margin-top-56">
      <BlogCategoryTile
        v-if="!categoryIsLoading"
        :category="category"
        :is-detail="true"
        :section-name="sectionName"
        :full-height="true"
      />
    </div>
    <div v-if="!articlesIsLoading" class="category-tiles view-margin-top-56">
      <div
        v-for="article in articles.results.slice(calcStart, calcEnd)"
        :key="article.id"
      >
        <BlogArticleTile
          :article-id="article.id"
          :article-is-saved="article.is_saved"
          :article="article"
          :hide-category="true"
          :limit-text="true"
        />
      </div>
      <div v-if="articles.count >= 9" class="view-paigination-center">
        <Paigination :indexes="calcIndexes" @updateIndex="updateSelected" />
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BlogCategoryTile from "~/components/blog/BlogCategoryTile.vue";
import BlogArticleTile from "~/components/blog/BlogArticleTile.vue";
import BlogHeader from "~/components/blog/BlogHeader.vue";
import Paigination from "~/components/ui/Paigination.vue";
import Loading from "~/components/ui/Loading.vue";

export default {
  components: {
    BlogCategoryTile,
    Paigination,
    BlogArticleTile,
    Loading,
    BlogHeader,
  },
  data() {
    return {
      sectionName: this.$route.query.sectionName,
      selected: 1,
    };
  },
  computed: {
    ...mapGetters({
      category: "blog/category",
      articles: "blog/articles",
      categoryIsLoading: "blog/categoryIsLoading",
      articlesIsLoading: "blog/articlesIsLoading",
    }),
    calcBreadcrumbs() {
      const breadcrumbs = [this.$t("sachopedie")];
      if (Object.keys(this.$route.query).includes("sectionName")) {
        breadcrumbs.push(this.$t(this.$route.query.sectionName));
      }
      return breadcrumbs;
    },
    calcIndexes() {
      return [...Array(Math.ceil(this.articles.count / 10)).keys()].map(
        (i) => i + 1
      );
    },
    calcStart() {
      return (this.selected - 1) * 10;
    },
    calcEnd() {
      return this.selected * 10;
    },
  },
  created() {
    this.$store.dispatch("blog/getChesspediaCategory", this.$route.params.id);
    this.$store.dispatch("blog/getChesspediaArticles", this.$route.params.id);
  },
  methods: {
    updateSelected(index) {
      this.selected = index;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/blog/sachopedie";
</style>
