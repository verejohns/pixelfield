<template>
  <div class="result-tab">
    <div class="result-tab__tab">
      <div
        v-for="(item, index) in reviewCategories"
        :key="index"
        class="result-tab__tab__item"
        :class="selectedReviewCategory === item ? 'selectedTab' : ''"
        @click="selectCategory(item)"
      >
        {{ $t(item) }}
      </div>
    </div>
    <div class="result-tab__tab-content">
      <div v-for="(answer, key) in answers" :key="key">
        <ResultAnswerItem
          :index="key"
          :answer-item="answer"
          :selected-question-id="selectedQuestionId"
          :wrong-only="showMistakesOnly"
          @select-question="selectQuestion"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ResultAnswerItem from "~/components/tests/ResultAnswerItem";

export default {
  name: "ResultTab",
  components: {
    ResultAnswerItem,
  },
  data() {
    return {
      reviewCategories: [],
      selectedReviewCategory: "",
      answerList: [],
      selectedQuestionId: 0,
      answers: [],
    };
  },
  computed: {
    showMistakesOnly() {
      return this.selectedReviewCategory === "mistakes";
    },
  },
  mounted() {
    this.reviewCategories = ["all", "mistakes"];
    this.selectedReviewCategory = this.reviewCategories[0];
    this.answers = [];
    this.answers = this.$store.state.result.answers;
    console.log("answers here", this.answers);
  },
  methods: {
    selectCategory(reviewCategory) {
      this.selectedReviewCategory = reviewCategory;
      this.selectedQuestionId = 0;
    },
    selectQuestion(question) {
      this.selectedQuestionId =
        this.selectedQuestionId === question.id ? 0 : question.id;
      if (this.selectedQuestionId) {
        setTimeout(() => {
          const config = {
            position: "start",
          };
          if (question.fenString) {
            config.position = question.fenString;
          }
          ChessBoard(document.getElementById("board"), config);
        }, 100);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/tests/result-tab";
</style>
