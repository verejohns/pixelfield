export const state = () => ({
  sections: null,
  sectionsIsLoading: true,
  categories: null,
  categoriesIsLoading: true,
  category: null,
  categoryIsLoading: true,
  articles: null,
  articlesIsLoading: true,
  article: null,
  articleIsLoading: true,
  favourites: null,
  favouritesIsLoading: true,
  post: null,
  postIsLoading: true,
  posts: null,
  postsIsLoading: true,
  articleIsSaved: null,
  blogCategories: null,
});

export const mutations = {
  setSections(state, sections) {
    state.sections = sections;
  },
  setArticle(state, article) {
    state.article = article;
  },
  setPost(state, post) {
    state.post = post;
  },
  setPosts(state, posts) {
    state.posts = posts;
  },
  setCategories(state, categories) {
    state.categories = categories;
  },
  setFavourites(state, favourites) {
    state.favourites = favourites;
  },
  setCategory(state, category) {
    state.category = category;
  },
  setArticles(state, articles) {
    state.articles = articles;
  },
  setPostIsLoading(state, isLoading) {
    state.postIsLoading = isLoading;
  },
  setArticleSaved(state, saved) {
    state.articleIsSaved = saved;
  },
  setPostsIsLoading(state, isLoading) {
    state.postsIsLoading = isLoading;
  },
  setFavouritesIsLoading(state, isLoading) {
    state.favouritesIsLoading = isLoading;
  },
  setArticleIsLoading(state, isLoading) {
    state.articleIsLoading = isLoading;
  },
  setArticlesIsLoading(state, isLoading) {
    state.articlesIsLoading = isLoading;
  },
  setCategoryIsLoading(state, isLoading) {
    state.categoryIsLoading = isLoading;
  },
  setCategoriesIsLoading(state, isLoading) {
    state.categoriesIsLoading = isLoading;
  },
  setSectionsIsLoading(state, isLoading) {
    state.sectionsIsLoading = isLoading;
  },
};

export const actions = {
  async getPosts(context) {
    context.commit("setPostsIsLoading", true);
    const posts = await this.$axios.$get("/api/blog/posts/");
    context.commit("setPosts", posts);
    context.commit("setPostsIsLoading", false);
  },
  async getPost(context, blogId) {
    context.commit("setPostIsLoading", true);
    const post = await this.$axios.$get(`/api/blog/post/${blogId}/`);
    context.commit("setPost", post);
    context.commit("setPostIsLoading", false);
  },
  async getChesspediaSections(context) {
    context.commit("setSectionsIsLoading", true);
    const sections = await this.$axios.$get("/api/blog/chesspedia/sections/");
    context.commit("setSections", sections);
    context.commit("setSectionsIsLoading", false);
  },
  async getChesspediaFavourites(context) {
    context.commit("setFavouritesIsLoading", true);
    const favourites = await this.$axios.$get(
      "/api/blog/chesspedia/favorites/"
    );
    context.commit("setFavourites", favourites);
    context.commit("setFavouritesIsLoading", false);
  },

  async fetchBlogCategories(context) {
    return await this.$axios.$get("/api/blog/categories/");
  },

  async toggleFavouriteArticle(context, articleId) {
    return await this.$axios.$patch(`/api/blog/favorite/${articleId}/`);
  },

  async getArticleSaved(context, articleId) {
    const article = await this.$axios.$get(
      `/api/blog/chesspedia/article/${articleId}/`
    );
    context.commit("setArticleSaved", article.is_saved);
  },

  async getChesspediaCategory(context, categoryId) {
    context.commit("setCategoryIsLoading", true);
    const category = await this.$axios.$get(
      `/api/blog/chesspedia/category/${categoryId}/`
    );
    context.commit("setCategory", category);
    context.commit("setCategoryIsLoading", false);
  },
  async getChesspediaArticle(context, articleId) {
    context.commit("setArticleIsLoading", true);
    const article = await this.$axios.$get(
      `/api/blog/chesspedia/article/${articleId}/`
    );
    context.commit("setArticle", article);
    context.commit("setArticleIsLoading", false);
  },
  async getChesspediaArticles(context, categoryId) {
    context.commit("setArticlesIsLoading", true);
    const articles = await this.$axios.$get(
      `/api/blog/chesspedia/category/${categoryId}/articles/`
    );
    context.commit("setArticles", articles);
    context.commit("setArticlesIsLoading", false);
  },
  async getChesspediaCategories(context, sectionId) {
    context.commit("setCategoriesIsLoading", true);
    const categories = await this.$axios.$get(
      `/api/blog/chesspedia/section/${sectionId}/categories/`
    );
    context.commit("setCategories", categories);
    context.commit("setCategoriesIsLoading", false);
  },
};

export const getters = {
  favourites(state) {
    return state.favourites;
  },
  favouritesIsLoading(state) {
    return state.favouritesIsLoading;
  },
  category(state) {
    return state.category;
  },
  post(state) {
    return state.post;
  },
  postIsLoading(state) {
    return state.postIsLoading;
  },
  posts(state) {
    return state.posts;
  },
  postsIsLoading(state) {
    return state.postsIsLoading;
  },
  article(state) {
    return state.article;
  },
  articleIsSaved(state) {
    return state.articleIsSaved;
  },
  articleIsLoading(state) {
    return state.articleIsLoading;
  },
  articles(state) {
    return state.articles;
  },
  articlesIsLoading(state) {
    return state.articlesIsLoading;
  },
  categoryIsLoading(state) {
    return state.categoryIsLoading;
  },
  categories(state) {
    return state.categories;
  },
  categoriesIsLoading(state) {
    return state.categoriesIsLoading;
  },
  sections(state) {
    return state.sections;
  },
  sectionsIsLoading(state) {
    return state.sectionsIsLoading;
  },
};
