<template>
  <div class="tile">
    <div class="main-container">
      <div class="main-container__row">
        <div class="main-container__row-left">
          <img class="view-img-resize" src="~/assets/icons/circle.svg" />
          <div class="main-container__position">{{ position }}</div>
        </div>
        <div class="main-container__category">{{ category }}</div>
      </div>
      <div class="main-container__name">{{ name }}</div>
    </div>
    <div class="button button__play-disabled">
      {{ $t("open") }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: "Tests",
      position: "05",
      name: "{{ name of the topic }}",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/training-plan/play-card";
</style>
