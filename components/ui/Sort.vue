<template>
  <div class="sort" @click="$emit('sort')">
    <div>{{ $t("date") }}</div>
    <img :class="direction" src="~/assets/icons/arrow-up.svg" />
  </div>
</template>

<script>
export default {
  name: "Sort",
  props: {
    direction: {
      type: String,
      default: "asc",
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/ui/sort";
</style>
