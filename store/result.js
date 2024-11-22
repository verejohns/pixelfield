import { convertSnakeToCamel } from "~/utils/convertSnakeToCamel";

export const state = () => ({
  results: {
    current: [],
    previous: [],
    best: [],
  },
  answers: [],
});

export const mutations = {
  setResults(state, results) {
    state.results = results;
  },
  setAnswers(state, answers) {
    state.answers = answers;
  },
};

export const actions = {
  async fetchResults(context, { testId, resultId }) {
    let url = `/api/chess/tests/${testId}/results/`;
    if (resultId) {
      url += `?result_id=${resultId}`;
    }
    const response = await this.$axios.$get(url);
    url = `/api/chess/tests/${testId}/answers/`;
    if (resultId) {
      url += `?result_id=${resultId}`;
    }
    const answersResponse = await this.$axios.$get(url);
    console.log("res", response);
    console.log("answerRes", answersResponse);
    context.commit("setResults", convertSnakeToCamel(response));
    context.commit("setAnswers", convertSnakeToCamel(answersResponse.results));
  },
  async fetchResultsById(context, testId) {
    const response = await this.$axios.$get(
      `/api/chess/tests/result/${testId}/`
    );
    const answersResponse = await this.$axios.$get(
      `/api/chess/tests/result/${testId}/answers/`
    );
    console.log("res", response);
    console.log("answerRes", answersResponse);
    context.commit("setResults", convertSnakeToCamel(response));
    context.commit("setAnswers", convertSnakeToCamel(answersResponse.results));
  },
};
