<template>
  <div :class="isDetail ? 'blog-header__detailed' : 'blog-header'">
    <Modal
      v-if="showModal"
      :current-category="currentCategory"
      :categories="categories"
      @changeCategory="updateCategory"
      @closeModal="showModal = false"
    />
    <div
      class="blog-header__content"
      :class="isArticles ? 'blog-header__content-detail' : ''"
    >
      <div class="blog-header__flex-row" :class="{ 'fixed-size': isFixed }">
        <div
          :class="[
            isDetail
              ? 'blog-header__detailed__dashboard'
              : 'blog-header__dashboard',
          ]"
        >
          <img
            class="blog-header__dashboard__icon"
            src="~/assets/icons/left-arrow-white.svg"
            @click="back"
          />
          <Breadcrumbs :breadcrumbs="breadcrumbs" />
        </div>
        <div
          v-if="isBlog && !isDetail"
          class="category-button"
          @click.stop="showModal = true"
        >
          {{ currentCategory }}
        </div>
      </div>
      <div
        v-if="!isDetail"
        class="blog-header__flex-row"
        :class="{ 'fixed-size': isFixed }"
      >
        <div class="blog-header__title">{{ title }}</div>
        <!-- <img src="~/assets/icons/search.svg" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "~/components/blog/CategoriesModal.vue";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";
export default {
  components: {
    Modal,
    Breadcrumbs,
  },
  props: {
    isBlog: {
      type: Boolean,
      default: true,
    },
    breadcrumbs: {
      type: Array,
      required: true,
    },
    isDetail: {
      type: Boolean,
      defualt: false,
    },
    isArticles: {
      type: Boolean,
      default: false,
    },
    isFixed: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      categories: null,
      showModal: false,
      currentCategory: this.$t("all_categories"),
      sectionName: this.calcSectionName,
    };
  },
  computed: {
    calcSectionName() {
      let sectionName = "";
      if (Object.keys(this.$route.query).includes("sectionName")) {
        sectionName = this.$route.query.sectionName;
      }
      return sectionName;
    },
  },
  mounted() {
    this.$store.dispatch("blog/fetchBlogCategories").then((response) => {
      const fetchedCategories = [this.$t("all_categories")];
      for (let i = 0; i < response.results.length; i++) {
        fetchedCategories.push(response.results[i].name);
      }
      this.categories = fetchedCategories;
    });
    if (Object.keys(this.$route.query).includes("blogCategory")) {
      this.currentCategory = this.$t("videos");

      this.$emit("updatePosts", this.currentCategory);
    }
  },
  methods: {
    back() {
      if (this.breadcrumbs[0] === this.$t("posts")) {
        this.$router.push("/blog/post-list/");
      } else {
        this.$router.push(this.$auth.loggedIn ? "/" : "/landing");
      }
    },
    updateCategory(newCategory) {
      this.showModal = false;
      this.currentCategory = newCategory;
      this.$emit("updatePosts", newCategory);
    },
    toRoute() {
      if (this.$route.name.includes("post-detail")) {
        this.$router.push("/blog/post-list/");
      } else if (this.$route.name.includes("sachopedie-categories")) {
        this.$router.push("/sachopedie/");
      } else if (this.$route.name.includes("sachopedie-article-id")) {
        if (this.$route.query.sectionName === "Dashboard") {
          this.$router.push("/sachopedie/");
        } else {
          this.$router.push(
            `/sachopedie/articles/${this.$route.query.category_id}/?sectionName=${this.$route.query.sectionName}`
          );
        }
      } else if (this.$route.name.includes("sachopedie-articles-id")) {
        this.$router.push(
          `/sachopedie/categories/${this.$route.params.id}/?sectionName=${this.$route.query.sectionName}`
        );
      } else {
        this.$router.push(`/sachopedie/`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/components/blog/blog-header";
</style>
