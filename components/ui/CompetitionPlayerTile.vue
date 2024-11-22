<template>
  <div class="main-container">
    <div class="main-container__tile">
      <div class="main-container__tile__left">
        <div class="view-flex-col">
          <div>{{ pad }}</div>
          <img
            v-if="test.completion_status === status.COMPLETED"
            src="~/assets/icons/completed.svg"
          />
          <img
            v-else-if="test.completion_status === status.UNFINISHED"
            src="~/assets/icons/unfinished.svg"
          />
          <img v-else src="~/assets/icons/notstarted.svg" />
        </div>
        <div class="view-flex-col view-margin-left-24">
          <div class="view-margin-bottom-12">
            {{ test.title }}
          </div>
          <div v-if="false" class="view-stars">
            <img src="~/assets/icons/star-noncolor.svg" />
            <img src="~/assets/icons/star-noncolor.svg" />
            <img src="~/assets/icons/star-noncolor.svg" />
          </div>
        </div>
      </div>
      <div class="view-time-mobile view-mobile-time">
        <div>{{ test.duration }} {{ $t("min") }}</div>
      </div>
      <div class="main-container__tile__right">
        <div class="view-time-desktop view-margin-bottom-12">
          {{ test.duration }} {{ $t("min") }}
        </div>
        <div class="main-container__tile__difficulty">
          <img
            v-if="test.difficulty === difficulty.EASY"
            src="~/assets/icons/easy.svg"
          />
          <img
            v-if="test.difficulty === difficulty.MEDIUM"
            src="~/assets/icons/medium.svg"
          />
          <img
            v-if="test.difficulty === difficulty.HARD"
            src="~/assets/icons/hard.svg"
          />
          <div class="main-container__tile__difficulty-text">
            {{ $t(test.difficulty) }}
          </div>
        </div>
      </div>
    </div>
    <div class="main-container__play-button" @click="onClick">
      <div>
        {{ $t("play") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    test: {
      type: Object,
      required: true,
    },
    testId: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      status: {
        COMPLETED: "completed",
        NOTSTARTED: "not started",
        UNFINISHED: "in progress",
      },
      difficulty: {
        EASY: "easy",
        MEDIUM: "medium",
        HARD: "hard",
      },
    };
  },
  computed: {
    pad() {
      return this.index.toString().padStart(2, "0");
    },
  },
  methods: {
    onClick() {
      this.$router.push(
        `/tests/board?test=${this.test.id}&competition=${this.testId}`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/player-tile";
</style>
