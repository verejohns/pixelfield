<template>
  <div
    class="level-button"
    :class="selected ? 'selected' : ''"
    @click="onClick"
  >
    <div class="label">{{ label }}</div>
    <img v-if="selected" src="~/assets/icons/check-circle.svg" class="icon" />
  </div>
</template>

<script>
export default {
  name: "LevelButton",
  props: {
    label: {
      type: String,
      required: true,
      default: "",
    },
    selected: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/components/ui/buttons/level-button";
</style>
