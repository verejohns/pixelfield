<template>
  <div class="categories">
    <div
      class="categories__top"
      :style="{ backgroundColor: currentSerie.color }"
    >
      <div class="categories__guidance">
        <div class="categories__guidance__content">
          <div class="categories__guidance__link" @click="toStudy">
            <img src="~/assets/icons/left-arrow.svg" />
            <div class="categories__guidance__text">{{ $t("study") }}</div>
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
    <div v-if="!categoriesIsLoading" class="categories__content">
      <div class="categories__content__list">
        <div v-for="(category, i) in categories" :key="`category_${i}`">
          <CategoryItem
            v-if="shouldShowCategory(category)"
            :category="category"
            :is-test="false"
          />
        </div>
      </div>
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
        <FavouritesTab :page-name="$t('study')" :limit="true" />
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loading from "~/components/ui/Loading.vue";
import CategoryItem from "~/components/tests/CategoryItem";
import InfoCard from "~/components/ui/InfoCard";
import LevelModal from "~/components/tests/LevelModal";
import FavouritesTab from "~/components/sachopedie/SachopedieFavouritesTab.vue";

export default {
  name: "Categories",
  components: {
    Loading,
    CategoryItem,
    InfoCard,
    LevelModal,
    FavouritesTab,
  },
  auth: false,
  async asyncData({ app, params, route, store, query }) {
    if (store.state.studyList.series.length === 0) {
      await store.dispatch("studyList/fetchSeries");
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
      series: "studyList/series",
      categories: "studyList/categories",
      categoriesIsLoading: "studyList/categoriesIsLoading",
    }),
    levelLabel() {
      switch (this.level) {
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
    shouldShowCategory() {
      return (category) => {
        if (category.isEasy && this.level === "easy") {
          return true;
        } else if (category.isMedium && this.level === "medium") {
          return true;
        } else if (category.isHard && this.level === "hard") {
          return true;
        } else {
          return true;
        }
      };
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
        "studyList/fetchCategories",
        this.$route.query.serie
      );
    }
  },
  methods: {
    toStudy() {
      this.$router.push("/study/series/");
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
