<template>
  <div class="category-item">
    <div class="category-item__content" @click="open">
      <img :class="resize ? 'view-larger-width' : ''" :src="category.image" />
      <div class="category-item__text">
        <div class="category-item__title-wrap">
          <div class="category-item__title">{{ category.name }}</div>
          <div class="category-item__number">
            {{
              isTest
                ? $tc("tests_l", category.testsCount, {
                    count: category.testsCount,
                  })
                : $tc("themes_l", category.lessonsCount, {
                    count: category.lessonsCount,
                  })
            }}
          </div>
        </div>
        <div class="category-item__progress">
          <div class="category-item__progress__label">
            <template v-if="hasPercentage">{{ roundedPercentage }}%</template>
          </div>
          <div class="category-item__progress__progressbar">
            <progress-bar
              v-if="hasPercentage"
              size="medium"
              :val="roundedPercentage"
              :bar-border-radius="5"
              bar-color="#4B79D2"
            ></progress-bar>
          </div>
        </div>
      </div>
    </div>
    <div class="category-item__action" @click="play">
      {{ isTest ? $t("play") : $t("open") }}
    </div>
  </div>
</template>

<script>
import ProgressBar from "vue-simple-progress";

export default {
  name: "CategoryItem",
  components: {
    ProgressBar,
  },
  props: {
    category: {
      type: Object,
      required: true,
    },
    serieName: {
      type: String,
      default: "",
    },
    resize: {
      type: Boolean,
      default: false,
    },
    isTest: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    moduleName() {
      if (this.$route.name.includes("study")) return "study";
      else return "tests";
    },
    hasPercentage() {
      return this.isTest
        ? this.category.testsPercentage !== null
        : this.category.lessonsPercentage !== null;
    },
    roundedPercentage() {
      return this.isTest
        ? Math.round(this.category.testsPercentage)
        : Math.round(this.category.lessonsPercentage);
    },
  },
  methods: {
    open() {
      localStorage.setItem(
        this.isTest ? "test-category-name" : "study-category-name",
        this.category.name
      );
      this.$router.push(
        `/${this.moduleName}?serie=${this.$route.query.serie}&category=${this.category.id}`
      );
    },
    async play() {
      await this.$store.dispatch("testsList/fetchTests", {
        serieId: this.$route.query.serie,
        categoryId: this.category.id,
      });

      const maxTest = this.$store.state.testsList.tests.length;
      let selectedTest = null;
      for (let i = 0; i < maxTest; i++) {
        const test = this.$store.state.testsList.tests[i];
        if (test.completionStatus !== "completed") {
          selectedTest = test;
          break;
        }
      }
      if (selectedTest === null) {
        const index = Math.floor(Math.random() * maxTest);
        selectedTest = this.$store.state.testsList.tests[index];
      }
      const query = "tests";
      const study = !this.isTest ? `&study=${true}` : "";
      this.$router.push(
        `/${query}/board?test=${selectedTest.id}&serie=${this.$route.query.serie}${study}`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/tests/category-item";
</style>
