<template>
  <div class="next-release-card">
    <img class="next-release-card__img" src="~/assets/images/coach.png" />
    <div>
      <div class="next-release-card__text">{{ $t("next_release_in") }}</div>
      <div class="next-release-card__time">{{ release }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    next: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timer: null,
      release: null,
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      const timeLeft = this.$moment.duration(this.next.diff(this.$moment()));
      const h = timeLeft.hours();
      const m = timeLeft.minutes();
      const s = timeLeft.seconds();
      if (h <= 0 && m <= 0 && s <= 0) {
        clearInterval(this.timer);
        this.release = "00:00:00";
      } else {
        const hours = this.leadingZero(h);
        const minutes = this.leadingZero(m);
        const seconds = this.leadingZero(s);
        this.release = `${hours}:${minutes}:${seconds}`;
      }
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    leadingZero(n) {
      if (n < 10) return `0${n}`;
      return n;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/store/store";
</style>
