<template>
  <div v-if="!isHidden" class="tile">
    <div
      class="main-container"
      :class="{ premium: trainingPlan.is_premium }"
      @click="toDetailPlan"
    >
      <div class="main-container__info-tile">
        <div
          class="main-container__row"
          :class="notPremiumAndBought ? 'view-margin-bottom-15' : ''"
        >
          <div class="main-container__title">{{ trainingPlan.title }}</div>
          <div class="main-container__themes">
            {{
              $tc("theme_number", trainingPlan.number_of_themes, {
                count: trainingPlan.number_of_themes,
              })
            }}
          </div>
        </div>
        <div v-if="notPremiumAndBought" class="view-flex">
          <div class="main-container__percentage">
            {{ calcPercentage }}
          </div>
          <div class="progress-bar">
            <div
              :style="{ width: calcPercentage }"
              class="progress-bar__fill"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="!notPremiumAndBought"
      class="button button__buy"
      @click="buyPlan"
    >
      <div class="button__buy__text">
        {{ $t("buy") }}
      </div>
      <div class="button__buy__row">
        <img
          v-if="trainingPlan.price_diamonds"
          class="image-resize-icon"
          src="~/assets/icons/diamond-color-0-margin.svg"
        />
        <div v-if="trainingPlan.price_diamonds">
          {{ trainingPlan.price_diamonds }}
        </div>
      </div>
      <div class="button__buy__row">
        <img
          v-if="trainingPlan.price_coins"
          class="image-resize-icon"
          src="~/assets/icons/coin-color-0-margin.svg"
        />
        <div v-if="trainingPlan.price_coins">
          {{ trainingPlan.price_coins }}
        </div>
      </div>
    </div>
    <div v-else class="button button__play" @click="play">
      {{ $t("play") }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    trainingPlan: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isHidden: false,
    };
  },
  computed: {
    calcPercentage() {
      return Math.round(this.trainingPlan.percentage) + "%";
    },
    notPremiumAndBought() {
      return !this.trainingPlan.is_premium || this.trainingPlan.is_bought;
    },
  },
  methods: {
    toDetailPlan() {
      if (this.notPremiumAndBought) {
        this.$router.push(`/training-plans/detail/${this.trainingPlan.id}/`);
      }
    },
    async play() {
      await this.$store.dispatch(
        "trainingPlans/fetchThemes",
        this.trainingPlan.id
      );
      const themes = this.$store.state.trainingPlans.themes;
      console.log(themes);
      const themeLength = themes.length;
      let type = "";
      let topicId = 0;
      let topic = "";
      let currentIndex = 0;
      let finalIndex = 0;
      let params = "";

      for (let i = 0; i < themeLength; i++) {
        if (type !== "" && topicId !== 0) {
          break;
        }
        for (let j = 0; j < themes[i].topics.length; j++) {
          if (themes[i].topics[j].is_completed === false) {
            type = themes[i].topics[j].type;
            topicId = themes[i].topics[j].id;
            topic = themes[i].topics[j].title;
            currentIndex = j + 1;
            finalIndex = themes[i].topics.length;
            if (type === "video") {
              params = `&videoId=${themes[i].topics[j].video}`;
            } else if (type === "test") {
              params = `/tests/board?test=${themes[i].topics[j].test}&planId=${this.trainingPlan.id}&themeId=${topicId}`;
            } else if (type === "chesspedia") {
              params = `&blogId=${themes[i].topics[j].chesspedia}`;
            } else if (type === "lesson") {
              params = `/tests/board?test=${themes[i].topics[j].lesson}&planId=${this.trainingPlan.id}&themeId=${topicId}&study=true`;
            }
            break;
          }
        }
      }
      if (type === "test" || type === "lesson") {
        this.$router.push(params);
      } else {
        this.$router.push(
          `/training-plans/${type}/${topicId}/?planId=${this.trainingPlan.id}${params}&topicName=${topic}&step=${currentIndex}&totalSteps=${finalIndex}`
        );
      }
    },
    buyPlan() {
      const trainingPlan = this.trainingPlan;
      this.$store
        .dispatch("shop/buy", this.trainingPlan.store_item)
        .then((v) => {
          this.$emit("boughtTrainingPlan", trainingPlan);
          this.isHidden = true;
          trainingPlan.is_bought = true;
          this.$auth.fetchUser();
          this.$toast.show(this.$t("success_purchase"), {
            position: "bottom-center",
            action: {
              text: "UNDO",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
        })
        .catch((e) => {
          this.$toast.error(e.response.data.payload.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/training-plan/training-plan-tile";
</style>
