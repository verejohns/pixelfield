<template>
  <div
    class="question-button"
    :class="[order ? 'selected' : '']"
    @click="active"
  >
    <div>
      <div v-show="order" class="question-button__order">
        {{ order + ". " }}
      </div>
    </div>
    <div class="question-button__label">{{ label }}</div>
    <div>
      <img
        v-show="order"
        class="question-button__icon"
        src="~/assets/icons/close-circle-white.svg"
        @click="deactive($event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionButton",
  props: {
    label: {
      type: String,
      required: true,
      default: "",
    },
    order: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  methods: {
    active() {
      this.$emit("active");
    },
    deactive(event) {
      event.stopPropagation();
      this.$emit("deactive");
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/components/ui/buttons/question-button";
</style>
