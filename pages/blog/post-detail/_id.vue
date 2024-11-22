<template>
  <div>
    <BlogHeader
      :is-detail="false"
      :is-blog="false"
      :breadcrumbs="[$t('posts')]"
      :title="$t('blog')"
    />
    <div v-if="!postIsLoading" class="post">
      <RecentPost
        v-if="article.type === 'text'"
        :blog="article"
        :is-detail="true"
        class="view-width-100"
      />
      <VideoPost
        v-else-if="article.type === 'video'"
        :blog="article"
        :is-detail="true"
        class="view-width-100"
      />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="post-content" v-html="content" />
      <div v-if="article.gallery_images" class="post_gallery_container">
        <div class="post_gallery_container_images">
          <img
            v-for="img in article.gallery_images"
            :key="`gallery_img_${img.id}`"
            :src="img.image"
            class="post_gallery_container_images_img"
          />
        </div>
      </div>
    </div>
    <Loading v-else class="loading" :show-background="false" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RecentPost from "~/components/blog/RecentPost.vue";
import BlogHeader from "~/components/blog/BlogHeader.vue";
import Loading from "~/components/ui/Loading.vue";
import blog from "~/mixins/blog";

export default {
  auth: false,
  components: {
    RecentPost,
    BlogHeader,
    Loading,
  },
  mixins: [blog],
  computed: {
    ...mapGetters({
      article: "blog/post",
      postIsLoading: "blog/postIsLoading",
    }),
  },
  mounted() {
    this.$store.dispatch("blog/getPost", this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/blog/post-detail";
</style>
