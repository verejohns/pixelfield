<template>
  <div
    class="main-container"
    :class="borderBottom ? 'main-container__last-theme' : ''"
  >
    <div class="main-container__row" @click="switchExpand">
      <div class="main-container__title">{{ themeDetails.title }}</div>
      <div class="main-container__chevron">
        <img :src="expanded" />
      </div>
    </div>
    <div v-if="isExpanded" class="dropdown">
      <div class="view-flex">
        <div class="main-container__percentage">
          {{ calcPercentage }}
        </div>
        <div class="progress-bar">
          <div class="progress-bar__fill" :style="{ width: calcPercentage }" />
        </div>
      </div>
      <div v-for="(topic, idx) in themeDetails.topics" :key="topic.id">
        <div v-if="topic.is_completed && !topic.final_test">
          <CompletedCard
            :topic="topic"
            :position="idx + 1"
            @canPlayThisTheme="canPlayThisTheme"
          />
        </div>
        <div v-else-if="topic.final_test">
          <FinalTestCard :topic="topic" :is-active="isActive" />
        </div>
        <div v-else>
          <StepCard
            :topic="topic"
            :position="idx + 1"
            :is-active="isActive"
            @canPlayThisTheme="canPlayThisTheme"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompletedCard from "~/components/training-plan/CompletedCard.vue";
import StepCard from "~/components/training-plan/StepAvailableCard.vue";
import FinalTestCard from "~/components/training-plan/TestAvailableCard.vue";
export default {
  components: {
    CompletedCard,
    StepCard,
    FinalTestCard,
  },
  props: {
    themeDetails: {
      type: Object,
      required: true,
    },
    totalSteps: {
      type: Number,
      required: true,
    },
    borderBottom: {
      type: Boolean,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isExpanded: null,
    };
  },
  computed: {
    calcPercentage() {
      return Math.round(this.themeDetails.percentage) + "%";
    },
    expanded() {
      return !this.isExpanded
        ? require("~/assets/icons/chevron-down.svg")
        : require("~/assets/icons/chevron-up.svg");
    },
  },
  mounted() {
    if (
      this.$store.getters["trainingPlans/themeTabs"][this.themeDetails.id] ===
      null
    ) {
      this.$store.commit("trainingPlans/addThemeTab", this.themeDetails.id);
    }
    this.isExpanded =
      this.$store.getters["trainingPlans/themeTabs"][this.themeDetails.id];
  },
  methods: {
    switchExpand() {
      this.$store.commit(
        "trainingPlans/toggleThemeTabOpen",
        this.themeDetails.id
      );
      this.isExpanded =
        this.$store.getters["trainingPlans/themeTabs"][this.themeDetails.id];
    },
    canPlayThisTheme({ type, id, parameter, step, topicName }) {
      if (!this.isActive) {
        return false;
      }
      if (type === "video") {
        this.$router.push(
          `/training-plans/video/${id}/?planId=${this.$route.params.id}&videoId=${parameter}&topicName=${topicName}&step=${step}&totalSteps=${this.totalSteps}`
        );
      } else if (type === "chesspedia") {
        this.$router.push(
          `/training-plans/chesspedia/${id}/?planId=${this.$route.params.id}&blogId=${parameter}&topicName=${topicName}&step=${step}&totalSteps=${this.totalSteps}`
        );
      } else if (type === "test") {
        this.$router.push(
          `/tests/board?test=${parameter}&planId=${this.$route.params.id}&themeId=${id}`
        );
      } else if (type === "lesson") {
        const study = `&study=${true}`;

        this.$router.push(
          `/tests/board?test=${parameter}&planId=${this.$route.params.id}&themeId=${id}${study}`
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/training-plan/theme-tab";
</style>
