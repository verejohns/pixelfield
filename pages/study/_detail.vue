<template>
  <div class="test-detail">
    <div
      class="test-detail__top"
      :style="{ backgroundColor: currentSerie.color }"
    >
      <div class="test-detail__guidance">
        <div class="test-detail__guidance__link" @click="toTests">
          <img src="~/assets/icons/left-arrow.svg" />
          <div class="test-detail__guidance__text">
            {{ currentSerie.name }} • {{ currentCategory.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="test-detail__content">
      <DetailDescription
        :test="test"
        :color="currentSerie.color"
        :is-test="false"
      />
      <div class="test-detail__sachopedie">
        <div class="test-detail__title">
          <img src="~/assets/icons/book.svg" />
          <div>{{ $t("sachopedie") }}</div>
        </div>
        <Sachopedie :sachopedie="sachopedie" />
      </div>
    </div>
  </div>
</template>

<script>
import { convertSnakeToCamel } from "~/utils/convertSnakeToCamel";
import results from "~/mixins/results";
import DetailDescription from "~/components/tests/DetailDescription";
import Sachopedie from "~/components/tests/Sachopedie";

export default {
  name: "TestDetail",
  components: {
    DetailDescription,
    Sachopedie,
  },
  auth: false,
  mixins: [results],
  async asyncData({ app, params, route, store, query }) {
    await store.dispatch("result/fetchResults", {
      testId: query.id,
    });
    const testDetail = convertSnakeToCamel(
      await store.dispatch("studyList/fetchTestDetail", query.id)
    );
    if (store.state.studyList.series.length === 0) {
      await store.dispatch("studyList/fetchSeries");
    }
    if (store.state.studyList.categories.length === 0) {
      await store.dispatch("studyList/fetchCategories", query.serie);
    }
    return {
      test: {
        id: testDetail.id,
        number: testDetail.id,
        selected: testDetail.completionStatus,
        title: testDetail.title,
        content: testDetail.description,
        review: testDetail.description.bestStarResult,
        question: testDetail.numOfQuestions,
        duration: testDetail.duration,
        difficulty: testDetail.difficulty,
      },
    };
  },
  data() {
    return {
      user: {
        paid: true,
      },
      sachopedie: {
        title: "Mat",
        content: "Secondary line text goes here Secondary line text goes here",
        button: "Learn more",
        image: "learn.png",
      },
      subscribe: {
        image: "unpaid.png",
        content: "Subscribe to a full membership to see your best result!",
        button: "Subscribe",
      },
    };
  },
  computed: {
    currentSerie() {
      if (this.$route.query.serie !== undefined) {
        return this.$store.state.studyList.series.find(
          (item) => item.id === Number(this.$route.query.serie)
        );
      }
      return null;
    },
    currentCategory() {
      if (this.$route.query.category !== undefined) {
        return this.$store.state.studyList.categories.find(
          (item) => item.id === Number(this.$route.query.category)
        );
      }
      return null;
    },
    results() {
      if (this.currentResult !== null) {
        return [this.bestResult, this.currentResult];
      } else if (this.bestResult !== null) {
        return [this.bestResult];
      } else {
        return [];
      }
    },
  },
  methods: {
    toTests() {
      this.$router.push(
        `/study?serie=${this.$route.query.serie}&category=${this.$route.query.category}`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/tests/test-detail";
</style>
