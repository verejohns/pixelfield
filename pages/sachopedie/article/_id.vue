<template>
  <div class="article-container">
    <BlogHeader
      class="view-margin-bottom-24"
      :is-blog="false"
      :title="$t('sachopedie')"
      :breadcrumbs="calcBreadcrumbs"
    />

    <div v-if="!articleIsLoading" class="article-container__content">
      <img
        class="article-container__image"
        src="~/assets/images/blog-post-image.png"
      />
      <div class="view-margin-left-24">
        <div class="article-container__title">{{ article.title }}</div>
        <div
          v-if="article.sections.length > 0 && article.categories.length > 0"
          class="article-container__category"
        >
          {{ article.sections[0].name }} • {{ article.categories[0].name }}
        </div>
        <div v-if="article.description" class="article-container__desc">
          {{ article.description }}
        </div>
        <div class="bookmark" @click="toggleSaved">
          <div class="bookmark-button">
            <img class="bookmark-button__icon" :src="getSavedImage" />
            <div>{{ bookmarkSavedText }}</div>
          </div>
        </div>
      </div>
    </div>
    <Loading v-else :show-background="false" />
    <div v-if="!articleIsLoading">
      <div class="row-divider view-margin-top-24" />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="article-content" v-html="content" />
      <div v-if="article.gallery_images" class="article_gallery_container">
        <div class="article_gallery_container_images">
          <img
            v-for="img in article.gallery_images"
            :key="`gallery_img_${img.id}`"
            :src="img.image"
            class="article_gallery_container_images_img"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BlogHeader from "~/components/blog/BlogHeader.vue";
import Loading from "~/components/ui/Loading.vue";
import blog from "~/mixins/blog";

export default {
  components: { BlogHeader, Loading },
  mixins: [blog],
  data() {
    return {
      isSaved: null,
    };
  },
  computed: {
    ...mapGetters({
      article: "blog/article",
      articleIsLoading: "blog/articleIsLoading",
    }),
    calcBreadcrumbs() {
      const breadcrumbs = [this.$t("sachopedie")];
      if (Object.keys(this.$route.query).includes("sectionName")) {
        breadcrumbs.push(this.$t(this.$route.query.sectionName));
      }
      return breadcrumbs;
    },
    getSavedImage() {
      return this.isSaved
        ? require("~/assets/icons/filled-green-bookmark.svg")
        : require("~/assets/icons/green-outline-bookmark.svg");
    },
    bookmarkSavedText() {
      return this.isSaved ? this.$t("saved") : this.$t("bookmark");
    },
  },
  mounted() {
    this.$store
      .dispatch("blog/getChesspediaArticle", this.$route.params.id)
      .then((v) => {
        this.isSaved = this.article.is_saved;
      });
    this.$nuxt.$on("toggle-saved", (id) => {
      if (id === this.article.id) {
        this.isSaved = !this.isSaved;
      }
    });
  },
  methods: {
    toggleSaved() {
      this.isSaved = !this.isSaved;
      console.log(this.isSaved);
      this.$bookmarkToast(this.isSaved, this.article.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/blog/article";
</style>
