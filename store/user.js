export const state = () => ({
  user: null,
  userIsLoading: true,
  student: null,
  studentIsLoading: true,
  bestRanking: null,
  bestRankingIsLoading: true,
  code: null,
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setUserLoading(state, isLoading) {
    state.userIsLoading = isLoading;
  },
  setStudent(state, user) {
    state.student = user;
  },
  setStudentLoading(state, isLoading) {
    state.studentIsLoading = isLoading;
  },
  setBestRanking(state, best) {
    state.bestRanking = best;
  },
  setBestRankingIsLoading(state, isLoading) {
    state.bestRankingIsLoading = isLoading;
  },
  assignSchoolCode(state, code) {
    state.code = code;
  },
};

export const actions = {
  async hireCoach(context, coachId) {
    return await this.$axios.$post(`/api/users/coach/${coachId}/request/`);
  },
  async getStudents(context, name) {
    return (await this.$axios.$get(`/api/users/students/?search=${name}`))
      .results;
  },
  async fetchStudent(context, id) {
    context.commit("setStudentLoading", true);
    const user = await this.$axios.$get(`/api/users/student/${id}/`);
    context.commit("setStudent", user);
    context.commit("setStudentLoading", false);
  },
  async fetchUserInformation(context) {
    context.commit("setUserLoading", true);
    const user = await this.$axios.$get(`/api/users/detail/`);
    context.commit("setUser", user);
    context.commit("setUserLoading", false);
  },
  async fetchBestCompetition(context, id) {
    context.commit("setBestRankingIsLoading", true);
    const url =
      id !== undefined
        ? `/api/chess/competitions/my/best-ranking/?user=${id}`
        : "/api/chess/competitions/my/best-ranking/";
    const ranking = await this.$axios.$get(url);
    context.commit("setBestRanking", ranking);
    context.commit("setBestRankingIsLoading", false);
  },
  async sendCoachMessage(context, { id, message }) {
    if (!message) {
      message = ``;
    }
    return await this.$axios.$post(`/api/users/coach/${id}/message/`, {
      message,
    });
  },
  async assignSchool(context, code) {
    console.log("assign school", code);
    return await this.$axios.$post("/api/users/school/", { code });
  },
};

export const getters = {
  user(state) {
    return state.user;
  },
  userIsLoading(state) {
    return state.userIsLoading;
  },
  student(state) {
    return state.student;
  },
  studentIsLoading(state) {
    return state.studentIsLoading;
  },
  bestRanking(state) {
    return state.bestRanking;
  },
  bestRankingIsLoading(state) {
    return state.bestRankingIsLoading;
  },
  schoolCode(state) {
    return state.code;
  },
};
