<template>
  <div class="categories-modal">
    <div>
      <div
        class="
          categories-modal__content categories-modal__content__training-plans
        "
      >
        <div class="categories-modal__image" @click="closeModal">
          <img src="~/assets/icons/close-circle-black.svg" />
        </div>
        <div class="categories-modal__title">
          {{ $t("select_difficulty") }}
        </div>
        <div v-for="difficulty in difficulties" :key="difficulty">
          <ModalTile
            :is-selected="selected === difficulty"
            :name="difficulty"
            @newCategory="selectDifficulty"
          />
        </div>
        <div class="categories-modal__button" @click="changeDifficulty">
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
    currentDifficulty: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      difficulties: [
        this.$t("easy"),
        this.$t("medium"),
        this.$t("hard"),
        this.$t("all_levels"),
      ],
      selected: this.currentDifficulty,
    };
  },
  methods: {
    changeDifficulty() {
      this.$emit("changeDifficulty", this.selected);
    },
    closeModal() {
      this.$emit("closeModal");
    },
    selectDifficulty(difficultyName) {
      this.selected = difficultyName;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/blog/modal";
</style>
