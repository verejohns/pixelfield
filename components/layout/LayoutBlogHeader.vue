<template>
  <div class="default-header">
    <div>
      <img class="view-show-mobile" :src="menuIcon" @click="dashboard = true" />
      <div
        class="default-header__title"
        :class="{ 'view-hide-mobile': showRewards }"
      >
        <img class="logo" :src="getImage" @click="toHome" />
      </div>
    </div>
    <Dashboard
      v-if="dashboard"
      :categories="categories"
      :dashboard-left="!showRewards"
      @toRoute="toRoute"
      @closeDashboard="toggleDashboard"
      @click="dashboard = true"
    />
    <div
      :class="isTest ? 'view-hide-mobile' : ''"
      class="right-display view-dashboard-text"
    >
      <div
        class="right-display__text view-hide-mobile dashboard-hover pr-14"
        @click="toggleDashboard"
      >
        {{ $t("dashboard") }}
      </div>
      <img
        :class="[
          'dashboard-hover',
          'view-margin-left',
          'view-hide-mobile',
          !showRewards ? 'mr-16' : '',
          dashboard ? 'view-rotated-180-up' : 'view-rotated-180-down',
        ]"
        :src="chevronColour"
        @click="toggleDashboard"
      />

      <div
        v-if="showRewards"
        class="right-display__divider view-hide-mobile"
        :style="{ background: isColouredHeader ? 'black' : 'white' }"
      />
      <img
        v-if="showRewards"
        class="view-margin-right-4"
        src="~/assets/icons/coin_colour.svg"
      />
      <div v-if="showRewards" class="right-display__text view-margin-right-16">
        {{ showMoney }}
      </div>
      <img
        v-if="showRewards"
        class="view-margin-right-4"
        src="~/assets/icons/diamond_colour.svg"
      />
      <div v-if="showRewards" class="right-display__text view-margin-right-32">
        {{ showDiamonds }}
      </div>

      <NuxtLink to="/profile/">
        <img
          v-if="$auth.user.avatar"
          :src="$auth.user.avatar"
          class="default-header__avatar"
        />
        <div v-else class="default-header__temp-avatar">
          <div>
            {{ $auth.user.full_name.charAt(0) }}
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import Dashboard from "~/components/layout/Dashboard.vue";
export default {
  name: "DefaultHeader",
  components: {
    Dashboard,
  },
  data() {
    return {
      categories: [
        "Procvičovat",
        "Šachopedie",
        "Učit se",
        "Videa",
        "Statistiky",
        "Kurzy",
        "Sbírka",
        "Obchodník",
        "Soutěžit",
      ],
      menuOpened: false,
      page: "profile",
      dashboard: false,
    };
  },
  computed: {
    isTestBard() {
      return this.$route.name === "tests-board";
    },
    isMobile() {
      console.log("window.innerWidth", window.innerWidth);
      return window.innerWidth < 768;
    },
    showMoney() {
      return this.$auth.user ? this.$auth.user.money_count : "";
    },
    showDiamonds() {
      return this.$auth.user ? this.$auth.user.diamonds_count : "";
    },
    getImage() {
      return this.isColouredHeader
        ? require("~/assets/icons/logo-dark.svg")
        : require("~/assets/icons/logo-light.svg");
    },
    showRewards() {
      if (this.isMobile && this.isTestBard) {
        return false;
      }
      return true;
    },
    isTest() {
      return this.$route.query.test;
    },
    isColouredHeader() {
      const route = this.$route.name;
      const query = this.$route.query;
      return (
        route.includes("tests-categories") ||
        route.includes("tests-detail") ||
        route.includes("study-categories") ||
        (route.includes("study") && query.serie && query.category) ||
        route.includes("study-detail")
      );
    },
    chevronColour() {
      return this.isColouredHeader
        ? require("~/assets/icons/chevron-down.svg")
        : require("~/assets/icons/chevron-down-white.svg");
    },
    menuIcon() {
      return this.isColouredHeader
        ? require("~/assets/icons/menu-black.svg")
        : require("~/assets/icons/menu-white.svg");
    },
  },
  methods: {
    toHome() {
      this.$router.push("/");
    },
    toRoute(route) {
      this.dashboard = false;
      switch (route) {
        case this.categories[0]:
          return this.$router.push("/tests/series/");
        case this.categories[1]:
          // return this.$router.push(
          //   "www.sachy-dolmen.cz/sachopedie/sachopedie-rozcestnik"
          // );
          return 0;
        case this.categories[2]:
          return this.$router.push("/study/series/");
        case this.categories[3]:
          return this.$router.push("/blog/post-list?blogCategory=videos");
        case this.categories[4]:
          return this.$router.push("/user/");
        case this.categories[5]:
          return this.$router.push("/training-plans/");
        case this.categories[6]:
          return this.$router.push("/store/collection/");
        case this.categories[7]:
          return this.$router.push("/store/");
        case this.categories[8]:
          return this.$router.push("/competitions/");
      }
    },
    toggleDashboard() {
      this.dashboard = !this.dashboard;
    },
    closeMenu() {
      this.menuOpened = false;
    },
    logout() {
      this.$auth.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/components/layout/layout-blog-header";
</style>
