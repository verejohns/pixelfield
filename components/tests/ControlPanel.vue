<template>
  <div class="board__bottom">
    <Button
      :label="$t('previous')"
      :type="!filled ? 'tertiary' : 'tertiary_green-border'"
      size="large"
      :icon="getPreviousIcon"
      color="green"
      width="120px"
      :disabled="!step ? 'disabled' : ''"
      @click="$emit('previous-button-click')"
    />
    <Button
      :label="$t('end')"
      type="tertiary"
      size="large"
      icon="close-circle"
      color="red"
      width="95px"
      @click="$emit('end-button-click')"
    />
    <Button
      :label="$t('next')"
      :type="!filled ? 'tertiary' : ''"
      size="large"
      :icon="getNextIcon"
      :filled="filled"
      :color="!filled ? 'green' : ''"
      position="right"
      width="120px"
      :selected="
        !lastQuestion &&
        ((option === 5 && optionName === 'selectorder') ||
          (option && optionName === 'moverequest') ||
          (option && optionName === 'move') ||
          (option && optionName === 'multiplechoice') ||
          (option && optionName === 'numberfield') ||
          (option && optionName === 'fieldmarketing'))
          ? 'selected'
          : ''
      "
      :disabled="lastQuestion ? 'disabled' : ''"
      @click="nextButtonClick"
    />
  </div>
</template>

<script>
import Button from "~/components/ui/buttons/Button";

export default {
  name: "ControlPanel",
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
    filled: {
      type: Boolean,
      default: false,
    },
    isCommentQuestion: {
      type: Boolean,
      default: false,
    },
    step: {
      type: Number,
      required: true,
    },
    lastQuestion: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      timeout: false,
    };
  },
  computed: {
    getPreviousIcon() {
      return this.step ? "arrow-left-circle" : "arrow-left-circle-disabled";
    },
    getNextIcon() {
      return this.lastQuestion
        ? "arrow-right-circle-disabled"
        : this.filled
        ? "arrow-right-circle-selected"
        : this.nextIcon;
    },
  },
  methods: {
    nextButtonClick() {
      if (!this.timeout) {
        this.timeout = true;
        setTimeout(() => {
          this.timeout = false;
        }, 10);
        this.$emit("next-button-click");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/tests/board";
</style>
