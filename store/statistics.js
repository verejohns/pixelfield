export const state = () => ({
  test: null,
  testIsLoading: true,
  learning: null,
  learningIsLoading: true,
  study: null,
  studyIsLoading: true,
  ranking: null,
  rankingIsLoading: true,
  competitions: null,
  competitionsIsLoading: true,
  competition: null,
  competitionIsLoading: true,
  pastTests: null,
  pastTestsIsLoading: true,
  pastCompetitions: null,
  pastCompetitionsIsLoading: true,
});

export const mutations = {
  setTest(state, test) {
    state.test = test;
  },
  setTestIsLoading(state, isLoading) {
    state.testIsLoading = isLoading;
  },
  setLearning(state, learning) {
    state.learning = learning;
  },
  setLearningIsLoading(state, isLoading) {
    state.learningIsLoading = isLoading;
  },
  setStudy(state, study) {
    state.study = study;
  },
  setStudyIsLoading(state, isLoading) {
    state.studyIsLoading = isLoading;
  },
  setRanking(state, ranking) {
    state.ranking = ranking;
  },
  setRankingIsLoading(state, isLoading) {
    state.rankingIsLoading = isLoading;
  },
  setCompetitions(state, competitions) {
    state.competitions = competitions;
  },
  setCompetitionsIsLoading(state, isLoading) {
    state.competitionsIsLoading = isLoading;
  },
  setCompetition(state, competition) {
    state.competition = competition;
  },
  setCompetitionIsLoading(state, isLoading) {
    state.competitionIsLoading = isLoading;
  },
  setPastTests(state, tests) {
    state.pastTests = tests;
  },
  setPastTestsIsLoading(state, isLoading) {
    state.pastTestsIsLoading = isLoading;
  },
  setPastCompetitions(state, competitions) {
    state.pastCompetitions = competitions;
  },
  setPastCompetitionsIsLoading(state, isLoading) {
    state.pastCompetitionsIsLoading = isLoading;
  },
};

export const actions = {
  async fetchTest(context, id) {
    context.commit("setTestIsLoading", true);
    const url =
      id !== undefined
        ? `/api/users/statistics/test/?user=${id}`
        : "/api/users/statistics/test/";
    const test = await this.$axios.$get(url);
    context.commit("setTest", test);
    context.commit("setTestIsLoading", false);
  },
  async fetchLearning(context, id) {
    context.commit("setLearningIsLoading", true);
    const url =
      id !== undefined
        ? `/api/users/statistics/learning/?user=${id}`
        : "/api/users/statistics/learning/";
    const learning = await this.$axios.$get(url);
    context.commit("setLearning", learning);
    context.commit("setLearningIsLoading", false);
  },
  async fetchStudy(context, id) {
    context.commit("setStudyIsLoading", true);
    const url =
      id !== undefined
        ? `/api/users/statistics/study/?user=${id}`
        : "/api/users/statistics/study/";
    const study = await this.$axios.$get(url);
    context.commit("setStudy", study);
    context.commit("setStudyIsLoading", false);
  },
  async fetchRanking(context, compId) {
    context.commit("setRankingIsLoading", true);
    const ranking = await this.$axios.$get(
      `/api/chess/competitions/${compId}/ranking/`
    );
    context.commit("setRanking", ranking);
    context.commit("setRankingIsLoading", false);
  },
  async fetchCompetitions(context) {
    context.commit("setCompetitionsIsLoading", true);
    const competitions = await this.$axios.$get("/api/chess/competitions/");
    context.commit("setCompetitions", competitions);
    context.commit("setCompetitionsIsLoading", false);
  },
  async fetchCompetition(context, compId) {
    context.commit("setCompetitionIsLoading", true);
    const competition = await this.$axios.$get(
      `/api/chess/competitions/${compId}/`
    );
    context.commit("setCompetition", competition);
    context.commit("setCompetitionIsLoading", false);
  },
  async fetchPastTests(context, id) {
    context.commit("setPastTestsIsLoading", true);
    const url =
      id !== undefined
        ? `/api/users/statistics/tests/?user=${id}&page_size=4`
        : "/api/users/statistics/tests/?page_size=4";
    const pastTests = await this.$axios.$get(url);
    context.commit("setPastTests", pastTests);
    context.commit("setPastTestsIsLoading", false);
  },
  async fetchPastCompetitions(context, id) {
    context.commit("setPastCompetitionsIsLoading", true);
    const url =
      id !== undefined
        ? `/api/users/statistics/competitions/?user=${id}`
        : "/api/users/statistics/competitions/";
    const pastCompetitions = await this.$axios.$get(url);
    context.commit("setPastCompetitions", pastCompetitions);
    context.commit("setPastCompetitionsIsLoading", false);
  },
};

export const getters = {
  test(state) {
    return state.test;
  },
  testIsLoading(state) {
    return state.testIsLoading;
  },
  learning(state) {
    return state.learning;
  },
  learningIsLoading(state) {
    return state.learningIsLoading;
  },
  study(state) {
    return state.study;
  },
  studyIsLoading(state) {
    return state.studyIsLoading;
  },
  ranking(state) {
    return state.ranking;
  },
  rankingIsLoading(state) {
    return state.rankingIsLoading;
  },
  competitions(state) {
    return state.competitions;
  },
  competitionsIsLoading(state) {
    return state.competitionsIsLoading;
  },
  competition(state) {
    return state.competition;
  },
  competitionIsLoading(state) {
    return state.competitionIsLoading;
  },
  pastTests(state) {
    return state.pastTests;
  },
  pastTestsIsLoading(state) {
    return state.pastTestsIsLoading;
  },
  pastCompetitions(state) {
    return state.pastCompetitions;
  },
  pastCompetitionsIsLoading(state) {
    return state.pastCompetitionsIsLoading;
  },
};
