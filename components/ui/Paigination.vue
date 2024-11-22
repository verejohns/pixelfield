<template>
  <div class="main-container">
    <div
      :class="[
        'main-container__index',
        selected === indexes[0] ? 'view-hidden' : 'view-visible',
      ]"
      @click="updateIndex(selected - 1)"
    >
      <img src="~/assets/icons/chevron-left.svg" />
    </div>
    <div v-for="index in indexes" :key="index">
      <div
        :class="['main-container__index', index === selected ? 'selected' : '']"
        @click="updateIndex(index)"
      >
        {{ index }}
      </div>
    </div>
    <div
      :class="[
        'main-container__index',
        selected === indexes[indexes.length - 1]
          ? 'view-hidden'
          : 'view-visible',
      ]"
      @click="updateIndex(selected + 1)"
    >
      <img src="~/assets/icons/chevron-right.svg" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    indexes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selected: 1,
    };
  },
  methods: {
    updateIndex(index) {
      this.selected = index;
      this.$emit("updateIndex", index);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/paigination";
</style>
