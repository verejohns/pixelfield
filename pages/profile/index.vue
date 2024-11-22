<template>
  <div class="profile">
    <div class="profile__main">
      <div class="profile__main__content">
        <div class="profile__main__content__info">
          <div
            v-if="user.avatarUrl"
            class="profile__main__content__info__photo"
            :style="{ backgroundImage: 'url(' + user.avatarUrl + ')' }"
          ></div>
          <div v-else class="profile__main__content__info__temp-avatar">
            {{ user.name.charAt(0) }}
          </div>
          <div class="profile__main__content__info__info">
            <div class="profile__main__content__info__info__user-name">
              {{ user.name }}
            </div>
            <div class="flex-user-role">
              <div class="profile__main__content__info__info__user-email">
                {{ user.email }}
              </div>
              <div class="profile__main__content__info__user-role">
                {{ $t(user.role) }}
              </div>
            </div>
            <div v-if="user.school" class="flex-user-role">
              <div class="profile__main__content__info__info__user-email">
                {{ user.school }}
              </div>
            </div>
          </div>
        </div>
        <NuxtLink to="/profile/edit">
          <v-btn
            depressed
            color="primary"
            class="profile__main__content__button"
            >{{ $t("update_profile") }}</v-btn
          >
        </NuxtLink>
      </div>
    </div>
    <div class="profile__body">
      <div class="view-heading-with-link">
        <div class="profile__body__heading">{{ $t("my_achievements") }}</div>
        <NuxtLink to="/store" class="profile__body__visit-store">
          {{ $t("visit_store") }}
        </NuxtLink>
      </div>
      <div class="profile__currencies">
        <CurrencyCard :amount="userMoney" />
        <CurrencyCard
          class="profile__currencies__spacing"
          :is-coin="false"
          :amount="userDiamonds"
        />
      </div>
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
        <div class="no-best-place" @click="toCompetitions">
          {{ $t("no_best_place") }}
        </div>
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
import CurrencyCard from "~/components/ui/CoinCard.vue";

export default {
  name: "Profile",
  components: {
    Loading,
    InformationCard,
    RankingTile,
    Tab,
    PreviousTask,
    CurrencyCard,
  },
  data() {
    return {
      tabs: [this.$t("tests"), this.$t("competitions")],
      tab: this.$t("tests"),
      user: {
        name: this.$auth.user.full_name,
        email: this.$auth.user.email,
        avatarUrl: this.$auth.user.avatar,
        role: this.$auth.user.role,
        school: this.$auth.user.school,
      },
    };
  },
  computed: {
    ...mapGetters({
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
    userMoney() {
      return this.$auth.user.money_count;
    },
    userDiamonds() {
      return this.$auth.user.diamonds_count;
    },
    userOpenedCompetitions() {
      return this.$auth.user.opened_competitions;
    },
  },
  created() {
    if (!this.$route.query.from) {
      this.$store.dispatch("statistics/fetchTest");
      this.$store.dispatch("statistics/fetchLearning");
      this.$store.dispatch("statistics/fetchStudy");
      this.$store.dispatch("statistics/fetchPastTests");
      this.$store.dispatch("statistics/fetchPastCompetitions");
      this.$store.dispatch("user/fetchBestCompetition");
      this.$store.dispatch("user/fetchUserInformation");
    }
  },
  methods: {
    changeTab(tab) {
      this.tab = tab;
    },
    toCompetitions() {
      this.$router.push("/competitions/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/profile/profile";
</style>
