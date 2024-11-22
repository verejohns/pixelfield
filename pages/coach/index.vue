<template>
  <div class="coach">
    <div class="coach__header">
      <div class="coach__header__content">
        <NuxtLink to="/" class="coach__header__link">
          <img src="~/assets/icons/left-arrow-white.svg" />
          <div class="coach__header__text">{{ $t("dashboard") }}</div>
        </NuxtLink>
        <div class="coach__header__title">{{ $t("coach") }}</div>
      </div>
    </div>
    <Tab :tabs="tabs" :value="selected" @change-tab="changeTab" />
    <div v-if="!coachIsLoading" class="coach__tab-container">
      <Overview
        v-if="tab === 'overview'"
        :requests="coach.requests"
        :students="coach.students"
        :study-groups="coach.groups"
        @swap="changeTab"
      />
      <StudyGroupTab
        v-else-if="tab === 'study_groups'"
        :study-groups="coach.groups"
      />
      <Students
        v-else-if="tab === 'students'"
        :requests="coach.requests"
        :students="coach.students"
      />
    </div>
    <Loading v-else />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Tab from "~/components/coach/Tab";
import Overview from "~/components/coach/Overview";
import StudyGroupTab from "~/components/coach/StudyGroupTab";
import Students from "~/components/coach/Students";
import Loading from "~/components/ui/Loading.vue";

export default {
  name: "Coach",
  components: {
    Tab,
    Overview,
    StudyGroupTab,
    Students,
    Loading,
  },
  data() {
    return {
      selected: 0,
      tabs: ["overview", "study_groups", "students"],
      tab: "overview",
    };
  },
  computed: {
    ...mapGetters({
      coach: "coach/coach",
      coachIsLoading: "coach/coachIsLoading",
    }),
  },
  mounted() {
    if (this.$auth.user.role !== "coach") {
      this.$router.push(`/user/`);
    } else {
      this.$store.dispatch("coach/fetchCoachInformation");
    }
  },
  methods: {
    changeTab(tab) {
      this.tab = tab;
    },
  },
};
</script>

<style lang="scss">
@import "assets/scss/pages/coach/coach";
</style>
