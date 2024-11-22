<template>
  <div class="main-container">
    <div class="main-container__title">{{ title }}</div>
    <div class="main-container__category">{{ category }}</div>
    <div class="main-container__description">
      {{ desc }}
    </div>
    <div class="view-flex">
      <div class="main-container__learn-more">{{ $t("read") }}</div>
      <img class="view-image-spacing" src="~/assets/icons/bookmark.svg" />
      <div class="main-container__learn-more">
        {{ $t("bookmark") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Article Title",
      category: "Category",
      desc: "Description Description Description Description",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/training-plan/learning-tile";
</style>
