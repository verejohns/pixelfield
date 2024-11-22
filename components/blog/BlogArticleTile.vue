<template>
  <div class="blog-article">
    <NuxtLink :to="link">
      <img
        class="blog-article__image view-image-resize"
        src="~/assets/images/blog-post-image.png"
      />
    </NuxtLink>
    <div class="blog-article__content">
      <NuxtLink :to="link" class="blog-article__title">
        {{ article.title }}
      </NuxtLink>
      <div v-if="!hideCategory" class="blog-article__section-category">
        {{ article.categories[0].name }}
      </div>
      <div class="blog-article__desc2" :class="{ ellipsis: limitText }">
        {{ article.description }}
      </div>
      <div class="view-flex">
        <div class="blog-article__learn-more" @click="toArticle">
          {{ $t("read") }}
        </div>
        <img class="view-icon-spacing" :src="bookmarked" />
        <div class="blog-article__learn-more" @click="toggleSaved">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articleId: {
      type: Number,
      required: true,
    },
    articleIsSaved: {
      type: Boolean,
      required: true,
    },
    article: {
      type: Object,
      required: true,
    },
    hideCategory: {
      type: Boolean,
      default: false,
    },
    limitText: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isSaved: this.articleIsSaved,
    };
  },
  computed: {
    bookmarked() {
      return this.isSaved
        ? require("~/assets/icons/filled-green-bookmark.svg")
        : require("~/assets/icons/green-outline-bookmark.svg");
    },
    text() {
      return this.isSaved ? this.$t("saved") : this.$t("bookmark");
    },
    link() {
      return `/sachopedie/article/${this.article.id}/?sectionName=${this.$route.query.sectionName}&categoryId=${this.$route.params.id}`;
    },
  },
  mounted() {
    this.$nuxt.$on("toggle-saved", (id) => {
      if (id === this.articleId) {
        this.isSaved = !this.isSaved;
      }
    });
  },
  methods: {
    toArticle() {
      this.$router.push(
        `/sachopedie/article/${this.article.id}/?sectionName=${this.$route.query.sectionName}&categoryId=${this.$route.params.id}`
      );
    },
    toggleSaved() {
      this.isSaved = !this.isSaved;
      this.$bookmarkToast(this.isSaved, this.article.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/blog/article-tile";
</style>
