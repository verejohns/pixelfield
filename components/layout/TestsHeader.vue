<template>
  <div
    class="tests-header"
    :class="$route.name"
    :style="{ backgroundColor: topColor }"
  >
    <div class="tests-header__container" :class="$route.name">
      <div
        v-if="!$route.name.includes('-board')"
        class="tests-header__menu mobile"
      >
        <img
          v-if="$route.name.includes('-series')"
          class="tests-header__menu__icon"
          src="~/assets/icons/menu-white.svg"
          @click="menuOpened = true"
        />
        <img
          v-else
          class="tests-header__menu__icon"
          src="~/assets/icons/menu-black.svg"
          @click="menuOpened = true"
        />
        <NavMenu
          v-if="menuOpened"
          :page="$route.name"
          @close-menu="closeMenu"
        />
      </div>
      <div
        v-if="!$route.name.includes('-board')"
        class="tests-header__left-avatar desktop"
      >
        <nuxt-link :to="profileLink">
          <img
            v-if="$auth.user.avatar"
            :src="$auth.user.avatar"
            class="tests-header__avatar"
          />
          <div v-else class="tests-header__temp-avatar">
            {{ $auth.user.full_name.charAt(0) }}
          </div>
        </nuxt-link>
        <div class="tests-header__username" :class="$route.name">
          {{ $auth.user.full_name }}
        </div>
      </div>
      <div
        class="tests-header_logo"
        :class="$route.name.includes('-board') ? 'desktop' : ''"
      >
        My-Chess
      </div>
      <ul class="tests-header__nav">
        <li
          v-if="!$route.name.includes('-board')"
          class="tests-header__nav__item mobile"
        >
          <a class="tests-header__nav__item__link">
            <img
              v-if="$auth.user.avatar"
              :src="$auth.user.avatar"
              class="tests-header__avatar"
            />
            <div v-else class="tests-header__temp-avatar">
              {{ $auth.user.full_name.charAt(0) }}
            </div>
          </a>
        </li>
        <li
          v-if="$route.name.includes('-board')"
          class="tests-header__nav__item desktop"
        >
          <a class="tests-header__nav__item__link">
            <img
              v-if="$auth.user.avatar"
              :src="$auth.user.avatar"
              class="tests-header__avatar"
            />
            <div v-else class="tests-header__temp-avatar">
              {{ $auth.user.full_name.charAt(0) }}
            </div>
          </a>
        </li>
        <li
          class="
            hide-mobile
            tests-header__nav__item tests-header__icon tests-header__coin-icon
            desktop
          "
        >
          <img src="~/assets/icons/coin.svg" />
          <div class="tests-header__icon__label">
            {{ $auth.user.money_count }}
          </div>
        </li>
        <li
          class="hide-mobile tests-header__nav__item tests-header__icon desktop"
        >
          <img src="~/assets/icons/diamond.svg" />
          <div class="tests-header__icon__label">
            {{ $auth.user.diamonds_count }}
          </div>
        </li>
      </ul>
      <div
        v-if="$route.name.includes('-board')"
        class="tests-header__board mobile hide-mobile"
        :class="$route.name"
      >
        <div class="tests-header__board__info">
          <img
            v-if="$auth.user.avatar"
            :src="$auth.user.avatar"
            class="tests-header__board__photo"
          />
          <div v-else class="tests-header__temp-avatar">
            {{ $auth.user.full_name.charAt(0) }}
          </div>
          <div class="tests-header__board__name">
            {{ $auth.user.full_name }}
          </div>
        </div>
        <div class="tests-header__board__status" :class="$route.name">
          {{ $store.state.tests.iterator + 1 }} / {{ questions.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavMenu from "~/components/layout/NavMenu";

export default {
  name: "TestsHeader",
  components: {
    NavMenu,
  },
  data() {
    return {
      menuOpened: false,
      page: "tests",
      coins: 23,
      diamonds: 2,
    };
  },
  computed: {
    profileLink() {
      return this.$auth.user.role === "coach" ? "/coach" : "/profile";
    },
    questions() {
      return this.$store.state.tests.questions;
    },
    topColor() {
      if (this.$route.query.serie !== undefined) {
        if (this.$route.name.includes("study"))
          return this.$store.state.studyList.series.find(
            (item) => item.id === Number(this.$route.query.serie)
          ).color;
        else
          return this.$store.state.testsList.series.find(
            (item) => item.id === Number(this.$route.query.serie)
          ).color;
      }
      return null;
    },
  },
  methods: {
    closeMenu() {
      this.menuOpened = false;
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/components/layout/tests-header";
</style>
