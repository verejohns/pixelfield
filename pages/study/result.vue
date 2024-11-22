<template>
  <div class="tests-result">
    <div class="tests-result__top">
      <div class="tests-result__guidance">
        <div class="tests-result__guidance__link" @click="handleBackRoute">
          <img src="~/assets/icons/left-arrow-white.svg" />
          <div class="tests-result__guidance__text">{{ breadcrumbs }}</div>
        </div>
      </div>
    </div>
    <div class="tests-result__content">
      <div class="tests-result__description">
        <div class="tests-result__description__text">
          <div class="tests-result__description__title">
            {{ $t("test_complete") }}!
          </div>
          <div class="tests-result__description__info">
            <ShortResultContent :result="result" />
          </div>
        </div>
        <div class="tests-result__description__action">
          <Button
            :label="$t('try_again')"
            type="tertiary"
            size="large"
            icon="refresh"
            position="right"
            width="100%"
            height="56px"
            padding-top="17px"
            @click="$router.back()"
          />
          <Button
            v-if="nextTestId > 0"
            :label="$t('next_test')"
            type="primary"
            size="large"
            icon="arrow-right-circle-selected"
            position="right"
            width="100%"
            height="56px"
            padding-top="20px"
            @click="goToNextTest()"
          />
        </div>
      </div>
    </div>
    <div
      v-if="currentResult && currentResult.total_success_answers > 0"
      class="rewards-section"
    >
      <div class="tests-result__title view-margin-top-20">
        {{ $t("my_achievements") }}
      </div>
      <RewardTile :data="modalData" />
    </div>
    <div class="tests-result__review"></div>
    <div class="tests-result__review__title">
      <div class="tests-result__title">{{ $t("review_answers") }}</div>
    </div>
    <ResultTab />
  </div>
</template>

<script>
import moment from "moment";
import results from "~/mixins/results";
import ShortResultContent from "~/components/tests/ShortResultContent";
import Button from "~/components/ui/buttons/Button";
import ResultTab from "~/components/tests/ResultTab";
import RewardTile from "~/components/tests/RewardTile.vue";

export default {
  name: "TestsResult",
  components: {
    ShortResultContent,
    Button,
    ResultTab,
    RewardTile,
  },
  auth: false,
  mixins: [results],
  async asyncData({ app, params, store }) {
    const resultId = store.getters["tests/resultId"];
    await store.dispatch("result/fetchResults", {
      testId: store.state.tests.testId,
      resultId,
    });
  },
  data() {
    return {
      user: {
        paid: true,
        registered: true,
      },
    };
  },
  computed: {
    isTrainingPlan() {
      const query = this.$route.query;
      return query.planId && query.themeId;
    },
    breadcrumbs() {
      const query = this.$route.query;
      return this.isTrainingPlan
        ? this.$t("Kurzy")
        : query.id
        ? localStorage["study-detail-name"]
        : query.category
        ? localStorage["study-category-name"]
        : query.serie
        ? localStorage["study-serie-name"]
        : this.$t("study");
    },
    result() {
      return this.currentResult;
    },
    results() {
      if (this.lastResult !== null) {
        return [this.bestResult, this.lastResult];
      } else if (this.bestResult !== null) {
        return [this.bestResult];
      } else {
        return [];
      }
    },
    nextTestId() {
      const currentTestId = this.$store.state.tests.testId;
      const categoryTests = this.$store.getters["testsList/getTests"];
      for (const index in categoryTests) {
        if (
          categoryTests[index].id === Number(currentTestId) &&
          categoryTests[Number(index) + 1] !== undefined
        ) {
          return categoryTests[Number(index) + 1].id;
        }
      }
      return -1;
    },
  },
  mounted() {
    if (this.result === null || this.result === undefined) {
      this.$router.push("/study/series/");
    }
  },
  methods: {
    handleBackRoute() {
      const query = this.$route.query;
      if (this.isTrainingPlan) {
        this.$router.push(`/training-plans/detail/${query.planId}/`);
      } else if (query.id && query.category && query.id) {
        this.$router.push(
          `/study/detail?serie=${query.serie}&category=${query.category}&id=${query.id}`
        );
      } else if (query.serie && query.category) {
        this.$router.push(
          `/study?serie=${query.serie}&category=${query.category}`
        );
      } else if (query.serie) {
        this.$router.push(`/study/categories?serie=${query.serie}`);
      } else {
        this.$router.push("/study/series/");
      }
    },
    transformDate(dateTimeString) {
      if (!dateTimeString) {
        return "-";
      }
      return moment(dateTimeString.substring(0, 10), "YYYY-MM-DD").format(
        "DD MMM YYYY"
      );
    },
    formatDuration(duration) {
      const momentDuration = moment.duration(duration);
      return moment.utc(momentDuration.as("milliseconds")).format("m:ss");
    },
    goToNextTest() {
      if (this.nextTestId > 0) {
        const study = `&study=${true}`;
        this.$router.push(`/tests/board?test=${this.nextTestId}${study}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/tests/tests-result";
</style>
