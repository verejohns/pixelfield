export default {
  methods: {
    getProgress(count, completedCount) {
      if (count === 0 || count < completedCount) {
        return 100;
      }
      return Math.round((100 / count) * completedCount);
    },
  },
};
