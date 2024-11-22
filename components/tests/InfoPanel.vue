<template>
  <div v-if="duration" class="board__top">
    <div v-if="!hasPoints" class="board__progress desktop">
      <vue-ellipse-progress
        :progress="progress"
        font-color="white"
        :size="40"
        :legend="false"
      />
      <div class="board__progress-label">{{ number }} / {{ count }}</div>
    </div>
    <div v-else class="board__progress desktop">
      <div class="board__progress-label">{{ points }}</div>
    </div>
    <div v-if="!isStudy" class="board__timer">
      <div class="board__timer__content">
        <img class="board__timer-image" src="~/assets/icons/stopwatch_1.svg" />
        <div class="board__timer-label">{{ timeLabel }}</div>
      </div>
    </div>
  </div>
  <Loading v-else />
</template>

<script>
export default {
  name: "InfoPanel",
  props: {
    number: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      isStudy: false,
      time: 0,
      timeLabel: "",
      interval: null,
    };
  },
  computed: {
    hasPoints() {
      console.log("points", this.points);
      return this.points !== null;
    },
    progress() {
      return (this.number / this.count) * 100;
    },
    moduleName() {
      if (this.$route.name.includes("study")) return "study";
      else return "tests";
    },
  },
  mounted() {
    if (Object.keys(this.$route.query).includes("study")) {
      this.isStudy = true;
    }
    this.time = this.duration * 60;
    this.interval = setInterval(this.timer, 1000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    timer() {
      this.time--;
      if (this.time === 0) {
        this.$emit("end");
        clearInterval(this.interval);
      }
      const min = Math.floor(this.time / 60)
        .toString()
        .padStart(2, "0");
      const sec = (this.time % 60).toString().padStart(2, "0");
      this.timeLabel = `${min}:${sec}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/tests/board";
</style>
