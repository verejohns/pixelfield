<template>
  <div class="profile">
    <div class="profile__main">
      <div class="profile__main__content">
        <div v-if="!studentIsLoading" class="profile__main__content__info">
          <div
            v-if="student.avatarUrl"
            class="profile__main__content__info__photo"
            :style="{ backgroundImage: 'url(' + student.avatarUrl + ')' }"
          ></div>
          <div v-else class="profile__main__content__info__temp-avatar">
            {{ student.display_name.charAt(0) }}
          </div>
          <div class="profile__main__content__info__info">
            <div class="profile__main__content__info__info__user-name">
              {{ student.display_name }}
            </div>
          </div>
          <div class="profile__main__content__info__user-role">
            {{ $t(student.level) }}
          </div>
        </div>
        <Loading v-else />
      </div>
    </div>
    <div class="profile__body">
      <div class="profile__body__heading">
        <img
          class="profile__body__heading__img"
          src="~/assets/icons/check-circle.svg"
        />
        <span>
          {{ $t("tests") }}
        </span>
      </div>
      <InformationCard
        v-if="!testIsLoading"
        :data="test"
        :is-test="true"
        :show-heading="false"
      />
      <Loading v-else />
      <div class="profile__body__heading">
        <img
          class="profile__body__heading__img"
          src="~/assets/icons/book.svg"
        />
        <span>
          {{ $t("learning") }}
        </span>
      </div>
      <InformationCard
        v-if="!learningIsLoading"
        :data="learning"
        :is-learning="true"
        :show-heading="false"
      />
      <Loading v-else />
      <div class="view-flex">
        <img class="view-margin-right-16" src="~/assets/icons/crown.svg" />
        <div class="view-heading">
          {{ $t("competitions_best_place") }}
        </div>
      </div>
      <div
        v-if="!bestRankingIsLoading && bestRanking.results.length"
        class="profile__best-competitions"
      >
        <RankingTile :id="4" :data="bestRanking.results[0]" />
      </div>
      <div
        v-else-if="!bestRankingIsLoading && !bestRanking.results.length"
        :style="{ textAlign: 'center' }"
      >
        No best place data (no rank at the moment?)
      </div>
      <Loading v-else />
      <div class="profile__body__heading">
        <img
          class="profile__body__heading__img"
          src="~/assets/icons/timer.svg"
        />
        <span>
          {{ $t("time_spent_on_studying") }}
        </span>
      </div>
      <InformationCard
        v-if="!studyIsLoading"
        :data="study"
        :is-time="true"
        :show-heading="false"
      />
      <Loading v-else />
      <div class="view-heading">
        {{ $t("past_activities") }}
      </div>
      <Tab :tabs="tabs" class="view-margin-bottom-24" @change-tab="changeTab" />
      <div v-if="!pastTestsIsLoading && tab === tabs[0]">
        <PreviousTask
          v-for="(t, idx) in pastTests.results.slice(0, 4)"
          :key="t.id"
          :is-test="true"
          :task-id="t.id"
          :is-completed="t.completion_status === 'completed'"
          :number="idx + 1"
          :title="t.test.title"
          :date="t.date ? $moment(t.date).format('DD/MM/YY HH:mm') : ''"
          :minutes="$moment.utc(t.time_spend * 1000).format('m')"
          :attempts="t.attempts"
          :points="calcPoints(t)"
          :test="t.test"
          :stars="t.star_count"
          :nav-to-test="true"
        />
      </div>
      <div v-else-if="!pastCompetitionsIsLoading && tab === tabs[1]">
        <div
          v-for="openComp in userOpenedCompetitions"
          :key="`comp_${openComp.id}`"
        >
          <PreviousTask
            :competition="openComp"
            :lives="openComp.lives"
            :stars="openComp.star_count"
            :points="openComp.points"
            :is-completed="openComp.completion_status"
            :nav-to-comp="true"
            :is-test="false"
          />
        </div>
      </div>
      <Loading v-else />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loading from "~/components/ui/Loading.vue";
import InformationCard from "~/components/stats/InformationCard.vue";
import RankingTile from "~/components/ui/RankingTile.vue";
import Tab from "~/components/coach/Tab";
import PreviousTask from "~/components/ui/PreviousTask.vue";

export default {
  name: "Profile",
  components: {
    Loading,
    InformationCard,
    RankingTile,
    Tab,
    PreviousTask,
  },
  data() {
    return {
      tabs: [this.$t("tests"), this.$t("competitions")],
      tab: this.$t("tests"),
      user: {
        name: this.$auth.user.full_name,
        email: this.$auth.user.email,
        avatarUrl: this.$auth.user.avatar,
      },
    };
  },
  computed: {
    ...mapGetters({
      student: "user/student",
      studentIsLoading: "user/studentIsLoading",
      test: "statistics/test",
      testIsLoading: "statistics/testIsLoading",
      learning: "statistics/learning",
      learningIsLoading: "statistics/learningIsLoading",
      study: "statistics/study",
      studyIsLoading: "statistics/studyIsLoading",
      pastTests: "statistics/pastTests",
      pastTestsIsLoading: "statistics/pastTestsIsLoading",
      pastCompetitions: "statistics/pastCompetitions",
      pastCompetitionsIsLoading: "statistics/pastCompetitionsIsLoading",
      bestRanking: "user/bestRanking",
      bestRankingIsLoading: "user/bestRankingIsLoading",
    }),
    calcPoints() {
      return (t) => {
        return t.total_points !== undefined && t.max_points !== undefined
          ? `${t.total_points}/${t.max_points}`
          : t.max_points;
      };
    },
    userOpenedCompetitions() {
      return this.$auth.user.opened_competitions;
    },
  },
  created() {
    if (!this.$route.query.from) {
      const userId = this.$route.params.id;
      this.$store.dispatch("user/fetchStudent", userId);
      this.$store.dispatch("statistics/fetchTest", userId);
      this.$store.dispatch("statistics/fetchLearning", userId);
      this.$store.dispatch("statistics/fetchStudy", userId);
      this.$store.dispatch("statistics/fetchPastTests", userId);
      this.$store.dispatch("statistics/fetchPastCompetitions", userId);
      this.$store.dispatch("user/fetchBestCompetition", userId);
    }
  },
  methods: {
    changeTab(tab) {
      this.tab = tab;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/profile/profile";
</style>
