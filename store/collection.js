export const state = () => ({
  sections: null,
  sectionsIsLoading: true,
  sectionList: null,
  categories: null,
  categoriesIsLoading: true,
});

export const mutations = {
  setSections(state, sections) {
    state.sections = sections;
  },
  setCategoryList(state, categoryList) {
    state.categoryList = categoryList;
  },
  setCategories(state, categories) {
    state.categories = categories;
  },
  setSectionsIsLoading(state, isLoading) {
    state.sectionsIsLoading = isLoading;
  },
  setCategoriesIsLoading(state, isLoading) {
    state.categoriesIsLoading = isLoading;
  },
};

export const actions = {
  async fetchCategories(context, sectionId) {
    context.commit("setCategoriesIsLoading", true);
    const categories = await this.$axios.$get(
      `/api/store/collection/section/${sectionId}/categories/`
    );
    context.commit("setCategories", categories);
    context.commit("setCategoriesIsLoading", false);
  },

  async fetchSections(context) {
    context.commit("setSectionsIsLoading", true);
    const sections = await this.$axios.$get(`/api/store/collection/sections/`);
    context.commit("setSections", sections);
    context.commit("setSectionsIsLoading", false);
  },
};

export const getters = {
  sections(state) {
    return state.sections;
  },
  sectionsIsLoading(state) {
    return state.sectionsIsLoading;
  },
  categories(state) {
    return state.categories;
  },
  categoriesIsLoading(state) {
    return state.categoriesIsLoading;
  },
};
