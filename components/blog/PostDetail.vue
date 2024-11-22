<template>
  <div class="post-detail">
    <div class="view-flex post-detail__content">
      <div>
        <img
          class="post-detail__img"
          src="~/assets/images/blog-post-image.png"
        />
      </div>
      <div class="view-column">
        <div class="post-detail__title">{{ blog.title }}</div>
        <div class="post-detail__date">
          {{ blog.modified_at ? blog.modified_at.split("T")[0] : "" }}
        </div>
        <div class="post-detail__category">
          {{ blog.categories ? blog.categories[0].name : "" }}
        </div>
        <div class="post-detail__description">{{ blog.description }}</div>
        <div
          v-if="!isDetail"
          class="post-detail__read-more"
          @click="toPostDetail"
        >
          {{ $t("read_more") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toPostDetail() {
      this.$router.push(`/blog/post-detail/${this.blog.id}/`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/blog/recent-post";
</style>
