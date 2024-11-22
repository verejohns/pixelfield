<template>
  <div class="main-container">
    <div class="main-container__header">
      <div class="main-container__header__content">
        <div
          class="main-container__header__content__dashboard"
          @click="navToCompetitionDetails"
        >
          <img
            class="main-container__header__content__img"
            src="~/assets/icons/left-arrow-white.svg"
          />
          <div>{{ $t("competition_details") }}</div>
        </div>
        <div class="main-container__header__content__title">
          {{ $t("ranking") }}
        </div>
      </div>
    </div>
    <div
      v-if="competitionLoaded && !rankingIsLoading"
      class="main-container__body"
    >
      <template v-if="isToSchool">
        <v-tabs
          v-model="selected"
          bright
          background-color="teal darken-3"
          show-arrows
        >
          <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
          <v-tab :key="0" :href="'#tab-0'" @click="changeTab(0)">
            {{ $t("stat_week") }}
          </v-tab>
          <v-tab :key="1" :href="'#tab-1'" @click="changeTab(1)">
            {{ $t("stat_month") }}
          </v-tab>
          <v-tab :key="2" :href="'#tab-2'" @click="changeTab(2)">
            {{ $t("stat_semianual") }}
          </v-tab>
        </v-tabs>
        <div :key="`key_student_${display}`" class="body__rankings__list">
          <div v-for="(student, index) in rankingRows" :key="student.id">
            <RankingTile
              v-if="type && type === 'students'"
              :id="student.position"
              :key="`tile_student_${index}`"
              :data="student"
              :first="student.me"
              :is-school="true"
            />
            <RankingTileSchool
              v-if="type && type !== 'students'"
              :id="student.position"
              :key="`tile_school_${index}`"
              :data="student"
              :first="student.me"
              :is-school="true"
              :points-key="pointsKey"
            />
          </div>
        </div>
      </template>
      <template v-else>
        <div v-for="(student, index) in rankingRows" :key="student">
          <RankingTile
            v-if="type"
            :id="student.position"
            :key="`tile_student_${index}`"
            :data="student"
            :first="student.me"
            :is-school="true"
          />
        </div>
      </template>
    </div>
    <Loading v-else />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RankingTile from "~/components/ui/RankingTile.vue";
import Loading from "~/components/ui/Loading.vue";

export default {
  components: {
    RankingTile,
    Loading,
  },
  data() {
    return {
      competitionLoaded: false,
      selected: 0,
      display: "week",
      type: null,
    };
  },
  computed: {
    ...mapGetters({
      competition: "statistics/competition",
      ranking: "statistics/ranking",
      rankingIsLoading: "statistics/rankingIsLoading",
    }),
    isToSchool() {
      return this.competitionLoaded && this.competition.is_chess_to_schools;
    },
    rankingRows() {
      const display = this.display;
      if (
        this.type &&
        this.ranking &&
        this.ranking.results[display][this.type].length
      ) {
        return this.ranking.results[display][this.type];
      }
      return [];
    },
    pointsKey() {
      return this.type === "schools_ttl" ? "total_points" : "total_points_avg";
    },
  },
  watch: {
    competition() {
      console.log("competition watch", this.competition);
      if (this.competitionLoaded === false && this.competition) {
        this.competitionLoaded = true;
        this.$store.dispatch("statistics/fetchRanking", this.$route.params.id);
      }
    },
  },
  mounted() {
    const queryKeys = Object.keys(this.$route.query);
    if (queryKeys.includes("type")) {
      this.type = this.$route.query.type;
    } else {
      this.type = "students";
    }
    if (!this.competition || this.competition.id !== this.$route.params.id) {
      this.$store.dispatch(
        "statistics/fetchCompetition",
        this.$route.params.id
      );
    } else {
      this.competitionLoaded = true;
      this.$store.commit("statistics/setRankingIsLoading", false);
    }
  },
  methods: {
    navToCompetitionDetails() {
      this.$router.push(`/competitions/details/${this.$route.params.id}/`);
    },
    changeTab(index) {
      this.selected = index;
      switch (this.selected) {
        case 1:
          this.display = "month";
          break;
        case 2:
          this.display = "semianual";
          break;
        default:
          this.display = "week";
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/rank-page";
</style>
