<template>
  <transition name="level-modal">
    <div class="level-modal__container">
      <div
        class="level-modal__content"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <div class="level-modal__header">
          <img
            class="level-modal__close-button"
            src="~/assets/icons/close-circle-black.svg"
            aria-label="Close modal"
            @click="cancel"
          />
        </div>
        <div class="level-modal__body">
          <div class="level-modal__title">{{ $t("change_difficulty") }}</div>
          <LevelButton
            :selected="levelNew === levels.BEGINNER"
            :label="$t('easy')"
            @click="setLevel(levels.BEGINNER)"
          />
          <LevelButton
            :selected="levelNew === levels.INTERMEDIATE"
            :label="$t('medium')"
            @click="setLevel(levels.INTERMEDIATE)"
          />
          <LevelButton
            :selected="levelNew === levels.ADVANCED"
            :label="$t('hard')"
            @click="setLevel(levels.ADVANCED)"
          />
          <LevelButton
            :selected="levelNew === levels.ALL"
            :label="$t('all_levels')"
            @click="setLevel(levels.ALL)"
          />
        </div>

        <div class="level-modal__footer">
          <Button
            :label="$t('confirm')"
            type="primary"
            size="medium"
            width="100%"
            height="48px"
            padding-top="16px"
            @click="close"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Button from "~/components/ui/buttons/Button";
import LevelButton from "~/components/ui/buttons/LevelButton";

export default {
  name: "LevelModal",
  components: {
    Button,
    LevelButton,
  },
  props: {
    level: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      levelNew: "",
      levels: {
        BEGINNER: "easy",
        INTERMEDIATE: "medium",
        ADVANCED: "hard",
        ALL: "all levels",
      },
    };
  },
  mounted() {
    this.levelNew = this.$store.state.testsList.level;
  },
  methods: {
    close() {
      this.$store.commit("testsList/setLevel", this.levelNew);
      this.$emit("close", this.levelNew);
    },
    cancel() {
      this.$emit("close", "");
    },
    setLevel(levelNew) {
      this.levelNew = levelNew;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/tests/level-modal";
</style>
