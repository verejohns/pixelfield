<template>
  <div class="select-order-question">
    <div v-for="item in options" :key="item.value">
      <QuestionButton
        :order="getOrder(item)"
        :label="item.description"
        @active="changeOption(item.value, 'active')"
        @deactive="changeOption(item.value, 'deactive')"
      />
    </div>
  </div>
</template>

<script>
import QuestionButton from "~/components/ui/buttons/QuestionButton";

export default {
  name: "SelectOrderQuestion",
  components: {
    QuestionButton,
  },
  computed: {
    options() {
      return this.$store.getters["tests/currentQuestion"].possibleAnswers;
    },
    orderedItems: {
      get() {
        const answer = this.$store.getters["tests/currentAnswer"];
        if (answer === undefined || typeof answer.value === "string") {
          return [];
        } else {
          return answer.value;
        }
      },
      set(value) {
        this.$store.commit("tests/setAnswerValue", value);
      },
    },
  },
  methods: {
    getOrder(item) {
      const index = this.orderedItems.findIndex(
        (value) => value === item.value
      );
      return index === -1 ? 0 : index + 1;
    },
    changeOption(value, action) {
      const currentAnswer = this.$store.getters["tests/currentAnswer"];
      if (action === "active" && !this.orderedItems.includes(value)) {
        this.$emit("add-option", "selectorder");
        this.orderedItems = [...currentAnswer.value, value];
      } else if (action === "deactive" && this.orderedItems.includes(value)) {
        this.$emit("remove-option", "selectorder");
        this.orderedItems = currentAnswer.value.filter(
          (item) => item !== value
        );
      }
    },
  },
};
</script>
