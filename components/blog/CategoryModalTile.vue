<template>
  <div
    :class="['modal-tile', isSelected ? 'modal-tile__selected' : '']"
    @click="newCategory"
  >
    <div class="modal-tile__category-name">{{ name }}</div>
    <img :src="selected" />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    selected() {
      return this.isSelected
        ? require("~/assets/icons/check-circle.svg")
        : require("~/assets/icons/circle-black.svg");
    },
  },
  methods: {
    newCategory() {
      this.$emit("newCategory", this.name);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/blog/modal";
</style>
