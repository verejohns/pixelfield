<template>
  <div class="series">
    <div class="series__top">
      <div class="series__guidance">
        <div class="series__guidance__content">
          <div>
            <nuxt-link :to="backLink" class="series__guidance__link">
              <img src="~/assets/icons/left-arrow-white.svg" />
              <div class="series__guidance__text">{{ $t("dashboard") }}</div>
            </nuxt-link>
            <div class="series__title">{{ $t("tests") }}</div>
          </div>
          <div class="series__level-wrap">
            <div class="series__level" @click="showLevelModal">
              {{ levelLabel }}
            </div>
            <!-- <img src="~/assets/icons/search.svg" /> -->
            <LevelModal
              v-if="isVisibleLevelModal"
              :level="level"
              @close="closeModal"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="!seriesIsLoading" class="series__content">
      <div class="series__content__list">
        <SeriesItem v-for="(item, i) in levelSeries" :key="i" :series="item" />
      </div>
      <div class="series__content__learn">
        <InfoCard
          v-if="randomArticle"
          :card="{
            icon: 'whh_student',
            title: $t('study'),
            subtitle: randomArticle.title,
            text: randomArticle.description,
            image: randomArticle.thumbnail_image,
            link: randomArticle.link,
          }"
        />
        <Favourites :page-name="$t('tests')" :limit="true" />
      </div>
    </div>
    <Loading v-else :show-background="false" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SeriesItem from "~/components/tests/SeriesItem";
import InfoCard from "~/components/ui/InfoCard";
import LevelModal from "~/components/tests/LevelModal";
import Loading from "~/components/ui/Loading.vue";
import Favourites from "~/components/sachopedie/SachopedieFavouritesTab.vue";
export default {
  name: "Series",
  components: {
    SeriesItem,
    Favourites,
    Loading,
    InfoCard,
    LevelModal,
  },
  auth: false,
  data() {
    return {
      isVisibleLevelModal: false,
      level: this.$store.state.testsList.level,
    };
  },
  computed: {
    ...mapGetters({
      series: "testsList/getSeries",
      seriesIsLoading: "testsList/getSeriesIsLoading",
    }),
    backLink() {
      return this.$auth.loggedIn ? "/" : "/landing";
    },
    levelSeries() {
      return this.series.filter((serie) => {
        if (!["easy", "medium", "hard"].includes(this.currentLevel)) {
          return true;
        }
        return (
          (serie.isEasy && this.currentLevel === "easy") ||
          (serie.isMedium && this.currentLevel === "medium") ||
          (serie.isHard && this.currentLevel === "hard")
        );
      });
    },
    currentLevel() {
      return this.$store.state.testsList.level;
    },
    randomArticle() {
      const articles = this.series
        .filter((serie) => {
          return serie.chesspediaArticles.length;
        })
        .reduce((acc, cur) => {
          return [...acc, ...cur.chesspediaArticles];
        }, [])
        .filter(
          (serie, index, self) =>
            index === self.findIndex((s) => s.id === serie.id)
        )
        .map((article) => {
          return {
            title: article.title,
            description: article.description,
            image: article.thumbnailImage,
            link: `/sachopedie/article/${article.id}/?sectionName=${article.categories[0].sections[0].name}&categoryId=${article.categories[0].id}`,
          };
        });
      return articles.length
        ? articles[Math.floor(Math.random() * articles.length)]
        : null;
    },
    levelLabel() {
      switch (this.$store.state.testsList.level) {
        case "easy":
          return this.$t("easy");
        case "medium":
          return this.$t("medium");
        case "hard":
          return this.$t("hard");
        default:
          return this.$t("all_levels");
      }
    },
  },
  mounted() {
    this.$store.dispatch("testsList/fetchSeries");
  },
  methods: {
    showLevelModal() {
      this.isVisibleLevelModal = true;
    },
    closeModal(levelNew) {
      this.isVisibleLevelModal = false;
      if (levelNew) this.level = levelNew;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/tests/series";
</style>
