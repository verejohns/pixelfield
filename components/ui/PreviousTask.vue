<template>
  <div class="task-container view-margin-bottom-16" @click="toComp">
    <div class="task-container__row">
      <div v-if="isTest" class="task-container__col-start view-width-70">
        <div class="task-container__number">{{ number }}</div>
        <img class="view-margin-horizontal view-resize-icon" :src="statusImg" />
        <div>{{ title }}</div>
      </div>
      <div v-else class="task-container__col-start view-width-70">
        {{ competition.title }}
      </div>
      <div class="task-container__date task-container__col-end view-width-30">
        {{ date }}
      </div>
    </div>
    <div class="task-container__row__center view-margin-vertical">
      <div
        v-for="(showColoredStar, i) in starsValues"
        :key="`star_img_${i}`"
        class="align-star"
      >
        <img v-if="showColoredStar" src="~/assets/icons/star-color.svg" />
        <img v-else src="~/assets/icons/star-noncolor.svg" />
      </div>
    </div>
    <div class="task-container__row">
      <div class="task-container__col-start view-width-third">
        <img
          class="view-margin-right view-resize-icon"
          src="~/assets/icons/timer.svg"
        />{{ isTest ? minutes : time_spend }} {{ $t("min") }}
      </div>
      <div
        v-if="isTest"
        class="
          task-container__attempt task-container__col__center
          view-width-third
        "
      >
        <img
          class="
            task-container__attempt__img
            view-margin-right view-resize-icon
          "
          src="~/assets/icons/restart.svg"
          @click="handleRetry"
        />
        <div>
          {{ $tc("attempts_l", attempts, { count: attempts }) }}
        </div>
      </div>
      <div v-else class="task-container__col__center view-width-third">
        {{ $tc("points", points, { count: points }) }}
      </div>
      <div v-if="isTest" class="task-container__col-end view-width-third">
        <img
          class="view-margin-right view-resize-icon"
          src="~/assets/icons/check-circle.svg"
        />{{ $tc("points", points, { count: points }) }}
      </div>
      <div v-else class="task-container__col-end view-width-third">
        <img
          class="view-margin-right view-resize-icon"
          src="~/assets/icons/heart.svg"
        />{{ lives }} {{ $t("lives") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isTest: {
      type: Boolean,
      default: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    competition: {
      type: Object,
      default: null,
    },
    taskId: {
      type: Number,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    test: {
      type: Object,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    navToTest: {
      type: Boolean,
      default: false,
    },
    navToComp: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      required: true,
    },
    minutes: {
      type: String,
      required: true,
    },
    attempts: {
      type: Number,
      required: false,
      default: 0,
    },
    points: {
      type: String,
      required: true,
    },
    lives: {
      type: Number,
      required: false,
      default: 8,
    },
    stars: {
      type: Number,
      required: true,
    },
  },
  computed: {
    statusImg() {
      return this.isCompleted
        ? require("~/assets/icons/completed.svg")
        : require("~/assets/icons/unfinished.svg");
    },
    starsValues() {
      return [...Array(3).keys()].map((star) => this.stars > star);
    },
    time_spend() {
      return Math.round(this.competition.time_spend / 60);
    },
  },
  methods: {
    toComp() {
      if (this.navToTest) {
        this.$store.commit("tests/setTestId", this.test.id);
        this.$router.push("/tests/result?backTo=profile");
      } else if (this.navToComp) {
        this.$router.push(`/competitions/details/${this.competition.id}/`);
      }
    },
    handleRetry() {
      this.$router.push(`/tests/board?test=${this.taskId}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/previous-task-tile";
</style>
