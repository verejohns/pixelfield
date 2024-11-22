<template>
  <div class="tile">
    <div class="main-container">
      <div class="main-container__col-1">
        <div class="main-container__name">{{ topic.title }}</div>
        <div class="view-stars">
          <img
            v-for="(image, index) in 3"
            :key="index"
            class="star"
            :src="chooseImage(index)"
          />
        </div>
      </div>
      <div v-if="topic.is_completed" class="main-container__col-2">
        <vue-ellipse-progress
          :progress="score"
          font-color="black"
          :size="60"
          thickness="10%"
          empty-thickness="10%"
          color="#F9C331"
          :legend="true"
        >
          <span slomat="legend-value">{{ score }}%</span>
        </vue-ellipse-progress>
      </div>
    </div>
    <div
      :class="{
        button: true,
        'button__play-disabled': !isActive,
        'button__play-yellow': isActive && score < 75,
        completed: isActive && score >= 75,
      }"
      @click="handleButton"
    >
      {{ chooseText }}
      <img
        v-if="score >= 75"
        class="img"
        src="~/assets/icons/check-square.svg"
      />
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
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      total: this.topic.final_test_total_questions,
      correct: this.topic.final_test_total_success_answers,
    };
  },
  computed: {
    showResult() {
      return this.topic.is_completed;
    },
    score() {
      if (this.topic.best_result && this.topic.best_result.percentage) {
        return this.topic.best_result.percentage;
      }
      return 0;
    },
    chooseText() {
      return this.score >= 75
        ? ""
        : !this.topic.is_completed
        ? this.$t("play")
        : this.$t("try_again");
    },
  },
  methods: {
    handleButton() {
      if (this.isActive && (!this.topic.is_completed || this.score <= 75)) {
        this.$router.push(
          `/tests/board?test=${this.topic.final_test}&planId=${
            this.$route.params.id
          }&themeId=${this.topic.id}&isFinalTest=${true}`
        );
      }
    },
    chooseImage(index) {
      if (this.topic.is_completed) {
        let image = require("~/assets/icons/star-noncolor.svg");
        switch (index) {
          case 0:
            return this.score >= 25
              ? (image = require("~/assets/icons/star-color.svg"))
              : image;
          case 1:
            return this.score >= 50
              ? (image = require("~/assets/icons/star-color.svg"))
              : image;
          case 2:
            return this.score >= 75
              ? (image = require("~/assets/icons/star-color.svg"))
              : image;
        }
      } else {
        return require("~/assets/icons/star-noncolor.svg");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/training-plan/final-test-card";
</style>
