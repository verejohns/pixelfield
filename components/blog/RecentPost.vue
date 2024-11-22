<template>
  <div>
    <div class="main-container">
      <div
        :class="[
          'view-flex',
          'main-container__content',
          isTest ? 'main-container__content__max-width' : '',
        ]"
      >
        <div>
          <img
            class="main-container__img"
            :class="!isDetail ? 'clickable' : ''"
            :src="image"
            @click="toPostDetail"
          />
        </div>
        <div class="view-column">
          <div>
            <div
              class="main-container__title"
              :class="!isDetail ? 'clickable' : ''"
              @click="toPostDetail"
            >
              {{ blog.title }}
            </div>
            <div class="main-container__date">
              {{ blog.modified_at ? blog.modified_at.split("T")[0] : "" }}
            </div>
            <div class="main-container__category">
              {{ blog.categories[0] ? blog.categories[0].name : "" }}
            </div>
            <div
              class="main-container__description"
              :class="{ ellipsis: preview }"
              :preview="true"
              v-html="description"
            ></div>
          </div>
          <div
            v-if="!isDetail"
            class="main-container__read-more"
            @click="toPostDetail"
          >
            {{ $t("read_more") }}
          </div>
        </div>
      </div>
    </div>
    <div class="post-divider" />
  </div>
</template>

<script>
export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
    isDetail: {
      type: Boolean,
      default: false,
    },
    isTest: {
      type: Boolean,
      default: false,
    },
    preview: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    description() {
      return (this.blog.description + "").replace(
        /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
        "$1<br>$2"
      );
    },
    image() {
      return this.blog.thumbnail_image
        ? String(this.blog.thumbnail_image)
        : require("~/assets/images/blog-post-image.png");
    },
  },
  methods: {
    toPostDetail() {
      if (!this.isDetail) {
        this.$router.push(`/blog/post-detail/${this.blog.id}/`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/blog/recent-post";
</style>
