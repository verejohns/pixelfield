<template>
  <div class="snackbar" :class="{ error: isError }">
    <div class="snackbar__container">
      <span class="snackbar__container__message">
        {{ message }}
      </span>
      <img v-if="isError" src="~/assets/icons/close-circle-white.svg" />
      <NuxtLink
        v-else
        to="/store/collection/"
        class="snackbar__container__link"
      >
        {{ $t("view_collection") }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "SnackBar",
  props: {
    message: {
      type: String,
      required: true,
    },
    isError: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/store/store";
</style>
