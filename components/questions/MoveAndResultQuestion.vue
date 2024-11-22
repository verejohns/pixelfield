<template>
  <div class="move-and-result-question">
    <div class="correct-move" :class="[option ? 'selected' : '']">
      {{ option ? option : $t("correct_move") }}
      <img
        v-if="option"
        class="option-icon"
        src="~/assets/icons/close-circle-black.svg"
        @click="removeOption($event)"
      />
    </div>
    <div class="options">
      <div
        v-for="(item, index) in options"
        :key="index"
        class="option-button"
        :class="{ selected: selectedOptions.includes(item.value) }"
        @click="selectOption($event, item.value)"
      >
        {{ item.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MoveAndResultQuestion",
  components: {},
  props: {},
  computed: {
    option: {
      get() {
        const answer = this.$store.getters["tests/currentAnswer"];
        if (answer === undefined) {
          return "";
        } else {
          if (answer.move) this.$emit("add-option", "moverequest");
          return answer.move;
        }
      },
      set(value) {
        this.$store.commit("tests/setAnswerMove", value);
      },
    },
    options: {
      get() {
        const question = this.$store.getters["tests/currentQuestion"];
        if (question === undefined) {
          return [];
        } else {
          return question.possibleAnswers;
        }
      },
    },
    selectedOptions() {
      const currentAnswer = this.$store.getters["tests/currentAnswer"];
      return currentAnswer === undefined ? [] : currentAnswer.value;
    },
  },
  methods: {
    selectOption(event, value) {
      this.clearOption();
      event.target.classList.toggle("selected");
      this.$store.commit("tests/setAnswerValue", [value]);
    },
    removeOption(event) {
      event.stopPropagation();
      this.option = "";
      this.$emit("remove-option", "moverequest");
    },
    clearOption() {
      const options = document.getElementsByClassName("option-button");
      for (const item of options) {
        if (item.classList.contains("selected")) {
          item.classList.remove("selected");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/questions/move-and-result-question";
</style>
