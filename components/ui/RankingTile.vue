<template>
  <div :class="['main-container', first ? 'main-container__first' : '']">
    <div class="main-container__left">
      <div>{{ position }}</div>
      <img
        v-if="data.student.avatar"
        :src="data.student.avatar"
        class="main-container__left__img"
      />
      <div v-else class="temp-avatar">
        <div>
          {{ data.student.display_name[0] }}
        </div>
      </div>
      <div>{{ data.student.display_name }}</div>
    </div>
    <div class="main-container__right">
      <div>
        {{ $tc("points", points, { count: points }) }}
      </div>
      <div
        v-if="!isSchool"
        class="view-left-margin view-flex view-vertical-margins"
      >
        <div class="view-icon-spacing">
          {{ data.lives }}
        </div>
        <img class="img-resize" src="~/assets/icons/heart.svg" />
      </div>
      <div v-if="!isSchool" class="view-left-margin view-flex bg-green">
        <div class="view-icon-spacing">
          {{ data.time_spend }} {{ $t("sec") }}
        </div>
        <img class="img-resize" src="~/assets/icons/timer.svg" />
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
    data: {
      type: Object,
      required: true,
    },
    first: {
      type: Boolean,
      default: false,
    },
    isSchool: {
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
      return Math.round(this.data.total_points);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ranking-tile";
</style>
