export const state = () => ({
  openCompetitionData: null,
  openCompetitionDataIsLoading: true,
  closedCompetitionData: null,
  closedCompetitionDataIsLoading: true,
});

export const mutations = {
  setOpenCompetitionData(state, data) {
    state.openCompetitionData = data;
  },
  setOpenCompetitionDataIsLoading(state, isLoading) {
    state.openCompetitionDataIsLoading = isLoading;
  },
  setClosedCompetitionData(state, data) {
    state.closedCompetitionData = data;
  },
  setClosedCompetitionDataIsLoading(state, isLoading) {
    state.closedCompetitionDataIsLoading = isLoading;
  },
};

export const actions = {
  async fetchOpenCompetitionData(context) {
    context.commit("setOpenCompetitionDataIsLoading", true);
    const competitionData = [];
    const openCompetitions = (
      await this.$axios.$get("/api/chess/competitions/opened/")
    ).results;
    const openSchoolCompetitions = (
      await this.$axios.$get("/api/chess/competitions/school/opened/")
    ).results;
    for (let i = 0; i < openCompetitions.length; i++) {
      competitionData.push(openCompetitions[i]);
    }
    for (let i = 0; i < openSchoolCompetitions.length; i++) {
      competitionData.push(openSchoolCompetitions[i]);
    }
    context.commit("setOpenCompetitionData", competitionData);
    context.commit("setOpenCompetitionDataIsLoading", false);
  },
  async fetchClosedCompetitionData(context) {
    context.commit("setClosedCompetitionDataIsLoading", true);
    const competitionData = [];

    const closedCompetitions = (
      await this.$axios.$get("/api/chess/competitions/closed/")
    ).results;
    const closedSchoolCompetitions = (
      await this.$axios.$get("/api/chess/competitions/school/closed/")
    ).results;
    for (let i = 0; i < closedCompetitions.length; i++) {
      competitionData.push(closedCompetitions[i]);
    }
    for (let i = 0; i < closedSchoolCompetitions.length; i++) {
      competitionData.push(closedSchoolCompetitions[i]);
    }
    context.commit("setClosedCompetitionData", competitionData);
    context.commit("setClosedCompetitionDataIsLoading", false);
  },
};

export const getters = {
  openCompetitionData(state) {
    return state.openCompetitionData;
  },
  openCompetitionDataIsLoading(state) {
    return state.openCompetitionDataIsLoading;
  },
  closedCompetitionData(state) {
    return state.closedCompetitionData;
  },
  closedCompetitionDataIsLoading(state) {
    return state.closedCompetitionDataIsLoading;
  },
};
