<template>
  <div :class="['main-container', first ? 'main-container__first' : '']">
    <div class="main-container__left">
      <div>{{ position }}</div>
      <div class="temp-avatar">
        <div>
          {{ data.display_name[0] }}
        </div>
      </div>
      <div>{{ data.display_name }}</div>
    </div>
    <div class="main-container__right">
      <div>
        {{ $tc("points", points, { count: points }) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: -1,
    },
    pointsKey: {
      type: String,
      default: "total_points",
    },
    data: {
      type: Object,
      required: true,
    },
    first: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    position() {
      return this.id !== -1 ? this.id : this.data.position;
    },
    coachPhoto() {
      return this.$auth.user.avatar;
    },
    points() {
      return Math.round(this.data[this.pointsKey]);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ranking-tile";
</style>
