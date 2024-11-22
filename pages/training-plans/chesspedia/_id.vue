<template>
  <div class="article-test">
    <VideoHeader
      v-if="!planIsLoading"
      :name="plan.title"
      :question-number="step"
      :total-questions="totalSteps"
    />
    <div v-if="!planIsLoading && !postIsLoading">
      <div class="article-test__progress-container">
        <div class="article-test__progress-container__title view-hide-mobile">
          {{ plan.title }}
        </div>
        <div class="article-test__progress">
          <vue-ellipse-progress
            :progress="progress"
            font-color="white"
            :size="40"
            :legend="false"
          />
          <div class="article-test__progress__icon-spacing">
            {{ step }} / {{ totalSteps }}
          </div>
        </div>
      </div>
      <div class="article-container">
        <div class="article-container__title">{{ topicName }}</div>
        <div class="article-container__post">
          <img
            src="~/assets/images/chess_players.jpg"
            class="article-container__post__img"
          />
          <div class="article-container__post__details">
            <h1 class="article-container__post__details__header">
              {{ post.title }}
            </h1>
            <div class="article-container__post__details__category">
              {{ sectionName }}
              {{ categoryName }}
            </div>
            <span class="article-container__post__details__description">
              {{ post.description }}
            </span>
          </div>
        </div>
        <div class="article-container__post__content" v-html="post.content" />
      </div>
      <div class="end-container">
        <div class="end-container__done-button" @click="onCompleted">
          <div>{{ $t("done") }}</div>
          <img
            class="end-container__done-button__icon-spacing"
            src="~/assets/icons/check-circle-white.svg"
          />
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loading from "~/components/ui/Loading.vue";
import VideoHeader from "~/components/layout/TrainingPlanHeader.vue";
export default {
  components: {
    Loading,
    VideoHeader,
  },
  computed: {
    ...mapGetters({
      plan: "trainingPlans/trainingPlan",
      planIsLoading: "trainingPlans/trainingPlanIsLoading",
      post: "blog/article",
      postIsLoading: "blog/articleIsLoading",
    }),
    topicName() {
      return this.$route.query.topicName;
    },
    sectionName() {
      return this.post.sections[0] ? this.post.sections[0].name + "•" : "";
    },
    categoryName() {
      return this.post.categories ? this.post.categories[0].name : "";
    },
    step() {
      return Number(this.$route.query.step);
    },
    totalSteps() {
      return Number(this.$route.query.totalSteps);
    },
    progress() {
      return (this.step / this.totalSteps) * 100;
    },
  },
  mounted() {
    this.$store.dispatch(
      "trainingPlans/fetchTrainingPlan",
      Number(this.$route.query.planId)
    );
    this.$store.dispatch(
      "blog/getChesspediaArticle",
      Number(this.$route.query.blogId)
    );
  },
  methods: {
    async onCompleted() {
      await this.$store.dispatch(
        "trainingPlans/toggleCompletedTask",
        this.$route.params.id
      );
      if (!this.$route.query.planId) {
        this.$router.push("/training-plans/");
      } else {
        this.$router.push(
          `/training-plans/detail/${this.$route.query.planId}/`
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/training-plans/article";
</style>
