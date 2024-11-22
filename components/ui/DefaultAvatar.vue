<template>
  <div
    class="avatar"
    :class="{ large: size > 80 }"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    {{ username.charAt(0) }}
  </div>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/default-avatar";
</style>
