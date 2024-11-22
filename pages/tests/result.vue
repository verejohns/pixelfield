<template>
  <div class="tests-result">
    <div class="tests-result__top">
      <div class="tests-result__guidance">
        <div class="tests-result__guidance__link" @click="back">
          <img src="~/assets/icons/left-arrow-white.svg" />
          <div class="tests-result__guidance__text">{{ breadcrumbs }}</div>
        </div>
      </div>
    </div>
    <div class="tests-result__content">
      <div class="tests-result__description">
        <div class="tests-result__description__text">
          <div class="tests-result__description__title">
            {{ $t("test_complete") }}
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
            @click="handleTryAgain"
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
      <div
        v-if="showModal && modalData.length > 0"
        class="tests-result__title view-margin-top-20"
      >
        {{ $t("my_achievements") }}
      </div>
      <div v-if="showModal && modalData.length > 0">
        <RewardTile
          v-for="(reward, i) in modalData"
          :key="`reward_${i}`"
          :data="reward"
        />
      </div>
      <div v-if="false" class="tests-result__compare">
        <div v-if="resultData.length > 0" class="tests-result__title">
          {{ $t("compare_results") }}
        </div>
        <div
          v-if="user.paid && user.registered && resultData.length > 0"
          class="tests-result__compare__content"
        >
          <ShortResult
            v-for="(item, key) in resultData"
            :key="key"
            :result="item"
          />
        </div>
        <div
          v-if="!user.paid && user.registered"
          class="tests-result__compare__content"
        >
          <Subscribe :subscribe="subscribe" :column="2" />
          <!-- <ShortResult :result="results[1]" /> -->
        </div>
        <Subscribe
          v-if="!user.registered"
          :column="1"
          :subscribe="subscribeUnRegistered"
        />
      </div>
    </div>
    <div class="tests-result__review">
      <div class="tests-result__review__title">
        <div class="tests-result__title">{{ $t("review_answers") }}</div>
      </div>
      <ResultTab />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import results from "~/mixins/results";
import ShortResultContent from "~/components/tests/ShortResultContent";
import Button from "~/components/ui/buttons/Button";
import ShortResult from "~/components/tests/ShortResult";
import Subscribe from "~/components/tests/Subscribe";
import ResultTab from "~/components/tests/ResultTab";
import RewardTile from "~/components/tests/RewardTile.vue";
// import RewardModal from "~/components/reward/RewardModal.vue";

export default {
  name: "TestsResult",
  components: {
    ShortResultContent,
    RewardTile,
    Button,
    ShortResult,
    Subscribe,
    ResultTab,
    // RewardModal,
  },
  auth: false,
  mixins: [results],
  async asyncData({ app, params, store, query }) {
    try {
      if (Object.keys(query).includes("result_id")) {
        await store.dispatch("result/fetchResultsById", query.result_id);
      } else {
        const resultId = store.getters["tests/resultId"];
        await store.dispatch("result/fetchResults", {
          testId: store.state.tests.testId,
          resultId,
        });
      }
    } catch (e) {
      console.log("Error", e);
    }
    return { rawCurrent: store.state.result.results.current };
  },
  data() {
    return {
      userSeenModal: false,
      user: {
        paid: true,
        registered: true,
      },
      subscribeUnRegistered: {
        image: "category3.png",
        content: "Sign up to compare results.",
        button: "Sign up",
      },
      subscribe: {
        image: "unpaid.png",
        content: "Subscribe to a full membership to see your best result!",
        button: "Subscribe",
      },
    };
  },
  computed: {
    result() {
      return this.currentResult;
    },
    resultData() {
      if (
        this.lastResult !== null &&
        this.lastResult.id !== this.currentResult.id
      ) {
        return [this.bestResult, this.lastResult];
      } else if (
        this.bestResult !== null &&
        this.bestResult.id !== this.currentResult.id
      ) {
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
    showModal() {
      return (
        this.rawCurrent.rewardCompetition ||
        this.rawCurrent.rewardEachSuccessTest ||
        this.rawCurrent.rewardFirstSuccessTest ||
        this.rawCurrent.rewardFirstSuccessTest_100
      );
    },
    modalData() {
      const results = [];
      if (this.rawCurrent.rewardCompetition) {
        results.push({
          message: {
            title: this.$t("well_done"),
            text: this.$t("reward_challenge", [1, 1]),
          },
          diamonds: 1,
          coins: 1,
        });
      }
      if (this.rawCurrent.rewardFirstSuccessTest) {
        results.push({
          message: {
            title: this.$t("great_job"),
            text: this.$t("reward_first_test"),
          },
          diamonds: 0,
          coins: 3,
        });
      }
      if (this.rawCurrent.rewardFirstSuccessTest_100) {
        results.push({
          message: {
            title: this.$t("great_job"),
            text: this.$t("reward_first_test_100"),
          },
          diamonds: 0,
          coins: 3,
        });
      }
      if (this.rawCurrent.rewardEachSuccessTest) {
        results.push({
          message: {
            title: this.$t("great_job"),
            text: this.$t("reward_each_test"),
          },
          diamonds: 0,
          coins: 1,
        });
      }
      return results;
    },
    breadcrumbs() {
      let crumbs = "";
      if (this.whereWasUserBefore === "detail") {
        crumbs = localStorage["test-detail-name"];
      } else if (this.whereWasUserBefore === "category") {
        crumbs = localStorage["test-category-name"];
      } else if (this.whereWasUserBefore === "serie") {
        crumbs = localStorage["test-serie-name"];
      } else if (this.whereWasUserBefore === "series") {
        crumbs = this.$t("tests");
      } else if (this.whereWasUserBefore === "final-test") {
        crumbs = this.$t("training_plan");
      } else if (this.whereWasUserBefore === "profile") {
        crumbs = this.$t("profile");
      } else if (this.whereWasUserBefore === "competition") {
        crumbs = this.$t("competition_details");
      }
      return crumbs;
    },
    whereWasUserBefore() {
      const category = this.$route.query.category;
      const serie = this.$route.query.serie;
      const id = this.$route.query.id;
      const trainingPlan =
        this.$route.query.planId || this.$route.query.finalTest;
      const competition = this.$route.query.competitionId;
      const profile = this.$route.query.backTo === "profile";
      return category && serie && id
        ? "detail"
        : serie && category
        ? "category"
        : serie
        ? "serie"
        : trainingPlan
        ? "final-test"
        : profile
        ? "profile"
        : competition
        ? "competition"
        : "series";
    },
  },
  mounted() {
    this.$auth.fetchUser();
    setTimeout(() => {
      if (this.$route.query.themeId && this.$route.query.planId) {
        if (this.currentResult.star >= 2) {
          this.$store.dispatch(
            "trainingPlans/toggleCompletedTask",
            this.$route.query.themeId
          );
        }
      }
    }, 1000);
  },
  methods: {
    handleTryAgain() {
      let params = "";
      if (this.$route.query.competitionId) {
        params = `&competition=${this.$route.query.competitionId}`;
      } else if (this.$route.query.themeId && this.$route.query.planId) {
        params = `&themeId=${this.$route.query.themeId}&planId=${this.$route.query.planId}`;
      }
      this.$router.push(
        `/tests/board?test=${this.$store.state.tests.testId}${params}`
      );
    },
    back() {
      const category = this.$route.query.category;
      const serie = this.$route.query.serie;
      // const id = this.$route.query.id;
      const trainingPlan =
        this.$route.query.finalTest || this.$route.query.planId;
      if (this.whereWasUserBefore === "detail") {
        // Client's request
        this.$router.push(`/tests?serie=${serie}&category=${category}`);
        // this.$router.push(
        //   `/tests/detail?serie=${serie}&category=${category}&id=${id}`
        // );
      } else if (this.whereWasUserBefore === "category") {
        this.$router.push(`/tests?serie=${serie}&category=${category}`);
      } else if (this.whereWasUserBefore === "serie") {
        this.$router.push(`/tests/categories?serie=${serie}`);
      } else if (this.whereWasUserBefore === "series") {
        this.$router.push("/tests/series/");
      } else if (trainingPlan) {
        this.$router.push(
          `/training-plans/detail/${this.$route.query.planId}/`
        );
      } else if (this.whereWasUserBefore === "profile") {
        this.$router.push("/profile?from=result");
      } else if (this.whereWasUserBefore === "competition") {
        this.$router.push(
          `/competitions/details/${this.$route.query.competitionId}/`
        );
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
        this.$router.push(`/tests/board?test=${this.nextTestId}`);
      }
    },
    handleRewardsModalClose(link) {
      this.userSeenModal = true;
      if (link) {
        this.$router.push(link);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/tests/tests-result";
</style>
