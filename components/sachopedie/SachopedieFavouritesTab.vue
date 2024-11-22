<template>
  <div v-if="!favouritesIsLoading">
    <div v-if="favourites.results.length > 0">
      <div
        :class="[
          'view-horiz-favourites',
          'view-margin-bottom-24',
          isMainPage ? 'view-block-main-page' : '',
        ]"
      >
        <div class="main-container__title">
          <img
            class="main-container__title__icon"
            src="~/assets/icons/black-bookmark-outline.svg"
          />
          {{ $t("sachopedie_favourites") }}
        </div>
        <div
          v-if="showViewAll"
          class="main-container__learn-more"
          @click="toFavourites"
        >
          {{ $t("view_all") }}
        </div>
      </div>
      <div :class="{ 'flex-tiles': isSingle }">
        <SachopedieFavouritesTile
          v-for="favourite in favs"
          :key="favourite.id"
          :favourite="favourite"
          :is-single="isSingle"
          :class="{
            'view-margin-bottom-24': !isSingle,
            'flex-tiles_margin': isSingle,
          }"
        />
      </div>
    </div>
  </div>
  <Loading v-else-if="$auth.loggedIn" />
</template>

<script>
import { mapGetters } from "vuex";
import SachopedieFavouritesTile from "~/components/sachopedie/SachopedieFavouritesTile.vue";
import Loading from "~/components/ui/Loading.vue";
export default {
  components: {
    SachopedieFavouritesTile,
    Loading,
  },
  props: {
    showViewAll: {
      type: Boolean,
      default: true,
    },
    isSingle: {
      type: Boolean,
      default: false,
    },
    isMainPage: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Boolean,
      default: false,
    },
    pageName: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapGetters({
      favourites: "blog/favourites",
      favouritesIsLoading: "blog/favouritesIsLoading",
    }),
    favs() {
      if (this.limit) {
        return this.favourites.results.slice(0, 3);
      }
      return this.favourites.results;
    },
  },
  mounted() {
    if (
      this.$auth.loggedIn &&
      (this.favourites === null || this.favourites.results.length <= 0)
    ) {
      this.$store.dispatch("blog/getChesspediaFavourites");
    }
  },
  methods: {
    toFavourites() {
      this.$router.push(`/sachopedie/bookmarks?pageName=${this.pageName}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/sachopedie/favourites-tab";
</style>
