export const state = () => ({
  cards: null,
  cardsIsLoading: true,
});

export const mutations = {
  setCards(state, cards) {
    state.cards = cards;
  },
  setCardsIsLoading(state, isLoading) {
    state.cardsIsLoading = isLoading;
  },
};

export const actions = {
  async buy(context, id) {
    return await this.$axios.$post(`/api/store/buy/${id}/`);
  },
  async fetchCards(context) {
    context.commit("setCardsIsLoading", true);
    const cards = await this.$axios.$get(`/api/store/cards/`);
    context.commit("setCards", cards);
    context.commit("setCardsIsLoading", false);
  },
};

export const getters = {
  cards(state) {
    return state.cards;
  },
  cardsIsLoading(state) {
    return state.cardsIsLoading;
  },
};
