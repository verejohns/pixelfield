<template>
  <div class="categories-modal">
    <div>
      <div class="categories-modal__content">
        <div class="categories-modal__image" @click="closeModal">
          <img src="~/assets/icons/close-circle-black.svg" />
        </div>
        <div class="categories-modal__title">
          {{ $t("select_category") }}
        </div>
        <div class="categories-modal__categories">
          <div
            v-for="(category, index) in categories"
            :key="`category'-${index}`"
          >
            <ModalTile
              :is-selected="selected === category"
              :name="category"
              @newCategory="selectCategory(category)"
            />
          </div>
        </div>
        <div class="categories-modal__button" @click="changeCategory">
          {{ $t("confirm") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalTile from "~/components/blog/CategoryModalTile.vue";
export default {
  components: {
    ModalTile,
  },
  props: {
    currentCategory: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selected: this.currentCategory,
    };
  },
  methods: {
    changeCategory() {
      this.$emit("changeCategory", this.selected);
    },
    closeModal() {
      this.$emit("closeModal");
    },
    selectCategory(category) {
      this.selected = category;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/blog/modal";
</style>
