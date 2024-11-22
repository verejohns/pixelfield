import moment from "moment";
import utils from "~/mixins/utils";

export default {
  mixins: [utils],
  computed: {
    resultObject() {
      return (object) => {
        return {
          id: object.id,
          date: this.transformDate(object.date),
          progress: `${object.totalSuccessAnswers}/${object.totalQuestions}`,
          progressBar: this.getProgress(
            object.totalQuestions,
            object.totalSuccessAnswers
          ),
          duration: this.formatDuration(object.timeSpend * 1000),
          star: object.starCount,
        };
      };
    },
    currentResult() {
      const currentResultData = this.$store.state.result.results.current;
      if (currentResultData.id !== null) {
        return {
          title: this.$t("last"),
          icon: "last.svg",
          ...this.resultObject(currentResultData),
        };
      } else {
        return null;
      }
    },
    bestResult() {
      const bestResultData = this.$store.state.result.results.best;
      if (bestResultData.id !== null) {
        return {
          title: this.$t("best"),
          icon: "best.svg",
          ...this.resultObject(bestResultData),
        };
      } else {
        return null;
      }
    },
    lastResult() {
      const lastResultData = this.$store.state.result.results.previous;
      if (lastResultData.id !== null) {
        return {
          title: this.$t("last"),
          icon: "last.svg",
          ...this.resultObject(lastResultData),
        };
      } else {
        return null;
      }
    },
  },
  methods: {
    transformDate(dateTimeString) {
      if (dateTimeString)
        return moment(dateTimeString.substring(0, 10), "YYYY-MM-DD").format(
          "DD MMM YYYY"
        );
      return "-";
    },
    formatDuration(duration) {
      const momentDuration = moment.duration(duration);
      return moment.utc(momentDuration.as("milliseconds")).format("m:ss");
    },
  },
};
