import { convertSnakeToCamel } from "~/utils/convertSnakeToCamel";

export const state = () => ({
  requestsForUser: null,
  requestsForCoach: null,
  requestsForCoachIsLoading: true,
  coachStudyGroups: null,
  coachStudyGroupsIsLoading: true,
  coachStudents: null,
  coachStudentsIsLoading: true,
  coachGroup: null,
  coachGroupIsLoading: true,
  coach: null,
  coachIsLoading: true,
});

export const mutations = {
  setRequestsForUser(state, requestsForUser) {
    state.requestsForUser = requestsForUser;
  },

  setCoach(state, coach) {
    state.coach = coach;
  },

  addStudent(state, student) {
    state.coach.students.push(student);
    console.log(state.coach.students);
  },

  setCoachIsLoading(state, isLoading) {
    state.coachIsLoading = isLoading;
  },

  setCoachGroup(state, coachGroup) {
    state.coachGroup = coachGroup;
  },

  setCoachGroupIsLoading(state, isLoading) {
    state.coachGroupIsLoading = isLoading;
  },

  setRequestsForCoach(state, requestsForCoach) {
    state.requestsForCoach = requestsForCoach;
  },

  setRequestsForCoachIsLoading(state, isLoading) {
    state.requestsForCoachIsLoading = isLoading;
  },

  setCoachStudyGroups(state, studyGroups) {
    state.coachStudyGroups = studyGroups;
  },

  setCoachStudyGroupsIsLoading(state, isLoading) {
    state.coachStudyGroupsIsLoading = isLoading;
  },

  setCoachStudents(state, students) {
    state.coachStudents = students;
  },

  setCoachStudentsIsLoading(state, isLoading) {
    state.coachStudentsIsLoading = isLoading;
  },
};

export const actions = {
  async createGroup(context, payload) {
    return await this.$axios.$post("/api/users/coach/me/group/", payload);
  },

  async fetchCoachInformation(context) {
    context.commit("setCoachIsLoading", true);
    const coach = await this.$axios.$get("/api/users/coach/me/");
    context.commit("setCoach", coach);
    context.commit("setCoachIsLoading", false);
  },

  async getCoach(context, coachId) {
    return await this.$axios.$get(`/api/users/coach/${coachId}/`);
  },

  async getCoaches(context, search) {
    let url = "/api/users/coaches/";
    if (search) {
      url += `?search=${search}`;
    }
    return (await this.$axios.$get(url)).results;
  },

  async editGroup(context, { groupId, payload }) {
    return await this.$axios.$patch(
      `/api/users/coach/me/group/${groupId}/`,
      payload
    );
  },

  async getGroup(context, groupId) {
    context.commit("setCoachGroupIsLoading", true);
    const coachGroup = await this.$axios.$get(
      `/api/users/coach/me/group/${groupId}/`
    );
    context.commit("setCoachGroup", coachGroup);
    context.commit("setCoachGroupIsLoading", false);
  },

  async getRequestsForUser(context) {
    const response = await this.$axios.$get("/api/users/detail/");
    context.commit("setRequestsForUser", convertSnakeToCamel(response));
  },

  async getStudentsInGroup(context, groupId) {
    context.commit("setCoachStudentsIsLoading", true);
    const students = await this.$axios.$get(
      `/api/users/coach/me/group/${groupId}/students/`
    );
    context.commit("setCoachStudents", students);
    context.commit("setCoachStudentsIsLoading", false);
  },

  async getRequestsForCoach(context) {
    context.commit("setRequestsForCoachIsLoading", true);
    const response = await this.$axios.$get("/api/users/coach/me/requests/");
    context.commit("setRequestsForCoach", response);
    context.commit("setRequestsForCoachIsLoading", false);
  },

  async getStudyGroupsForCoach(context) {
    context.commit("setCoachStudyGroupsIsLoading", true);
    const groups = await this.$axios.$get(`api/users/coach/me/groups/`);
    context.commit("setCoachStudyGroups", groups);
    context.commit("setCoachStudyGroupsIsLoading", false);
  },

  async getStudentsForCoach(context) {
    context.commit("setCoachStudentsIsLoading", true);
    const students = await this.$axios.$get(`api/users/coach/me/students/`);
    context.commit("setCoachStudents", students);
    context.commit("setCoachStudentsIsLoading", false);
  },

  async acceptRequest(context, requestId) {
    return await this.$axios.$post(`/api/users/request/${requestId}/accept/`);
  },

  async declineRequest(context, requestId) {
    return await this.$axios.$post(`/api/users/request/${requestId}/decline/`);
  },

  async inviteStudents(context, payload) {
    return await this.$axios.$post(`/api/users/coach/me/invite/`, payload);
  },
};

export const getters = {
  coachStudents(state) {
    return state.coachStudents;
  },
  coachStudentsIsLoading(state) {
    return state.coachStudentsIsLoading;
  },
  coachGroup(state) {
    return state.coachGroup;
  },
  coach(state) {
    return state.coach;
  },
  coachIsLoading(state) {
    return state.coachIsLoading;
  },

  coachGroupIsLoading(state) {
    return state.coachGroupIsLoading;
  },
  coachStudyGroups(state) {
    return state.coachStudyGroups;
  },
  coachStudyGroupsIsLoading(state) {
    return state.coachStudyGroupsIsLoading;
  },
  requestsForCoach(state) {
    return state.requestsForCoach;
  },
  requestsForCoachIsLoading(state) {
    return state.requestsForCoachIsLoading;
  },
};
