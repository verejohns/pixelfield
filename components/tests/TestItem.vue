<template>
  <div class="test-item">
    <div class="test-item__left" @click="showDetail(test.id)">
      <div class="test-item__left__main">
        <div class="test-item__left__number">
          <div class="test-item__left__number__text">
            {{ index }}
          </div>
          <img
            v-if="test.selected === status.COMPLETED"
            src="~/assets/icons/completed.svg"
          />
          <img
            v-else-if="test.selected === status.UNFINISHED"
            src="~/assets/icons/unfinished.svg"
          />
          <img v-else src="~/assets/icons/notstarted.svg" />
        </div>
        <div class="test-item__left__title">
          <div class="test-item__left__title__text">
            {{ test.title }}
          </div>
          <div v-if="isTest" class="test-item__left__title__review">
            <img
              v-for="indexColor in test.review"
              :key="indexColor"
              src="~/assets/icons/star-color.svg"
            />
            <img
              v-for="indexNonColor in 3 - test.review"
              :key="indexNonColor"
              src="~/assets/icons/star-noncolor.svg"
            />
          </div>
        </div>
      </div>
      <div class="test-item__left__secondary">
        <div class="test-item__info">
          <div v-if="isTest" class="desktop">
            {{ $tc("questions", test.question, { count: test.question }) }}
          </div>
          <div v-else class="desktop">
            {{ $tc("comments_l", test.question, { count: test.question }) }}
          </div>
          <div class="test-item__point desktop">•</div>
          <div class="test-item__duration">{{ test.duration }} min</div>
        </div>
        <div v-if="isTest" class="test-item__left__difficulty">
          <img
            v-if="test.difficulty === difficulty.EASY"
            height="16"
            width="16"
            src="~/assets/icons/easy.svg"
          />
          <img
            v-if="test.difficulty === difficulty.MEDIUM"
            height="16"
            width="16"
            src="~/assets/icons/medium.svg"
          />
          <img
            v-if="test.difficulty === difficulty.HARD"
            height="16"
            width="16"
            src="~/assets/icons/hard.svg"
          />
          <div class="test-item__left__difficulty__text hide-mobile">
            {{ $t(test.difficulty.toLowerCase()) }}
          </div>
        </div>
      </div>
    </div>
    <div class="test-item__right" @click="toLessonTest">
      {{ isTest ? $t("play") : $t("open") }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TestItem",
  props: {
    test: {
      type: Object,
      required: true,
      default: null,
    },
    currentSerie: {
      type: Object,
      default: null,
    },
    index: {
      type: Number,
      required: true,
    },
    currentCategory: {
      type: Object,
      default: null,
    },
    isTest: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      status: {
        COMPLETED: "completed",
        NOTSTARTED: "not started",
        UNFINISHED: "in progress",
      },
      difficulty: {
        EASY: "easy",
        MEDIUM: "medium",
        HARD: "hard",
      },
    };
  },
  computed: {
    question() {
      return this.test.question
        ? this.test.question
        : this.test.num_of_questions
        ? this.test.num_of_questions
        : 0;
    },
    pad() {
      return this.test.number.toString().padStart(2, "0");
    },
    moduleName() {
      if (this.$route.name.includes("study-series")) return "study";
      else return "tests";
    },
  },
  methods: {
    toLessonTest() {
      let params = "";
      if (!this.isTest) {
        params = "&study=true";
      }
      this.$router.push(
        `/tests/board?test=${this.test.id}&serie=${this.$route.query.serie}&category=${this.$route.query.category}${params}`
      );
    },
    showDetail(id) {
      if (this.currentSerie && this.currentCategory) {
        const query = this.isTest ? "tests" : "study";
        localStorage.setItem(
          this.isTest ? "test-detail-name" : "study-detail-name",
          this.test.title
        );
        this.$router.push(
          `/${query}/detail?serie=${this.currentSerie.id}&category=${this.currentCategory.id}&id=${id}`
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/tests/test-item";
</style>
