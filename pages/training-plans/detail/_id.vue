<template>
  <div>
    <Header :is-detail="!trainingPlanIsLoading" />
    <div v-if="loading" class="view-split">
      <div class="view-split__large">
        <div class="training-plan-detail__detail-card">
          <DetailTile
            :training-plan="trainingPlan"
            class="view-margin-bottom"
            :percentage="overallPercentage"
          />
        </div>
        <div class="view-tabs">
          <ThemeTab
            v-for="(theme, index) in themes"
            :key="theme.id"
            :border-bottom="index === themes.length - 1"
            :theme-details="theme"
            :total-steps="theme.topics.length"
            class="mb-24"
            :is-active="isActive(index)"
          />
        </div>
      </div>
      <div class="view-split__small view-desktop-margin-top">
        <div class="training-plan-detail__tiles">
          <div v-if="false" class="view-margin-bottom">
            <div class="training-plan-detail__heading view-margin-bottom">
              <img
                class="view-icon-spacing"
                src="~/assets/icons/whh_student.svg"
              />
              <div>{{ $t("test") }}</div>
            </div>
            <LearningTile />
          </div>
          <div class="training-plan-detail__heading view-margin-bottom">
            <Favourites :page-name="$t('Kurzy')" :limit="true" />
          </div>
        </div>
      </div>
    </div>
    <Loading v-else :show-background="false" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "~/components/training-plan/Header.vue";
import DetailTile from "~/components/training-plan/DetailTrainingPlan.vue";
import ThemeTab from "~/components/training-plan/ThemeTab.vue";
import LearningTile from "~/components/training-plan/LearningTile.vue";
import Favourites from "~/components/sachopedie/SachopedieFavouritesTab.vue";
import Loading from "~/components/ui/Loading.vue";

export default {
  components: {
    Header,
    DetailTile,
    ThemeTab,
    LearningTile,
    Favourites,
    Loading,
  },
  computed: {
    ...mapGetters({
      trainingPlan: "trainingPlans/trainingPlan",
      trainingPlanIsLoading: "trainingPlans/trainingPlanIsLoading",
      themes: "trainingPlans/themes",
      themesIsLoading: "trainingPlans/themesIsLoading",
    }),
    loading() {
      return (
        !this.trainingPlanIsLoading &&
        !this.themesIsLoading &&
        this.themes &&
        this.trainingPlan
      );
    },
    overallPercentage() {
      return this.trainingPlan.percentage;
    },
    isActive() {
      return (index) => {
        if (index === 0) {
          return true;
        }
        return this.themes[index - 1].is_completed;
      };
    },
  },
  mounted() {
    this.$store.dispatch(
      "trainingPlans/fetchTrainingPlan",
      this.$route.params.id
    );
    this.$store.dispatch("trainingPlans/fetchThemes", this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/training-plans/detail";
</style>
