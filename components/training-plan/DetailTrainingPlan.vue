<template>
  <div class="detail-training-plan">
    <div class="detail-training-plan__info-tile">
      <div class="detail-training-plan__row view-margin-bottom-15">
        <div class="detail-training-plan__title">{{ trainingPlan.title }}</div>
      </div>
      <div class="detail-training-plan__description">
        {{ trainingPlan.description }}
      </div>
      <div class="view-flex">
        <div class="detail-training-plan__percentage">
          {{ calcPercentage }}
        </div>
        <div class="progress-bar">
          <div class="progress-bar__fill" :style="{ width: calcPercentage }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    trainingPlan: {
      type: Object,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    calcPercentage() {
      return Math.round(this.percentage) + "%";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/training-plan/detail-training-plan";
</style>
