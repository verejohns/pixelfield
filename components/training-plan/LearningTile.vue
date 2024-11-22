<template>
  <div class="main-container">
    <img class="view-float-image" src="~/assets/images/learn.png" />
    <div class="main-container__title">{{ title }}</div>
    <div class="main-container__description">
      {{ desc }}
    </div>
    <div class="main-container__learn-more">{{ $t("learn_more") }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Mat",
      desc: "Description Description Description Description",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/training-plan/learning-tile";
</style>
