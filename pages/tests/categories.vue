<template>
  <div class="categories">
    <div
      class="categories__top"
      :style="{ backgroundColor: currentSerie.color }"
    >
      <div class="categories__guidance">
        <div class="categories__guidance__content">
          <div class="categories__guidance__link" @click="toSeries">
            <img src="~/assets/icons/left-arrow.svg" />
            <div class="categories__guidance__text">{{ $t("tests") }}</div>
          </div>
          <div class="categories__level" @click="showLevelModal">
            {{ levelLabel }}
          </div>
          <LevelModal
            v-if="isVisibleLevelModal"
            :level="level"
            @close="closeModal"
          />
        </div>
        <div class="categories__title">{{ currentSerie.name }}</div>
      </div>
    </div>
    <div class="categories__content">
      <div v-if="!categoriesIsLoading" class="categories__content__list">
        <div v-for="(category, i) in categories" :key="i">
          <CategoryItem
            v-if="shouldShowCategory(category)"
            :serie-name="currentSerie.name"
            :category="category"
            :resize="i === 1"
          />
        </div>
      </div>
      <Loading v-else />
      <div class="categories__content__learn">
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loading from "~/components/ui/Loading.vue";
import CategoryItem from "~/components/tests/CategoryItem";
import InfoCard from "~/components/ui/InfoCard";
import LevelModal from "~/components/tests/LevelModal";
import Favourites from "~/components/sachopedie/SachopedieFavouritesTab.vue";

export default {
  name: "Categories",
  components: {
    Loading,
    CategoryItem,
    InfoCard,
    LevelModal,
    Favourites,
  },
  auth: false,
  async asyncData({ app, params, route, store, query }) {
    if (store.state.testsList.series.length === 0) {
      await store.dispatch("testsList/fetchSeries");
    }
  },
  data() {
    return {
      isVisibleLevelModal: false,
      level: this.$store.state.testsList.level,
    };
  },
  computed: {
    ...mapGetters({
      series: "testsList/getSeries",
      categories: "testsList/getCategories",
      categoriesIsLoading: "testsList/categoriesIsLoading",
    }),
    shouldShowCategory() {
      return (category) => {
        if (!["easy", "medium", "hard"].includes(this.currentLevel)) {
          return true;
        }
        return (
          (category.isEasy && this.currentLevel === "easy") ||
          (category.isMedium && this.currentLevel === "medium") ||
          (category.isHard && this.currentLevel === "hard")
        );
      };
    },
    currentLevel() {
      return this.$store.state.testsList.level;
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
    currentSerie() {
      if (this.$route.query.serie !== undefined) {
        return this.series.find(
          (item) => item.id === Number(this.$route.query.serie)
        );
      }
      return null;
    },
    randomArticle() {
      const articles = this.categories
        .filter((category) => {
          return category.chesspediaArticle;
        })
        .map((category) => category.chesspediaArticle)
        .filter(
          (article, index, self) =>
            index === self.findIndex((a) => a.id === article.id)
        )
        .map((article) => {
          return {
            title: article.title,
            description: article.description,
            image: article.thumbnailImage,
            link: `/blog/post-detail/${article.id}/`,
          };
        });
      return articles.length
        ? articles[Math.floor(Math.random() * articles.length)]
        : null;
    },
  },
  mounted() {
    if (this.$route.query.serie !== undefined) {
      this.$store.dispatch(
        "testsList/fetchCategories",
        this.$route.query.serie
      );
    }
  },
  methods: {
    toSeries() {
      this.$router.push("/tests/series/");
    },
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
@import "/assets/scss/pages/tests/categories";
</style>
