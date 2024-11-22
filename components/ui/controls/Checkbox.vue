<template>
  <input
    type="checkbox"
    :class="disabled === 'disabled' ? 'disabled' : ''"
    :disabled="disabled === 'disabled'"
  />
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    disabled: {
      type: String,
      required: false,
      default: "",
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/components/ui/controls/checkbox";
</style>
