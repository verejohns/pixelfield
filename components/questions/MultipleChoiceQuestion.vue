<template>
  <div class="multiple-choice-question">
    <div
      v-for="(question, idx) in questions"
      :key="`item__mq_${question.id}_${idx}`"
      class="multiple-choice-question__option"
      :class="{ selected: selectedOptions.includes(question.value) }"
      @click="selectOption($event, question.value)"
    >
      {{ question.description }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MultipleChoiceQuestion",
  computed: {
    questions() {
      const currentQuestion = this.$store.getters["tests/currentQuestion"];
      const possibleAnswers = currentQuestion.possibleAnswers;
      return possibleAnswers;
    },
    selectedOptions() {
      const currentAnswer = this.$store.getters["tests/currentAnswer"];
      return currentAnswer === undefined ? [] : currentAnswer.value;
    },
  },
  methods: {
    selectOption(event, value) {
      const currentAnswer = this.$store.getters["tests/currentAnswer"];
      event.target.classList.toggle("selected");
      if (event.target.classList.contains("selected")) {
        this.$emit("add-option", "multiplechoice");
        const newValue = [...currentAnswer.value, value];
        this.$store.commit("tests/setAnswerValue", newValue);
      } else {
        this.$emit("remove-option", "multiplechoice");
        const newValue = currentAnswer.value.filter((item) => item !== value);
        this.$store.commit("tests/setAnswerValue", newValue);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/questions/multiple-choice-question";
</style>
