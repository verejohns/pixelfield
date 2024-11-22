<template>
  <div class="main-container">
    <BlogHeader
      :breadcrumbs="[$t('dashboard')]"
      :title="$t('blog')"
      @updatePosts="updatePostType"
    />

    <div v-if="!postsIsLoading" class="main-container__content">
      <div class="main-container__title">{{ $t("posts") }}</div>
      <div
        v-for="post in filteredPosts.slice(calcStart, calcEnd)"
        :key="post.id"
      >
        <RecentPost v-if="post.type === 'text'" :blog="post" :preview="true" />
        <VideoPost
          v-else-if="post.type === 'video'"
          :blog="post"
          :preview="true"
        />
      </div>
      <div v-if="filteredPosts.length >= 9" class="view-paigination-center">
        <Paigination
          class="view-margin-vertical-24"
          :indexes="calcIndexes"
          @updateIndex="updateSelected"
        />
      </div>
    </div>
    <Loading v-else :show-background="false" class="loading" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RecentPost from "~/components/blog/RecentPost.vue";
import Paigination from "~/components/ui/Paigination.vue";
import BlogHeader from "~/components/blog/BlogHeader.vue";
import VideoPost from "~/components/blog/VideoPost.vue";
import Loading from "~/components/ui/Loading.vue";

export default {
  components: {
    RecentPost,
    Loading,
    VideoPost,
    Paigination,
    BlogHeader,
  },
  auth: false,
  data() {
    return {
      selected: null,
      paiginationSelected: 1,
    };
  },
  computed: {
    ...mapGetters({
      posts: "blog/posts",
      postsIsLoading: "blog/postsIsLoading",
    }),
    calcIndexes() {
      return [...Array(Math.ceil(this.posts.count / 10)).keys()].map(
        (i) => i + 1
      );
    },
    calcStart() {
      return (this.paiginationSelected - 1) * 10;
    },
    calcEnd() {
      return this.paiginationSelected * 10;
    },
    filteredPosts() {
      if (
        this.selected === null ||
        this.selected === this.$t("all_categories")
      ) {
        return this.posts.results;
      } else if (this.selected === "Videos") {
        return this.posts.results.filter((obj) => obj.type === "video");
      } else {
        return this.posts.results.filter(
          (obj) => obj.categories[0].name === this.selected
        );
      }
    },
  },
  mounted() {
    this.$store.dispatch("blog/getPosts");
  },
  methods: {
    updateSelected(index) {
      this.paiginationSelected = index;
    },
    updatePostType(newType) {
      this.selected = newType;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/blog/post-list";
</style>
