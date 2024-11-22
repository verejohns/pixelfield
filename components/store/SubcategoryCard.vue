<template>
  <div v-if="shouldShowCard" class="subcategory-card">
    <img
      v-if="unlocked"
      :src="image"
      :alt="name"
      class="subcategory-card_img"
      @click="handleClick"
    />
    <div v-else class="subcategory-card_locked">
      <div class="subcategory-card_locked_lock">
        <img src="~/assets/icons/lock.svg" />
      </div>
      <div class="subcategory-card_locked_name">
        {{ name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StoreSubcategoryCard",
  props: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    filterCard: {
      type: Boolean,
      default: false,
    },
    unlocked: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    shouldShowCard() {
      return this.filterCard ? !!this.unlocked : true;
    },
  },
  methods: {
    handleClick() {
      if (!this.inModal) this.$emit("dialog");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/store/categories";
</style>
