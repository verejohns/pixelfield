<template>
  <div v-if="show" class="result-answer-item">
    <div
      class="result-answer-item__control"
      @click="selectQuestion(answerItem)"
    >
      <div class="result-answer-item__content">
        <img :src="icon" />
        <div class="result-answer-item__title">
          {{ $t("question") }} {{ index + 1 }}
        </div>
      </div>
      <img
        v-if="selectedQuestionId === answerItem.id"
        src="~/assets/icons/chevron-down.svg"
      />
      <img v-else src="~/assets/icons/chevron-up.svg" />
    </div>
    <div
      v-if="selectedQuestionId === answerItem.id"
      class="result-answer-item__main"
    >
      <div class="result-answer-item__main__board">
        <div id="board"></div>
      </div>
      <div class="result-answer-item__main__content">
        <div class="result-answer-item__main__content__title">
          {{ answerItem.description }}
        </div>
        <div class="result-answer-item__main__content__questions">
          <template v-if="type === 'multiple_choices'">
            <template v-for="(answer, a) in answers">
              <div
                v-if="isMultipleChoicesAnswerEmpty(answer, a)"
                :key="a"
                class="result-answer-item__main__content__question"
              >
                <img src="~/assets/icons/circle.svg" />
                <div class="option-text another-option">
                  {{ answer.description }}
                </div>
              </div>
              <div
                v-else-if="isMultipleChoicesAnswerCorrect(answer, a)"
                :key="a"
                class="result-answer-item__main__content__question"
              >
                <img src="~/assets/icons/check-circle-green.svg" />
                <div class="option-text correct-answer">
                  {{ answer.description }}
                </div>
              </div>
              <div
                v-else
                :key="a"
                class="result-answer-item__main__content__question"
              >
                <img src="~/assets/icons/close-circle-wrong.svg" />
                <div class="option-text wrong-answer">
                  {{ answer.description }}
                </div>
              </div>
            </template>
          </template>

          <template v-if="type === 'sorting'">
            <template v-for="(answer, a) in sortedAnswers">
              <div
                v-if="isSortCorrect(answer, a)"
                :key="a"
                class="result-answer-item__main__content__question"
              >
                <img src="~/assets/icons/check-circle-green.svg" />
                <div class="option-text correct-answer">
                  {{ a + 1 }}. {{ answer.description }}
                </div>
              </div>
              <div
                v-else
                :key="a"
                class="result-answer-item__main__content__question"
              >
                <img src="~/assets/icons/close-circle-wrong.svg" />
                <div class="option-text wrong-answer">
                  {{ a + 1 }}. {{ answer.description }}
                </div>
              </div>
            </template>
          </template>

          <template v-if="type === 'correct_move'">
            <div
              v-if="isCorrect"
              class="result-answer-item__main__content__question"
            >
              <img src="~/assets/icons/check-circle-green.svg" />
              <div class="option-text correct-answer">
                {{ correctAnswerValue }}
              </div>
            </div>
            <template v-else>
              <div class="result-answer-item__main__content__question">
                <img src="~/assets/icons/close-circle-wrong.svg" />
                <div class="option-text wrong-answer">
                  {{ filteredAnswer(answerItem.answer.value) }}
                </div>
              </div>
              <div class="result-answer-item__main__content__question">
                <img src="~/assets/icons/check-circle-green.svg" />
                <div class="option-text correct-answer">
                  {{ correctAnswerValue }}
                </div>
              </div>
            </template>
          </template>

          <template v-if="type === 'move_and_result'">
            <div
              v-if="isCorrect"
              class="result-answer-item__main__content__question"
            >
              <img src="~/assets/icons/check-circle-green.svg" />
              <div class="option-text correct-answer">
                {{ answerMoveResult(answerItem.answer.value[0]) }}
                {{ filteredAnswer(answerItem.answer.move) }}
              </div>
            </div>
            <template v-else>
              <div class="result-answer-item__main__content__question">
                <img src="~/assets/icons/close-circle-wrong.svg" />
                <div class="option-text wrong-answer">
                  {{ answerMoveResult(answerItem.answer.value[0]) }}
                  {{ filteredAnswer(answerItem.answer.move) }}
                </div>
              </div>
              <div class="result-answer-item__main__content__question">
                <img src="~/assets/icons/check-circle-green.svg" />
                <div class="option-text correct-answer">
                  {{ correctAnswerMoveResult }}
                </div>
              </div>
            </template>
            <template v-for="(answer, a) in answers">
              <div
                v-if="isMultipleChoicesAnswerEmpty(answer, a)"
                :key="a"
                class="result-answer-item__main__content__question"
              >
                <img src="~/assets/icons/circle.svg" />
                <div class="option-text another-option">
                  {{ answer.description }}
                </div>
              </div>
              <div
                v-else-if="isMultipleChoicesAnswerCorrect(answer, a)"
                :key="a"
                class="result-answer-item__main__content__question"
              >
                <img src="~/assets/icons/check-circle-green.svg" />
                <div class="option-text correct-answer">
                  {{ answer.description }}
                </div>
              </div>
              <div
                v-else
                :key="a"
                class="result-answer-item__main__content__question"
              >
                <img src="~/assets/icons/close-circle-wrong.svg" />
                <div class="option-text wrong-answer">
                  {{ answer.description }}
                </div>
              </div>
            </template>
          </template>

          <template v-if="type === 'field_marking'">
            <div
              v-if="isCorrect"
              class="result-answer-item__main__content__question"
            >
              <img src="~/assets/icons/check-circle-green.svg" />
              <div class="option-text correct-answer">
                {{ correctFieldMarking }}
              </div>
            </div>
            <template v-else>
              <div class="result-answer-item__main__content__question">
                <img src="~/assets/icons/close-circle-wrong.svg" />
                <div class="option-text wrong-answer">
                  {{ answerFieldMarking }}
                </div>
              </div>
              <div class="result-answer-item__main__content__question">
                <img src="~/assets/icons/check-circle-green.svg" />
                <div class="option-text correct-answer">
                  {{ correctFieldMarking }}
                </div>
              </div>
            </template>
          </template>

          <template v-if="type === 'number'">
            <div
              v-if="isCorrect"
              class="result-answer-item__main__content__question"
            >
              <img src="~/assets/icons/check-circle-green.svg" />
              <div class="option-text correct-answer">
                {{ correctAnswerValue }}
              </div>
            </div>
            <template v-else>
              <div class="result-answer-item__main__content__question">
                <img src="~/assets/icons/close-circle-wrong.svg" />
                <div class="option-text wrong-answer">
                  {{ answerItem.answer.value }}
                </div>
              </div>
              <div class="result-answer-item__main__content__question">
                <img src="~/assets/icons/check-circle-green.svg" />
                <div class="option-text correct-answer">
                  {{ correctAnswerValue }}
                </div>
              </div>
            </template>
          </template>

          <template v-if="false">
            <div class="result-answer-item__main__content__question">
              <img src="~/assets/icons/check-circle-green.svg" />
              <div class="option-text correct-answer">Correct answer</div>
            </div>
            <div class="result-answer-item__main__content__question">
              <img src="~/assets/icons/close-circle-wrong.svg" />
              <div class="option-text wrong-answer">Wrong answer</div>
            </div>
            <div class="result-answer-item__main__content__question">
              <img src="~/assets/icons/circle.svg" />
              <div class="option-text another-option">Another option</div>
            </div>
            <div class="result-answer-item__main__content__question last-item">
              <img src="~/assets/icons/circle.svg" />
              <div class="option-text another-option">Another option</div>
            </div>
          </template>
        </div>
        <div v-if="false" class="result-answer-item__main__content__button">
          <Button
            label="Report a mistake"
            type="tertiary"
            size="large"
            icon="flag"
            position="right"
            width="193px"
            height="40px"
            padding-top="8px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/ui/buttons/Button";

export default {
  name: "ResultAnswerItem",
  components: {
    Button,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    answerItem: {
      type: Object,
      required: true,
      default: null,
    },
    selectedQuestionId: {
      type: Number,
      required: true,
      default: 0,
    },
    wrongOnly: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    show() {
      if (this.wrongOnly === false) {
        return true;
      }
      return !this.answerItem.isSuccess;
    },
    isCorrect() {
      return this.answerItem.isSuccess;
    },
    icon() {
      return this.isCorrect
        ? require("~/assets/icons/check-circle.svg")
        : require("~/assets/icons/close-circle-black.svg");
    },
    type() {
      return this.answerItem.type;
    },
    answers() {
      return this.answerItem.possibleAnswers;
    },
    sortedAnswers() {
      const answers = [];
      for (let i = 1; i <= this.correctAnswer.length; i++) {
        for (let j = 0; j <= this.correctAnswer.length; j++) {
          try {
            const index = this.correctAnswer[j].value;
            if (index === i) {
              answers.push(this.possibleAnswers[j]);
            }
          } catch (e) {}
        }
      }
      return answers;
    },
    answerFieldMarking() {
      if (typeof this.answerItem.answer.value === "object") {
        return this.answerItem.answer.value.join(", ");
      }
      return "-";
    },
    correctAnswer() {
      return this.answerItem.correctAnswer.choices;
    },
    answerMoveResult() {
      return (item) => {
        if (item === "1-0" || item === "A") {
          return "Bílý vyhraje";
        }
        if (item === "0-1" || item === "C") {
          return "Černý vyhraje";
        }
        return "Remíza";
      };
    },
    filteredAnswer() {
      return (val) => {
        const regex = /^p([a-z][1-8]-[a-z][1-8][A-Z]?)$/;
        const match = regex.exec(val);
        if (match === null) {
          return val;
        }
        return match[1];
      };
    },
    correctAnswerValue() {
      return this.filteredAnswer(this.answerItem.correctAnswer.value);
    },
    correctAnswerMove() {
      return this.answerItem.correctAnswer.rightField;
    },
    correctAnswerMoveResult() {
      return `${this.answerMoveResult(
        this.answerItem.correctAnswer.value[1]
      )} ${this.filteredAnswer(this.answerItem.correctAnswer.value[0])}`;
    },
    correctFieldMarking() {
      if (typeof this.answerItem.correctAnswer.value === "object") {
        return this.answerItem.correctAnswer.value.join(", ");
      }
      return this.answerItem.correctAnswer.value;
    },
    possibleAnswers() {
      return this.answerItem.possibleAnswers;
    },
    isMultipleChoicesAnswerCorrect() {
      return (answer, index) => {
        const selected = this.answerItem.answer.value.includes(answer.value);
        return this.correctAnswer[index].value === "ANO" && selected;
      };
    },
    isMultipleChoicesAnswerEmpty() {
      return (answer, index) => {
        const selected = this.answerItem.answer.value.includes(answer.value);
        return this.correctAnswer[index].value === "NE" && !selected;
      };
    },
    isSortCorrect() {
      return (answer, index) => {
        if (!answer) {
          return false;
        }
        return this.answerItem.answer.value[index] === answer.value;
      };
    },
    charToInt() {
      return (char) => char.charCodeAt(0) - 64;
    },
  },
  mounted() {
    console.log(this.answerItem);
  },
  methods: {
    selectQuestion(answerItem) {
      this.$emit("select-question", answerItem);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/tests/result-answer-item";
</style>
