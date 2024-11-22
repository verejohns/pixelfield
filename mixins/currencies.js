export default {
  methods: {
    addMonies(amount) {
      this.$auth.user.money_count += amount;
    },
    addDiamonds(amount) {
      this.$auth.user.diamonds_count += amount;
    },
  },
};
