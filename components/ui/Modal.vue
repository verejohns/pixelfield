<template>
  <div class="modal">
    <div class="modal_bg" @click="$emit('close')" />
    <div class="modal__content">
      <div class="modal__close">
        <img
          src="~/assets/icons/close-circle-black.svg"
          class="modal__close__cross"
          @click="$emit('close')"
        />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    size: {
      type: String,
      default: "large",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/modal";
</style>
