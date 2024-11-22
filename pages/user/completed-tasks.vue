<template>
  <div class="completed-tasks">
    <div class="completed-tasks__header">
      <div class="completed-tasks__header__content">
        <div class="completed-tasks__header__top">
          <NuxtLink to="/user" class="completed-tasks__header__link">
            <img src="~/assets/icons/left-arrow-white.svg" />
            <div class="completed-tasks__header__text">
              {{ $t("dashboard") }}
            </div>
          </NuxtLink>
          <span class="completed-tasks__header__top__point">•</span>
          <NuxtLink to="/user" class="completed-tasks__header__link">
            <div class="completed-tasks__header__text">{{ $t("study") }}</div>
          </NuxtLink>
        </div>
        <div class="completed-tasks__header__title">
          {{ $t("completed_tasks") }}
        </div>
      </div>
    </div>
    <div class="completed-tasks__content">
      <div class="completed-tasks__content__top">
        <div class="completed-tasks__content__title">
          {{ $t("past_activities") }}
        </div>
        <Sort :direction="direction" @sort="sort" />
      </div>
      <div class="completed-tasks__content__main">
        <PreviousTask
          v-for="test in completedTests"
          :key="`test_${test.id}`"
          :number="getIndex"
          :is-test="true"
          :task-id="test.id"
          :title="test.title"
          :minutes="Number(test.duration)"
          :date="'20/08/2000'"
          :stars="test.best_star_result"
          :points="Number(test.max_points)"
          :is-completed="true"
        />
        <PreviousTask
          v-for="test in completedCompetitions"
          :key="`competition_${test.id}`"
          :is-test="true"
          :task-id="test.id"
          :title="test.title"
          :minutes="Number(test.duration)"
          :date="'20/08/2000'"
          :stars="test.best_star_result"
          :number="getIndex"
          :points="Number(test.max_points)"
          :is-completed="true"
        />
        <PreviousTask
          v-for="test in completedStudies"
          :key="`study_${test.id}`"
          :is-test="true"
          :task-id="test.id"
          :title="test.title"
          :minutes="Number(test.duration)"
          :date="'20/08/2000'"
          :stars="test.best_star_result"
          :number="getIndex"
          :points="Number(test.max_points)"
          :is-completed="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PreviousTask from "~/components/ui/PreviousTask";
import Sort from "~/components/ui/Sort";

export default {
  name: "CompletedTasks",
  components: {
    PreviousTask,
    Sort,
  },
  data() {
    return {
      currentIdx: 0,
      direction: "asc",
    };
  },
  computed: {
    completedTests() {
      return this.$auth.user.completed_tests;
    },
    completedCompetitions() {
      return this.$auth.user.completed_competitions;
    },
    completedStudies() {
      return this.$auth.user.completed_studies;
    },
    getIndex() {
      this.inc();
      return this.currentIdx;
    },
  },
  mounted() {
    if (this.$auth.user.role !== "user") {
      this.$router.push(`/`);
    }
  },
  methods: {
    inc() {
      this.currentIdx += 1;
      return this.currentIdx;
    },
    sort() {
      this.direction = this.direction === "asc" ? "desc" : "asc";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/user/completed-tasks";
</style>
