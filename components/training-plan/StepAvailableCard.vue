<template>
  <div class="tile">
    <div class="main-container">
      <div class="main-container__row">
        <div class="main-container__row-left">
          <img class="view-img-resize" src="~/assets/icons/circle.svg" />
          <div class="main-container__position">{{ position }}</div>
        </div>
        <div class="main-container__category">{{ $t(topic.type) }}</div>
      </div>
      <div class="main-container__name">{{ topic.title }}</div>
    </div>
    <div
      :class="{
        button: true,
        button__play: isActive,
        'button__play-disabled': !isActive,
      }"
      @click="toRoute"
    >
      {{ buttonText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    topic: {
      type: Object,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    buttonText() {
      return this.topic.chesspedia ? this.$t("open") : this.$t("play");
    },
  },
  methods: {
    toRoute() {
      let parameter = this.topic.id;
      if (this.topic.type === "test") {
        parameter = this.topic.test;
      } else if (this.topic.type === "lesson") {
        parameter = this.topic.lesson;
      } else if (this.topic.type === "chesspedia") {
        parameter = this.topic.chesspedia;
      } else if (this.topic.type === "video") {
        parameter = this.topic.video;
      }

      this.$emit("canPlayThisTheme", {
        type: this.topic.type,
        id: this.topic.id,
        parameter,
        topicName: this.topic.title,
        step: this.position,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/training-plan/play-card";
</style>
