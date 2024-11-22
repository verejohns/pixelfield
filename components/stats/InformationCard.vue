<template>
  <div class="spacing">
    <div class="main-container">
      <div v-if="showHeading" class="main-container__heading">
        <img class="main-container__img" :src="cardTitleImage" />
        <div>{{ infoCardType }}</div>
      </div>
      <div :class="['main-container__color-bar', bgColor]" @click="expand">
        <div class="main-container__completed">
          <span class="total-time">{{ $t("total_time") }}&nbsp;</span>
          {{ cardTitle }}
        </div>
        <div>
          <img class="main-container__expand-img" :src="expanded" />
        </div>
      </div>
      <div v-if="isExpanded && !isTime" class="expanded-container">
        <div class="expanded-container__stats">
          <InformationCardRow
            :id="0"
            :percentage="percentage('easy')"
            :difficulty="difficulty1"
          />
          <InformationCardRow
            :id="1"
            :percentage="percentage('medium')"
            :difficulty="difficulty2"
          />

          <InformationCardRow
            :id="2"
            :percentage="percentage('hard')"
            :difficulty="difficulty3"
          />
        </div>
        <div class="bottom-container">
          <div class="bottom-container__content">
            <div class="bottom-container__heading_1">
              {{ $t("total_opened") }}
            </div>
            <div class="bottom-container__value">{{ data.opened_tests }}</div>
          </div>
          <div class="bottom-container__content">
            <div class="bottom-container__heading_1">
              {{ $t("time_spent") }}
            </div>
            <div class="bottom-container__value">
              {{ fromSecondsToTime(data.time_spend) }}
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="isExpanded" class="expanded-container">
          <div class="expanded-container__stats">
            <div class="expanded-container__stat-row view-text-center">
              <div>
                {{ fromSecondsToTime(data.total_last_week) }}
                {{ $t("last_week") }}
              </div>
            </div>
          </div>
          <div class="bottom-container">
            <div class="bottom-container__content vertical">
              <div class="bottom-container__heading_2">
                {{ $t("tests") }}<br class="hide-on-big-screen" />
                ({{ $t("last_week") }})
              </div>
              <div class="bottom-container__value">
                {{ data.tests_last_week }}
              </div>
            </div>
            <div class="bottom-container__content vertical">
              <div class="bottom-container__heading_2">
                {{ $t("learning") }}<br class="hide-on-big-screen" />
                ({{ $t("last_week") }})
              </div>
              <div class="bottom-container__value">
                {{ data.learning_last_week }}
              </div>
            </div>
            <div class="bottom-container__content vertical">
              <div class="bottom-container__heading_2">
                {{ $t("competitions") }}<br class="hide-on-big-screen" />
                ({{ $t("total") }})
              </div>
              <div class="bottom-container__value">
                {{ data.competitions_last_week }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InformationCardRow from "~/components/stats/InformationCardRow";
import { fromSecondsToTime } from "~/utils/common";
export default {
  components: {
    InformationCardRow,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    isTest: {
      type: Boolean,
      default: false,
    },
    isLearning: {
      type: Boolean,
      default: false,
    },
    isTime: {
      type: Boolean,
      default: false,
    },
    showHeading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      difficulty1: this.$t("easy"),
      difficulty2: this.$t("medium"),
      difficulty3: this.$t("hard"),
      isExpanded: false,
    };
  },
  computed: {
    bgColor() {
      if (this.isTest) {
        return "view-bg-test";
      } else if (this.isLearning) {
        return "view-bg-learning";
      } else {
        return "view-bg-time";
      }
    },
    expanded() {
      if (!this.isExpanded) {
        return require("~/assets/icons/add.svg");
      } else {
        return require("~/assets/icons/minus-circle.svg");
      }
    },
    cardTitleImage() {
      if (this.isTest) {
        return require("~/assets/icons/check-circle.svg");
      } else if (this.isLearning) {
        return require("~/assets/icons/book.svg");
      } else {
        return require("~/assets/icons/timer.svg");
      }
    },
    cardTitle() {
      if (!this.isTime) {
        return this.data.completed_tests + " " + this.$t("completed");
      } else {
        return this.fromSecondsToTime(this.data.total_time);
      }
    },
    infoCardType() {
      if (this.isTest) {
        return this.$t("tests");
      } else if (this.isLearning) {
        return this.$t("learning");
      } else {
        return this.$t("time_spent_on_studying");
      }
    },
  },
  methods: {
    percentage(difficulty) {
      switch (difficulty) {
        case "easy":
          return Math.round(this.data.easy_percentage) + "%";
        case "medium":
          return Math.round(this.data.medium_percentage) + "%";
        case "hard":
          return Math.round(this.data.hard_percentage) + "%";
      }
      return -1;
    },
    expand() {
      this.isExpanded = !this.isExpanded;
    },
    fromSecondsToTime,
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/stats/information-card.scss";
</style>
