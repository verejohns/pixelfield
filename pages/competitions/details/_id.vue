<template>
  <div class="competitions">
    <div class="competitions__header">
      <div class="competitions__header__content">
        <div
          class="competitions__header__content__dashboard"
          @click="toCompetitions"
        >
          <img
            class="competitions__header__content__img"
            src="~/assets/icons/left-arrow-white.svg"
          />
          <div>{{ $t("dashboard_competitions") }}</div>
        </div>
      </div>
      <div v-if="!competitionIsLoading" class="body__comp-tile">
        <CompetitionTile
          :hide-button-on-shrink="true"
          :bottom-icons="false"
          :button-icons="true"
          :competition="competition"
          :is-play="true"
        />
      </div>
      <div
        v-if="$auth.user.paid_until === null && !competitionIsLoading"
        class="subscribe-tile"
      ></div>
      <div
        v-if="!competitionIsLoading"
        class="body__player-tile view-margin-top"
      >
        <template v-for="(test, index) in tests">
          <CompetitionPlayerTile
            :key="`competition_test_${index}`"
            :index="index + 1"
            :test-id="competition.id"
            :test="test"
          />
        </template>
      </div>
      <div v-if="!rankingIsLoading && competitionLoaded" class="body__rankings">
        <div class="body__rankings__heading">
          <div class="body__rankings__title">{{ $t("order_students") }}</div>
          <div
            class="body__rankings__view-all"
            @click="viewRankings(isToSchool ? 'students' : null)"
          >
            {{ $t("view_all") }}
          </div>
        </div>
        <template v-if="isToSchool">
          <v-tabs
            v-model="selectedStudent"
            bright
            background-color="teal darken-3"
            show-arrows
          >
            <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
            <v-tab :key="0" :href="'#tab-0'" @click="changeStudentTab(0)">
              {{ $t("stat_week") }}
            </v-tab>
            <v-tab :key="1" :href="'#tab-1'" @click="changeStudentTab(1)">
              {{ $t("stat_month") }}
            </v-tab>
            <v-tab :key="2" :href="'#tab-2'" @click="changeStudentTab(2)">
              {{ $t("stat_semianual") }}
            </v-tab>
          </v-tabs>
          <div
            :key="`key_student_${displayStudent}`"
            class="body__rankings__list"
          >
            <div
              v-for="(student, index) in rankingRows('students')"
              :key="student.id"
            >
              <RankingTile
                :id="student.position"
                :key="`tile_student_${index}`"
                :data="student"
                :first="student.me"
                :is-school="true"
              />
            </div>
          </div>
        </template>
        <div v-else class="body__rankings__list">
          <div
            v-for="(student, index) in rankingRows('students')"
            :key="student.id"
          >
            <RankingTile
              :id="student.position"
              :key="`tile_student_${index}`"
              :data="student"
              :first="student.me"
              :is-school="true"
            />
          </div>
        </div>
      </div>
      <Loading v-else />

      <div
        v-if="!rankingIsLoading && isToSchool && competitionLoaded"
        class="body__rankings"
      >
        <div class="body__rankings__heading">
          <div class="body__rankings__title">{{ $t("order_schools") }}</div>
          <div
            class="body__rankings__view-all"
            @click="viewRankings('schools_ttl')"
          >
            {{ $t("view_all") }}
          </div>
        </div>
        <template v-if="isToSchool">
          <v-tabs
            v-model="selectedSchool"
            bright
            background-color="teal darken-3"
            show-arrows
          >
            <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
            <v-tab :key="0" :href="'#tab-0'" @click="changeSchoolTab(0)">
              {{ $t("stat_week") }}
            </v-tab>
            <v-tab :key="1" :href="'#tab-1'" @click="changeSchoolTab(1)">
              {{ $t("stat_month") }}
            </v-tab>
            <v-tab :key="2" :href="'#tab-2'" @click="changeSchoolTab(2)">
              {{ $t("stat_semianual") }}
            </v-tab>
          </v-tabs>
          <div
            :key="`key_student_${displaySchool}`"
            class="body__rankings__list"
          >
            <div
              v-for="(student, index) in rankingRows('schools_ttl')"
              :key="student.id"
            >
              <RankingTileSchool
                :id="student.position"
                :key="`tile_school_${index}`"
                :data="student"
                :first="student.me"
                :is-school="true"
              />
            </div>
          </div>
        </template>
      </div>
      <div
        v-if="!rankingIsLoading && isToSchool && competitionLoaded"
        class="body__rankings"
      >
        <div class="body__rankings__heading">
          <div class="body__rankings__title">{{ $t("order_schools_avg") }}</div>
          <div
            class="body__rankings__view-all"
            @click="viewRankings('schools')"
          >
            {{ $t("view_all") }}
          </div>
        </div>
        <template v-if="isToSchool">
          <v-tabs
            v-model="selectedSchoolAvg"
            bright
            background-color="teal darken-3"
            show-arrows
          >
            <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
            <v-tab :key="0" :href="'#tab-0'" @click="changeSchoolAvgTab(0)">
              {{ $t("stat_week") }}
            </v-tab>
            <v-tab :key="1" :href="'#tab-1'" @click="changeSchoolAvgTab(1)">
              {{ $t("stat_month") }}
            </v-tab>
            <v-tab :key="2" :href="'#tab-2'" @click="changeSchoolAvgTab(2)">
              {{ $t("stat_semianual") }}
            </v-tab>
          </v-tabs>
          <div
            :key="`key_student_${displaySchool}`"
            class="body__rankings__list"
          >
            <div
              v-for="(student, index) in rankingRows('schools')"
              :key="student.id"
            >
              <RankingTileSchool
                :id="student.position"
                :key="`tile_school_${index}`"
                :data="student"
                :first="student.me"
                :is-school="true"
                :points-key="'total_points_avg'"
              />
            </div>
          </div>
        </template>
      </div>

      <div v-if="!competitionIsLoading" class="body__play-bottom">
        <div class="body__play-bottom__content">
          <div class="icon-text">
            <img
              class="body__play-bottom__content__icon-spacing"
              src="~/assets/icons/white-time.svg"
            />
            <div>{{ competition.time_limit }} {{ $t("min") }}</div>
          </div>
          <div class="icon-text">
            <img
              class="body__play-bottom__content__icon-spacing"
              src="~/assets/icons/white-heart.svg"
            />
            <div>
              {{ competition.lives }}
              {{ $t("lives") }}
            </div>
          </div>
          <div class="icon-text">
            <img
              class="body__play-bottom__content__icon-spacing"
              src="~/assets/icons/white-restart.svg"
            />
            <div>
              {{ competition.attempts }}
              {{ $t("attempts") }}
            </div>
          </div>
        </div>
        <v-btn
          class="primary button__with-icon body__play-bottom__button"
          @click="navToCompetition"
        >
          {{ $t("play") }}
          <img
            class="button__icon-spacing-right"
            src="~/assets/icons/arrow-right-circle-selected.svg"
        /></v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loading from "~/components/ui/Loading.vue";
import CompetitionTile from "~/components/ui/CompetitionTile.vue";
import CompetitionPlayerTile from "~/components/ui/CompetitionPlayerTile.vue";
import RankingTile from "~/components/ui/RankingTile.vue";
import RankingTileSchool from "~/components/ui/RankingTileSchool.vue";

export default {
  components: {
    Loading,
    CompetitionTile,
    CompetitionPlayerTile,
    RankingTile,
    RankingTileSchool,
  },
  data() {
    return {
      competitionLoaded: false,
      selectedStudent: 0,
      selectedSchool: 0,
      selectedSchoolAvg: 0,
      displayStudent: "week",
      displaySchool: "week",
      displaySchoolAvg: "week",
    };
  },
  computed: {
    ...mapGetters({
      ranking: "statistics/ranking",
      rankingIsLoading: "statistics/rankingIsLoading",
      competition: "statistics/competition",
      competitionIsLoading: "statistics/competitionIsLoading",
    }),
    closed() {
      return (item) =>
        !this.$moment().isBetween(item.active_from, item.active_to, "day");
    },
    tests() {
      const tests = [this.competition.test];
      for (let i = 1; i <= 5; i++) {
        if (this.competition[`test_${i}`] !== null) {
          tests.push(this.competition[`test_${i}`]);
        }
      }
      return tests;
    },
    isToSchool() {
      return this.competitionLoaded && this.competition.is_chess_to_schools;
    },
    rankingRows() {
      return (type) => {
        const display =
          type === "students"
            ? this.displayStudent
            : type === "schools_ttl"
            ? this.displaySchool
            : this.displaySchoolAvg;
        console.log("display", display, "type", type);
        if (this.ranking && this.ranking.results[display][type].length) {
          const items = this.ranking.results[display][type];
          if (items.length <= 5) {
            return items;
          }
          const subset = items.slice(0, 5);
          if (subset.some((row) => row.me) || items.every((row) => !row.me)) {
            return subset;
          }
          const mineRow = items.find((row) => row.me);
          if (mineRow) {
            subset.push(mineRow);
          }
          return subset;
        }
        return [];
      };
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
    this.$store.dispatch("statistics/fetchCompetition", this.$route.params.id);
  },
  methods: {
    viewRankings(type = null) {
      if (!type) {
        this.$router.push(`/ranking/${this.competition.id}/`);
      } else {
        this.$router.push(`/ranking/${this.competition.id}/?type=${type}`);
      }
    },
    toCompetitions() {
      this.$router.push("/competitions/");
    },
    navToCompetition() {
      this.$router.push(
        `/tests/board?test=${this.competition.test.id}&competition=${this.competition.id}`
      );
    },
    changeStudentTab(index) {
      this.selectedStudent = index;
      switch (this.selectedStudent) {
        case 1:
          this.displayStudent = "month";
          break;
        case 2:
          this.displayStudent = "semianual";
          break;
        default:
          this.displayStudent = "week";
          break;
      }
    },
    changeSchoolTab(index) {
      this.selectedSchool = index;
      switch (this.selectedSchool) {
        case 1:
          this.displaySchool = "month";
          break;
        case 2:
          this.displaySchool = "semianual";
          break;
        default:
          this.displaySchool = "week";
          break;
      }
    },
    changeSchoolAvgTab(index) {
      this.selectedSchoolAvg = index;
      switch (this.selectedSchoolAvg) {
        case 1:
          this.displaySchoolAvg = "month";
          break;
        case 2:
          this.displaySchoolAvg = "semianual";
          break;
        default:
          this.displaySchoolAvg = "week";
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/competition-details";
@import "/assets/scss/components/ui/buttons/button";
</style>
