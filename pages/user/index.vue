<template>
  <div class="coach">
    <div class="coach__header">
      <div class="coach__header__content">
        <NuxtLink to="/" class="coach__header__link">
          <img src="~/assets/icons/left-arrow-white.svg" />
          <div class="coach__header__text">{{ $t("dashboard") }}</div>
        </NuxtLink>
        <div class="coach__header__title">{{ $t("statistics") }}</div>
      </div>
    </div>
    <Tab :tabs="tabs" @change-tab="changeTab" />
    <div v-if="loading">
      <StudyGroupTabUser v-if="tab === 'study_groups'" />
      <OverviewUser v-if="tab === 'overview'" :user="user" />
    </div>
    <Loading v-else />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loading from "~/components/ui/Loading.vue";

import Tab from "~/components/coach/Tab";
import StudyGroupTabUser from "~/components/coach/StudyGroupTabUser.vue";
import OverviewUser from "~/components/user/OverviewUser.vue";
export default {
  components: {
    Tab,
    StudyGroupTabUser,
    OverviewUser,
    Loading,
  },
  data() {
    return {
      tabs: ["overview", "study_groups"],
      tab: "overview",
    };
  },
  computed: {
    ...mapGetters({
      user: "user/user",
      userIsLoading: "user/userIsLoading",
      test: "statistics/test",
      testIsLoading: "statistics/testIsLoading",
      learning: "statistics/learning",
      learningIsLoading: "statistics/learningIsLoading",
      study: "statistics/study",
      studyIsLoading: "statistics/studyIsLoading",
    }),
    loading() {
      return (
        !this.userIsLoading &&
        !this.testIsLoading &&
        !this.learningIsLoading &&
        !this.studyIsLoading
      );
    },
  },
  mounted() {
    this.$store.dispatch("user/fetchUserInformation");
    this.$store.dispatch("statistics/fetchTest");
    this.$store.dispatch("statistics/fetchLearning");
    this.$store.dispatch("statistics/fetchStudy");
  },
  methods: {
    changeTab(tab) {
      this.tab = tab;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/coach/coach";
</style>
