<template>
  <div class="training-plans">
    <Header />
    <div v-if="loading" class="training-plans__content">
      <div>
        <TrainingPlanTile
          v-for="plan in accessiblePlans"
          :key="plan.id"
          :training-plan="plan"
        />
        <div class="training-plans__heading">
          <img src="~/assets/icons/black-chess-piece.svg" />
          <div class="training-plans__heading__text">
            {{ $t("Premium Kurzy") }}
          </div>
        </div>
        <TrainingPlanTile
          v-for="premium in inAccessiblePlans"
          :key="`premium-${premium.id}`"
          :training-plan="premium"
        />
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TrainingPlanTile from "~/components/training-plan/TrainingPlanTile.vue";
import Header from "~/components/training-plan/Header.vue";
import Loading from "~/components/ui/Loading.vue";

export default {
  name: "TrainingPlansIndex",
  components: { Header, TrainingPlanTile, Loading },
  data() {
    return {
      boughtPlans: [],
    };
  },
  computed: {
    ...mapGetters({
      trainingPlans: "trainingPlans/trainingPlans",
      trainingPlansIsLoading: "trainingPlans/trainingPlansIsLoading",
      premiumTrainingPlans: "trainingPlans/premiumTrainingPlans",
      premiumTrainingPlansIsLoading:
        "trainingPlans/premiumTrainingPlansIsLoading",
      themes: "trainingPlans/themes",
      themesIsLoading: "trainingPlans/themesIsLoading",
    }),
    loading() {
      return (
        !this.trainingPlansIsLoading && !this.premiumTrainingPlansIsLoading
      );
    },
    accessiblePlans() {
      const accessiblePlans = [];
      for (let i = 0; i < this.trainingPlans.results.length; i++) {
        const trainingPlan = this.trainingPlans.results[i];
        console.log("trainingPlan A", trainingPlan);
        accessiblePlans.push(trainingPlan);
      }
      for (let i = 0; i < this.premiumTrainingPlans.results.length; i++) {
        const trainingPlan = this.premiumTrainingPlans.results[i];
        console.log("trainingPlan B", trainingPlan);
        if (trainingPlan.is_bought === true) {
          accessiblePlans.push(trainingPlan);
        }
      }
      return accessiblePlans;
    },
    inAccessiblePlans() {
      const inAccessiblePlans = [];
      for (let i = 0; i < this.premiumTrainingPlans.results.length; i++) {
        const trainingPlan = this.premiumTrainingPlans.results[i];
        if (trainingPlan.is_bought === false) {
          inAccessiblePlans.push(trainingPlan);
        }
      }
      return inAccessiblePlans;
    },
  },
  mounted() {
    this.$store.dispatch("trainingPlans/fetchTrainingPlans");
    this.$store.dispatch("trainingPlans/fetchPremiumTrainingPlans");
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/training-plans/index";
</style>
