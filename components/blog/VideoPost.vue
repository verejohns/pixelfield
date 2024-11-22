<template>
  <div>
    <div class="main-container">
      <div class="view-flex main-container__content">
        <div class="video-container">
          <iframe
            width="300"
            height="100%"
            :src="getVideo"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
        <div class="view-column-video">
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
              {{ blog.categories.length ? blog.categories[0].name : "" }}
            </div>
            <div
              class="main-container__description"
              :class="{ ellipsis: preview }"
            >
              {{ blog.description }}
            </div>
          </div>
          <div
            v-if="!isDetail"
            class="main-container__read-more"
            @click="toPostDetail"
          >
            {{ $t("watch") }}
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
    preview: {
      type: Boolean,
      default: false,
    },
    isDetail: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getVideo() {
      return String(this.blog.video_link).replace("watch?v=", "embed/");
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
