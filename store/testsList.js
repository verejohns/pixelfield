import { convertSnakeToCamel } from "~/utils/convertSnakeToCamel";

export const state = () => ({
  series: [],
  seriesIsLoading: true,
  categories: [],
  categoriesIsLoading: true,
  tests: [],
  level: "all levels",
});

export const mutations = {
  setSeries(state, series) {
    state.series = series.sort((a, b) => a.id - b.id);
  },
  setSeriesIsLoading(state, isLoading) {
    state.seriesIsLoading = isLoading;
  },
  setCategories(state, categories) {
    state.categories = categories.sort((a, b) => a.id - b.id);
  },
  setCategoriesIsLoading(state, isLoading) {
    state.categoriesIsLoading = isLoading;
  },
  setTests(state, tests) {
    state.tests = tests.sort((a, b) => a.id - b.id);
  },
  setLevel(state, level) {
    state.level = level;
  },
};

export const actions = {
  async fetchSeries(context) {
    context.commit("setSeriesIsLoading", true);
    const response = await this.$axios.$get(`/api/chess/tests/series/`);
    context.commit("setSeries", convertSnakeToCamel(response).results);
    context.commit("setSeriesIsLoading", false);
  },
  async fetchCategories(context, serieId) {
    context.commit("setCategoriesIsLoading", true);
    const response = await this.$axios.$get(
      `/api/chess/tests/series/${serieId}/categories/`
    );
    context.commit("setCategories", convertSnakeToCamel(response).results);
    context.commit("setCategoriesIsLoading", false);
  },
  async fetchTests(context, { serieId, categoryId }) {
    const response = await this.$axios.$get(
      `/api/chess/tests/series/${serieId}/categories/${categoryId}/`
    );
    context.commit("setTests", convertSnakeToCamel(response).results);
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
  getLevel(state) {
    return state.level;
  },
  getSeries(state) {
    return state.series;
  },
  getCategories(state) {
    return state.categories;
  },
  getSeriesIsLoading(state) {
    return state.seriesIsLoading;
  },
  categoriesIsLoading(state) {
    return state.categoriesIsLoading;
  },
};
