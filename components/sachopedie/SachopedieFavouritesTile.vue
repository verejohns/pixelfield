<template>
  <div class="favourites-tile">
    <img
      v-if="isSingle"
      class="favourites-tile__img"
      src="~/assets/images/blog-post-image.png"
    />
    <div class="favourites-tile__content">
      <div class="favourites-tile__title">{{ favourite.title }}</div>
      <div class="favourites-tile__category">
        {{ categoryName }}
      </div>

      <div class="favourites-tile__desc">{{ favourite.description }}</div>
      <div class="view-flex">
        <div class="hover-effects" @click="toArticle">{{ $t("read") }}</div>
        <img
          class="view-icon-spacing"
          src="~/assets/icons/filled-green-bookmark.svg"
          @click="removeFavourite"
        />
        <div class="hover-effects" @click="removeFavourite">
          {{ $t("saved") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    favourite: {
      type: Object,
      required: true,
    },
    isSingle: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isSaved: true,
    };
  },
  computed: {
    categoryName() {
      if (this.favourite.categories.length === 0) {
        return "-";
      }
      return this.favourite.categories[0].sections.length
        ? `${this.favourite.categories[0].sections[0].name} • ${this.favourite.categories[0].name}`
        : this.favourite.categories[0].name;
    },
  },
  mounted() {
    this.$nuxt.$on("toggle-saved", (id) => {
      if (this.favourite.id === id) {
        this.isSaved = !this.isSaved;
      }
    });
  },
  methods: {
    toArticle() {
      if (this.$route.query.sectionName) {
        this.$router.push(
          `/sachopedie/article/${this.favourite.id}/?sectionName=${this.$route.query.sectionName}&categoryId=${this.$route.params.id}`
        );
      } else {
        const dashboard = "Dashboard";
        this.$router.push(
          `/sachopedie/article/${this.favourite.id}/?sectionName=${dashboard}`
        );
      }
    },
    removeFavourite() {
      this.$nuxt.$emit("toggle-saved", this.favourite.id);
      this.$bookmarkToast(this.isSaved, this.favourite.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/blog/sachopedie-favourites-tile";
</style>
