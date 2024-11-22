import { convertSnakeToCamel } from "~/utils/convertSnakeToCamel";

export const state = () => ({
  series: [],
  categories: [],
  tests: [],
  seriesIsLoading: true,
  categoriesIsLoading: true,
  testsIsLoading: true,
  level: "all levels",
});

export const mutations = {
  setSeries(state, series) {
    state.series = series.sort((a, b) => a.id - b.id);
  },
  setCategories(state, categories) {
    state.categories = categories.sort((a, b) => a.id - b.id);
  },
  setTests(state, tests) {
    state.tests = tests.sort((a, b) => a.id - b.id);
  },
  setSeriesIsLoading(state, isLoading) {
    state.seriesIsLoading = isLoading;
  },
  setCategoriesIsLoading(state, isLoading) {
    state.categoriesIsLoading = isLoading;
  },
  setTestsIsLoading(state, isLoading) {
    state.testsIsLoading = isLoading;
  },
};

export const actions = {
  async fetchSeries(context) {
    context.commit("setSeriesIsLoading", true);
    const response = await this.$axios.$get(`/api/chess/study/series/`);
    context.commit("setSeries", convertSnakeToCamel(response).results);
    context.commit("setSeriesIsLoading", false);
  },
  async fetchCategories(context, serieId) {
    context.commit("setCategoriesIsLoading", true);
    const response = await this.$axios.$get(
      `/api/chess/study/series/${serieId}/categories/`
    );
    context.commit("setCategories", convertSnakeToCamel(response).results);
    context.commit("setCategoriesIsLoading", false);
  },
  async fetchTests(context, { serieId, categoryId }) {
    context.commit("setTestsIsLoading", true);
    const response = await this.$axios.$get(
      `/api/chess/study/series/${serieId}/categories/${categoryId}/`
    );
    context.commit("setTests", convertSnakeToCamel(response).results);
    context.commit("setTestsIsLoading", false);
  },
  async fetchTestDetail(context, testId) {
    const response = await this.$axios.$get(
      `/api/chess/tests/${testId}/detail/`
    );
    return response;
  },
};

export const getters = {
  getTests(state) {
    return state.tests;
  },
  series(state) {
    return state.series;
  },
  categories(state) {
    return state.categories;
  },
  seriesIsLoading(state) {
    return state.seriesIsLoading;
  },
  testsIsLoading(state) {
    return state.testsIsLoading;
  },
  categoriesIsLoading(state) {
    return state.categoriesIsLoading;
  },
};
