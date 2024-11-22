<template>
  <div class="video-container">
    <VideoHeader
      v-if="trainingPlanLoaded"
      :name="plan.title"
      :question-number="step"
      :total-questions="totalSteps"
    />
    <div>
      <div
        v-if="trainingPlanLoaded"
        class="video-container__progress-container"
      >
        <div
          class="video-container__progress-container__title view-hide-mobile"
        >
          {{ plan.title }}
        </div>
        <div class="video-container__progress-container__progress">
          <div class="video-container__progress">
            <vue-ellipse-progress
              :progress="progress"
              font-color="white"
              :size="40"
              :legend="false"
            />
            <div class="video-container__progress__icon-spacing">
              {{ step }} / {{ totalSteps }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="!postIsLoading" class="video">
        <div class="video__title">
          {{ post.title }}
        </div>
        <iframe
          width="100%"
          height="100%"
          :src="getVideo"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <div class="video__caption">{{ post.description }}</div>
      </div>
      <Loading v-else :show-background="false" />
      <div class="end-container">
        <div class="end-container__done-button" @click="taskComplete">
          <div>{{ $t("done") }}</div>
          <img
            class="end-container__done-button__icon-spacing"
            src="~/assets/icons/check-circle-white.svg"
          />
        </div>
      </div>
    </div>
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
      post: "blog/post",
      postIsLoading: "blog/postIsLoading",
    }),
    plan() {
      return this.trainingPlanLoaded
        ? this.$store.state.trainingPlans.trainingPlan
        : "";
    },
    trainingPlanLoaded() {
      return this.$store.state.trainingPlans.trainingPlan;
    },
    topicName() {
      return this.$route.query.topicName;
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
    videoId() {
      return this.$route.query.videoId;
    },
    getVideo() {
      return String(this.post.video_link).replace("watch?v=", "embed/");
    },
  },
  mounted() {
    console.log(this.post);
    console.log(this.$store.state.trainingPlans);
  },
  created() {
    this.$store.dispatch(
      "trainingPlans/fetchTrainingPlan",
      this.$route.query.planId
    );
    this.$store.dispatch("blog/getPost", this.videoId);
  },
  methods: {
    async taskComplete() {
      this.$store.dispatch("trainingPlans/fetchTrainingPlans");
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

<style lang="scss">
@import "~/assets/scss/pages/training-plans/video";
</style>
