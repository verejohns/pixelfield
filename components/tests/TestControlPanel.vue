<template>
  <div class="board__bottom">
    <div class="lives">
      <template v-if="lives !== null && lives > 0 && lives < 4">
        <div v-for="index in lives" :key="index">
          <img class="lives__spacing" src="~/assets/icons/test-life.svg" />
        </div>
      </template>
      <template v-else-if="lives !== null">
        <img
          :key="index"
          class="lives__spacing"
          src="~/assets/icons/test-life.svg"
        />
        <div>
          <strong>x {{ lives }}</strong>
        </div>
      </template>
    </div>
    <Button
      :label="this.$t('end')"
      type="tertiary"
      size="large"
      icon="close-circle"
      color="red"
      width="95px"
      @click="$emit('end-button-click')"
    />
  </div>
</template>

<script>
import Button from "~/components/ui/buttons/Button";

export default {
  name: "TestControlPanel",
  components: {
    Button,
  },
  props: {
    option: {
      type: Number,
      required: true,
    },
    nextIcon: {
      type: String,
      required: true,
      default: "arrow-right-circle",
    },
    optionName: {
      type: String,
      required: true,
    },
    step: {
      type: Number,
      required: true,
    },
    lastQuestion: {
      type: Boolean,
      required: true,
    },
    lives: {
      type: Number,
      required: false,
      default: null,
    },
  },
  computed: {
    getPreviousIcon() {
      return this.step ? "arrow-left-circle" : "arrow-left-circle-disabled";
    },
    getNextIcon() {
      return this.lastQuestion ? "arrow-right-circle-disabled" : this.nextIcon;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/tests/board";
</style>
