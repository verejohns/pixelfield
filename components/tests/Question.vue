<template>
  <div class="board__middle">
    <div class="board__middle__title desktop">
      {{ question.description }}
    </div>
    <SelectOrderQuestion
      v-if="question.type === 'sorting'"
      @add-option="addOption"
      @remove-option="removeOption"
    />
    <MoveAndResultQuestion
      v-else-if="question.type === 'move_and_result'"
      @add-option="addOption"
      @remove-option="removeOption"
    />
    <MoveQuestion
      v-else-if="question.type === 'correct_move'"
      @add-option="addOption"
      @remove-option="removeOption"
    />
    <FieldMarketing
      v-else-if="question.type === 'field_marking'"
      @add-option="addOption"
      @remove-option="removeOption"
    />
    <MultipleChoiceQuestion
      v-else-if="question.type === 'multiple_choices'"
      @add-option="addOption"
      @remove-option="removeOption"
    />
    <NumberFieldQuestion
      v-else-if="question.type === 'number'"
      @add-option="addOption"
      @remove-option="removeOption"
    />
  </div>
</template>

<script>
import SelectOrderQuestion from "~/components/questions/SelectOrderQuestion";
import MoveAndResultQuestion from "~/components/questions/MoveAndResultQuestion";
import MoveQuestion from "~/components/questions/MoveQuestion";
import MultipleChoiceQuestion from "~/components/questions/MultipleChoiceQuestion";
import NumberFieldQuestion from "~/components/questions/NumberFieldQuestion";
import FieldMarketing from "~/components/questions/FieldMarketing";

export default {
  name: "Question",
  components: {
    SelectOrderQuestion,
    MoveAndResultQuestion,
    MoveQuestion,
    MultipleChoiceQuestion,
    NumberFieldQuestion,
    FieldMarketing,
  },
  props: {
    question: {
      type: Object,
      required: true,
    },
    clear: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      option: 0,
      optionName: "",
    };
  },
  watch: {
    clear() {
      this.clearOption();
    },
  },
  methods: {
    clearOption() {
      this.option = 0;
    },
    addOption(optionName) {
      this.optionName = optionName;
      if (optionName === "move" || optionName === "numberfield")
        this.option = 1;
      else this.option++;
      this.nextIcon =
        (this.option && optionName !== "selectorder") ||
        (this.option === 5 && optionName === "selectorder")
          ? "arrow-right-circle-selected"
          : "arrow-right-circle";
      this.$emit("next-status", this.option, this.nextIcon, this.optionName);
    },
    removeOption(optionName) {
      this.optionName = optionName;
      if (
        optionName === "move" ||
        optionName === "numberfield" ||
        optionName === "fieldmarketing"
      )
        this.option = 0;
      else this.option--;
      this.nextIcon =
        (this.option && optionName !== "selectorder") ||
        (this.option === 5 && optionName === "selectorder")
          ? "arrow-right-circle-selected"
          : "arrow-right-circle";
      this.$emit("next-status", this.option, this.nextIcon, this.optionName);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/tests/board";
</style>
