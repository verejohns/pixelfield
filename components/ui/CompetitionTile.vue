<template>
  <div class="main-container" @click="navToCompetition">
    <div class="main-container__left">
      <div class="main-container__left__title">
        {{ competition.title }}
      </div>
      <div v-if="competition.is_chess_to_schools" class="margin-bottom-8">
        <Chip
          :competition="true"
          :group-detail="false"
          :text="$t('šachy_do_škol')"
        />
      </div>
      <div class="main-container__left__info">
        <div class="main-container__left__info__date">
          {{ fromTo }}
        </div>
        <div class="main-container__left__info__participants">
          {{
            $tc("competition_participants", competition.participants, {
              count: competition.participants,
            })
          }}
        </div>
      </div>
      <div
        class="main-container__left__desc"
        :class="!isPlay ? 'limit-text' : ''"
      >
        {{ competition.description }}
      </div>
      <div v-if="bottomIcons" class="main-container__left__icons">
        <IconSet :competition="competition" class="view-margin-top-12" />
      </div>
    </div>
    <div class="main-container__right">
      <div v-if="buttonIcons">
        <IconSet :competition="competition" />
      </div>
      <v-btn
        :disabled="reachedAttempts"
        class="primary button__with-icon main-container__right__button"
        :class="[
          hideButtonOnShrink ? 'view-hide-button-on-mobile' : '',
          !isPlay ? 'margin-left-21' : '',
        ]"
        @click="play"
      >
        {{ isPlay ? $t("play") : $t("open") }}
        <img
          class="button__icon-spacing-right"
          src="~/assets/icons/arrow-right-circle-selected.svg"
        />
      </v-btn>
    </div>
  </div>
</template>

<script>
import IconSet from "~/components/ui/icon-set/CompetitionIconSet";
import Chip from "~/components/ui/Chip.vue";

export default {
  components: { IconSet, Chip },
  props: {
    competition: {
      type: Object,
      required: true,
    },
    hideButtonOnShrink: {
      type: Boolean,
      default: false,
    },
    bottomIcons: {
      type: Boolean,
      default: true,
    },
    buttonIcons: {
      type: Boolean,
      default: false,
    },
    isPlay: {
      type: Boolean,
      detaul: true,
    },
  },
  computed: {
    from() {
      return this.$moment(this.competition.active_from).format("DD.MM.YY");
    },
    to() {
      return this.$moment(this.competition.active_to).format("DD.MM.YY");
    },
    fromTo() {
      return `${this.from} - ${this.to}`;
    },
    reachedAttempts() {
      return this.competition.attempted >= this.competition.attempts;
    },
  },
  methods: {
    play() {
      if (this.isPlay) {
        if (!this.reachedAttempts) {
          this.$router.push(
            `/tests/board?test=${this.competition.test.id}&competition=${this.competition.id}`
          );
        }
      }
    },
    navToCompetition() {
      if (!this.isPlay) {
        this.$router.push(`/competitions/details/${this.competition.id}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/competition-tile";
@import "/assets/scss/components/ui/buttons/button";
@import "/assets/scss/components/tests/category-item";
</style>
