<template>
  <div class="main-container">
    <div class="main-container__divider">
      <div class="main-container__header">{{ $t("my_stats") }}</div>
      <div class="main-container__view-all">{{ $t("view_all") }}</div>
    </div>

    <div class="main-container__info-card">
      <InfoCard :data="test_data" class="view-margin-top-16" :is-test="true" />
      <InfoCard :data="learning_data" :is-learning="true" />
      <InfoCard :data="study_data" :is-time="true" />
    </div>
    <div
      v-if="openedStudies.length"
      class="main-container__header view-margin-bottom-24"
    >
      {{ $t("lessons") }}
    </div>
    <TestItem
      v-for="(lesson, index) in openedStudies"
      :key="`lesson-${lesson.id}`"
      :test="lesson"
      :is-test="false"
      :index="index + 1"
    />
    <div
      v-if="completedTasks.length"
      class="main-container__divider view-margin-bottom-24 view-margin-top-16"
    >
      <div class="main-container__header">{{ $t("completed_tasks") }}</div>
      <NuxtLink to="/user/completed-tasks" class="main-container__view-all">
        {{ $t("view_all") }}
      </NuxtLink>
    </div>
    <PreviousTask
      v-for="(test, index) in completedTasks.slice(0, 4)"
      :key="`task_${test.id}`"
      :number="index"
      :is-test="true"
      :task-id="test.id"
      :title="test.title"
      :minutes="String(test.duration)"
      :date="'20/08/2000'"
      :stars="test.best_star_result"
      :points="String(test.max_points)"
      :is-completed="true"
    />
  </div>
</template>

<script>
import InfoCard from "~/components/stats/InformationCard.vue";
import PreviousTask from "~/components/ui/PreviousTask.vue";
import TestItem from "~/components/tests/TestItem.vue";

export default {
  components: { InfoCard, TestItem, PreviousTask },
  data() {
    return {
      currentIdx: 0,
    };
  },
  computed: {
    completedTasks() {
      const tasks = [];
      for (let i = 0; i < this.completedTests.length; i++) {
        tasks.push(this.completedTests[i]);
      }
      for (let i = 0; i < this.completedCompetitions.length; i++) {
        tasks.push(this.completedCompetitions[i]);
      }
      for (let i = 0; i < this.completedStudies.length; i++) {
        tasks.push(this.completedStudies[i]);
      }
      return tasks;
    },
    test_data() {
      return this.$store.state.statistics.test;
    },
    learning_data() {
      return this.$store.state.statistics.learning;
    },
    study_data() {
      return this.$store.state.statistics.study;
    },
    completedTests() {
      return this.$auth.user.completed_tests;
    },
    completedCompetitions() {
      return this.$auth.user.completed_competitions;
    },
    completedStudies() {
      return this.$auth.user.completed_studies;
    },
    openedStudies() {
      return this.$auth.user.opened_studies;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/user/overview";
</style>
