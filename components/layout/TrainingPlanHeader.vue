<template>
  <div class="default-header">
    <div class="left-display">
      <div class="default-header__title view-show-mobile">{{ name }}</div>
      <div class="default-header__title">My-Chess</div>
    </div>
    <div class="right-display">
      <div class="timer view-show-mobile">
        {{ questionNumber }}/{{ totalQuestions }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    questionNumber: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/layout/question-header";
</style>
