<template>
  <div class="tests">
    <div class="tests__top" :style="{ backgroundColor: currentSerie.color }">
      <div class="tests__guidance">
        <div class="tests__guidance__link" @click="toCategories">
          <img src="~/assets/icons/left-arrow.svg" />
          <div class="tests__guidance__text">{{ currentSerie.name }}</div>
        </div>
        <div class="tests__level" @click="showLevelModal">{{ levelLabel }}</div>
        <LevelModal
          v-if="isVisibleLevelModal"
          :level="level"
          @close="closeModal"
        />
      </div>
    </div>
    <div class="tests__content">
      <div class="tests__description">
        <img :src="currentCategory.image" />
        <div class="tests__description__content">
          <div class="tests__description__content__title">
            {{ currentCategory.name }}
          </div>
          <DynamicShow :label="currentCategory.description" />
          <div class="tests__description__progress">
            <div class="tests__description__progress__value">
              <template v-if="currentCategory.testsPercentage !== null">
                {{ roundedPercentage }}%
              </template>
            </div>
            <div class="progress-container">
              <progress-bar
                v-if="currentCategory.testsPercentage !== null"
                size="medium"
                :val="currentCategory.testsPercentage"
                :bar-border-radius="5"
                bar-color="#4B79D2"
              ></progress-bar>
            </div>
          </div>
        </div>
      </div>
      <div class="tests__main">
        <div v-for="(item, index) in tests" :key="`test-${index}-${item.id}`">
          <div v-if="showTest(item)">
            <TestItem
              :test="item"
              :index="index + 1"
              :current-serie="currentSerie"
              :current-category="currentCategory"
            />
          </div>
        </div>
      </div>
      <div class="tests__learn">
        <InfoCard
          v-if="lesson"
          :card="{
            icon: 'whh_student',
            title: $t('study'),
            subtitle: lesson.title,
            text: lesson.description,
            image: lesson.thumbnail_image,
            link: lesson.link,
          }"
          class="tests__learn__item"
        />
        <InfoCard
          v-if="article"
          :card="{
            icon: 'book',
            title: $t('sachopedie'),
            subtitle: article.title,
            text: article.description,
            image: article.thumbnail_image,
            link: article.link,
          }"
          class="tests__learn__item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from "vue-simple-progress";
import LevelModal from "~/components/tests/LevelModal";
import TestItem from "~/components/tests/TestItem";
import DynamicShow from "~/components/ui/DynamicShow";
import InfoCard from "~/components/ui/InfoCard";

export default {
  name: "Tests",
  components: {
    ProgressBar,
    LevelModal,
    DynamicShow,
    InfoCard,
    TestItem,
  },
  auth: false,
  async asyncData({ app, params, route, store, query }) {
    if (query.serie !== undefined || query.category !== undefined) {
      await store.dispatch("testsList/fetchTests", {
        serieId: Number(query.serie),
        categoryId: Number(query.category),
      });
    }
    if (store.state.testsList.series.length === 0) {
      await store.dispatch("testsList/fetchSeries");
    }
    if (store.state.testsList.categories.length === 0) {
      await store.dispatch("testsList/fetchCategories", query.serie);
    }
  },
  data() {
    return {
      isVisibleLevelModal: false,
      level: this.$store.state.testsList.level,
      play: false,
    };
  },
  computed: {
    roundedPercentage() {
      return Math.round(this.currentCategory.testsPercentage);
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
        return this.$store.state.testsList.series.find(
          (item) => item.id === Number(this.$route.query.serie)
        );
      }
      return null;
    },
    currentCategory() {
      if (this.$route.query.category !== undefined) {
        return this.$store.state.testsList.categories.find(
          (item) => item.id === Number(this.$route.query.category)
        );
      }
      return null;
    },
    tests() {
      const downloadedTests = this.$store.state.testsList.tests;
      const categoryTests = [];
      let i = 1;
      for (const test of downloadedTests.sort((a, b) =>
        a.priority > b.priority ? 1 : b.priority > a.priority ? -1 : 0
      )) {
        console.log("test", test);
        if (this.showTest(test)) {
          categoryTests.push({
            id: test.id,
            number: i++,
            selected: test.completionStatus,
            title: test.title,
            review: test.bestStarResult,
            question: test.numOfQuestions,
            duration: test.duration,
            difficulty: test.difficulty,
            priority: test.priority,
          });
        }
      }
      return categoryTests;
    },
    article() {
      const ca = this.currentCategory.chesspediaArticle;
      if (ca) {
        return {
          title: ca.title,
          description: ca.description,
          image: ca.thumbnailImage,
          link: `/blog/post-detail/${ca.id}/`,
        };
      }
      return null;
    },
    lesson() {
      const sl = this.currentCategory.studyLesson;
      if (sl) {
        return {
          title: sl.title,
          description: sl.description,
          image: null,
          link: `/blog/post-detail/${sl.id}/`,
        };
      }
      return null;
    },
  },
  mounted() {
    console.log("current categru", this.currentCategory);
  },
  created() {
    this.play = Object.keys(this.$route.query).includes("play");
    if (this.play) {
      for (let i = 0; i < this.tests.length; i++) {
        const test = this.tests[i];
        if (test.selected !== "completed") {
          this.play = false;
          this.$router.push(`tests/board?test=${test.id}`);
          break;
        }
      }
    }
    if (this.play) {
      for (let i = 0; i < this.tests.length; i++) {
        const test = this.tests[i];
        this.$router.push(`tests/board?test=${test.id}`);
      }
    }
  },
  methods: {
    toCategories() {
      this.$router.push(`/tests/categories?serie=${this.$route.query.serie}`);
    },
    showTest(test) {
      const level = this.$store.state.testsList.level;
      if (level === "all levels") {
        return true;
      } else if (level === test.difficulty) {
        return true;
      } else {
        return false;
      }
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
@import "/assets/scss/pages/tests/tests";
</style>
