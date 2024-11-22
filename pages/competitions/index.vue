<template>
  <div class="competitions">
    <div class="competitions__header">
      <div class="competitions__header__content">
        <div class="competitions__header__content__dashboard" @click="toHome">
          <img
            class="competitions__header__content__img"
            src="~/assets/icons/left-arrow-white.svg"
          />
          {{ $t("dashboard") }}
        </div>
        <div class="competitions__header__content__title">
          {{ $t("competitions") }}
        </div>
      </div>
    </div>
    <div class="competitions__main-container">
      <div class="competitions__main-container__tabs">
        <Tab :tabs="tabs" @change-tab="selected" />
      </div>
      <div v-if="loading">
        <div
          v-for="competition in filteredCompetitions"
          :key="competition.id"
          class="competitions__main-container__competition-list"
        >
          <div v-if="shouldShowCompetition(competition)">
            <div v-if="isClosed">
              <ClosedCompetitionTile :competition="competition" />
            </div>
            <div v-else>
              <CompetitionTile
                :competition="competition"
                :button-icons="false"
                :bottom-icons="false"
                :is-play="false"
              />
            </div>
          </div>
        </div>
      </div>
      <Loading v-else />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loading from "~/components/ui/Loading.vue";
import Tab from "~/components/coach/Tab";
import CompetitionTile from "~/components/ui/CompetitionTile.vue";
import ClosedCompetitionTile from "~/components/ui/ClosedCompetitionTile.vue";

export default {
  components: { Loading, Tab, CompetitionTile, ClosedCompetitionTile },
  data() {
    return {
      isClosed: false,
      tabs: ["open", "closed"],
    };
  },
  computed: {
    ...mapGetters({
      openCompetitions: "competitions/openCompetitionData",
      openCompetitionsIsLoading: "competitions/openCompetitionDataIsLoading",
      closedCompetitions: "competitions/closedCompetitionData",
      closedCompetitionsIsLoading:
        "competitions/closedCompetitionDataIsLoading",
    }),
    shouldShowCompetition() {
      return (competition) => {
        if (competition.is_chess_to_schools) {
          return !!this.$auth.user.school;
        } else {
          return true;
        }
      };
    },
    loading() {
      return (
        (!this.isClosed && !this.openCompetitionsIsLoading) ||
        (this.isClosed && !this.closedCompetitionsIsLoading)
      );
    },
    filteredCompetitions() {
      return !this.isClosed ? this.openCompetitions : this.closedCompetitions;
    },
  },
  mounted() {
    this.$store.dispatch("competitions/fetchOpenCompetitionData");
    this.$store.dispatch("competitions/fetchClosedCompetitionData");
  },
  methods: {
    toHome() {
      this.$router.push("/");
    },
    selected(tab) {
      tab === "open" ? (this.isClosed = false) : (this.isClosed = true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/competition";
</style>
