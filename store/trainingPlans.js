export const state = () => ({
  trainingPlans: null,
  trainingPlansIsLoading: true,
  trainingPlan: null,
  trainingPlanIsLoading: true,
  themes: null,
  themesIsLoading: true,
  premiumTrainingPlans: null,
  premiumTrainingPlansIsLoading: true,
  premiumTrainingPlan: null,
  premiumTrainingPlanIsLoading: true,
  themeTabs: {},
});

export const mutations = {
  setThemes(state, themes) {
    state.themes = themes;
  },
  setThemesIsLoading(state, isLoading) {
    state.themesIsLoading = isLoading;
  },
  setTrainingPlans(state, trainingPlans) {
    state.trainingPlans = trainingPlans;
  },
  setTrainingPlansIsLoading(state, isLoading) {
    state.trainingPlansIsLoading = isLoading;
  },
  addThemeTab(state, id) {
    state.themeTabs[id] = false;
  },
  toggleThemeTabOpen(state, id) {
    state.themeTabs[id] = !state.themeTabs[id];
  },
  setTrainingPlan(state, trainingPlan) {
    state.trainingPlan = trainingPlan;
  },
  setTrainingPlanIsLoading(state, isLoading) {
    state.trainingPlanIsLoading = isLoading;
  },
  setPremiumTrainingPlans(state, premiumTrainingPlans) {
    state.premiumTrainingPlans = premiumTrainingPlans;
  },
  setPremiumTrainingPlansIsLoading(state, isLoading) {
    state.premiumTrainingPlansIsLoading = isLoading;
  },
  setPremiumTrainingPlan(state, premiumPlan) {
    state.premiumTrainingPlan = premiumPlan;
  },
  setPremiumTrainingPlanIsLoading(state, isLoading) {
    state.premiumTrainingPlanIsLoading = isLoading;
  },
};

export const actions = {
  async toggleCompletedTask(context, taskId) {
    return await this.$axios.$post(
      `/api/chess/training-plan/topic/${taskId}/done/`
    );
  },
  async fetchThemes(context, trainingPlanId) {
    context.commit("setThemesIsLoading", false);
    const themes = await this.$axios.$get(
      `/api/chess/training-plan/plan/${trainingPlanId}/themes/`
    );
    const sortedThemes = themes.results.map((theme) => {
      const t = theme.topics
        .sort((a, b) => b.admin_priority - a.admin_priority)
        .sort((a) => (a.final_test ? 1 : -1));
      return {
        ...theme,
        topics: t,
      };
    });
    context.commit("setThemes", sortedThemes);
    context.commit("setThemesIsLoading", false);
  },
  async fetchTrainingPlan(context, trainingPlanId) {
    context.commit("setTrainingPlanIsLoading", true);
    const trainingPlan = await this.$axios.$get(
      `/api/chess/training-plan/plan/${trainingPlanId}/`
    );
    context.commit("setTrainingPlan", trainingPlan);
    context.commit("setTrainingPlanIsLoading", false);
  },
  async fetchPremiumTrainingPlan(context, trainingPlanId) {
    context.commit("setPremiumTrainingPlanIsLoading", true);
    const premiumTrainingPlan = await this.$axios.$get(
      `/api/chess/training-plan/premium-plan/${trainingPlanId}/`
    );
    context.commit("setPremiumTrainingPlan", premiumTrainingPlan);
    context.commit("setPremiumTrainingPlanIsLoading", false);
  },
  async fetchPremiumTrainingPlans(context) {
    context.commit("setPremiumTrainingPlansIsLoading", true);
    const premiumTrainingPlans = await this.$axios.$get(
      "/api/chess/training-plan/premium-plans/"
    );
    context.commit("setPremiumTrainingPlans", premiumTrainingPlans);
    context.commit("setPremiumTrainingPlansIsLoading", false);
  },
  async fetchTrainingPlans(context) {
    context.commit("setTrainingPlansIsLoading", true);
    const trainingPlans = await this.$axios.$get(
      "/api/chess/training-plan/plans/"
    );
    context.commit("setTrainingPlans", trainingPlans);
    context.commit("setTrainingPlansIsLoading", false);
  },
  cleanTrainingPlans(context) {
    context.commit("setTrainingPlans", null);
    context.commit("setPremiumTrainingPlans", null);
  },
};

export const getters = {
  themes(state) {
    return state.themes;
  },
  themesIsLoading(state) {
    return state.themesIsLoading;
  },
  themeTabs(state) {
    return state.themeTabs;
  },
  trainingPlan(state) {
    return state.trainingPlan;
  },
  trainingPlanIsLoading(state) {
    return state.trainingPlanIsLoading;
  },
  trainingPlans(state) {
    return state.trainingPlans;
  },
  premiumTrainingPlans(state) {
    return state.premiumTrainingPlans;
  },
  premiumTrainingPlansIsLoading(state) {
    return state.premiumTrainingPlansIsLoading;
  },
  trainingPlansIsLoading(state) {
    return state.trainingPlansIsLoading;
  },
  premiumTrainingPlan(state) {
    return state.premiumTrainingPlan;
  },
  premiumTrainingPlanIsLoading(state) {
    return state.premiumTrainingPlanIsLoading;
  },
};
