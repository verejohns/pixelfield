<template>
  <div class="short-result-content">
    <div class="short-result-content__question">
      <img src="~/assets/icons/check-circle.svg" />
      <div>{{ result.progress }}</div>
    </div>
    <div class="short-result-content__comment">
      <div class="short-result-content__review">
        <img
          v-for="indexStar in result.star"
          :key="indexStar"
          src="~/assets/icons/star-color.svg"
        />
      </div>
      <div class="short-result-content__result">
        <client-only>
          <vue-ellipse-progress
            :progress="result.progressBar"
            font-color="#24282A"
            :size="57"
            :thickness="5"
            color="#FBBE1C"
            >{{ result.progressBar }}%</vue-ellipse-progress
          >
        </client-only>
      </div>
    </div>
    <div class="short-result-content__duration">
      <img src="~/assets/icons/timer.svg" />
      <div>{{ result.duration }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShortResultContent",
  props: {
    result: {
      type: Object,
      required: true,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/tests/short-result-content";
</style>
