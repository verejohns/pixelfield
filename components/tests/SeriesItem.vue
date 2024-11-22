<template>
  <div class="series-item">
    <div
      class="series-item__content"
      :style="{ 'background-color': series.color }"
      :to="`/${moduleName}/categories?serie=${series.id}`"
      @click="storeSerieName"
    >
      <img :src="series.image" />
      <div class="series-item__title">{{ series.name }}</div>
      <div class="series-item__progress">
        <div class="series-item__progress__label">
          <template v-if="hasPercentage">{{ roundedTestPercentage }}%</template>
        </div>
        <div class="series-item__progress__progressbar">
          <progress-bar
            v-if="hasPercentage"
            size="medium"
            :val="roundedTestPercentage"
            :bar-border-radius="5"
            bar-color="#4B79D2"
          ></progress-bar>
        </div>
      </div>
    </div>
    <div class="series-item__action" @click="random">
      {{ isTest ? $t("play") : $t("open") }}
    </div>
  </div>
</template>

<script>
import ProgressBar from "vue-simple-progress";

export default {
  name: "SeriesItem",
  components: {
    ProgressBar,
  },
  props: {
    series: {
      type: Object,
      required: true,
      default: null,
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
        ? this.series.testsPercentage !== null
        : this.series.lessonsPercentage !== null;
    },
    roundedTestPercentage() {
      return this.isTest
        ? Math.round(this.series.testsPercentage)
        : Math.round(this.series.lessonsPercentage);
    },
  },
  methods: {
    storeSerieName() {
      localStorage.setItem(
        this.isTest ? "test-serie-name" : "study-serie-name",
        this.series.name
      );
      this.$router.push(
        `/${this.moduleName}/categories?serie=${this.series.id}`
      );
    },
    async random() {
      if (this.isTest) {
        let selected = null;
        await this.$store.dispatch("testsList/fetchCategories", this.series.id);
        const max = this.$store.state.testsList.categories.length;
        for (let i = 0; i < max; i++) {
          const category = this.$store.state.testsList.categories[i];
          if (category.percentage < 100) {
            selected = category;
            break;
          }
        }
        if (selected === null) {
          const index = Math.floor(Math.random() * max);
          selected = this.$store.state.testsList.categories[index];
        }

        await this.$store.dispatch("testsList/fetchTests", {
          serieId: this.series.id,
          categoryId: selected.id,
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
        this.$router.push(`/tests/board?test=${selectedTest.id}`);
      } else {
        let selected = null;
        await this.$store.dispatch("studyList/fetchCategories", this.series.id);
        const max = this.$store.state.studyList.categories.length;
        for (let i = 0; i < max; i++) {
          const category = this.$store.state.studyList.categories[i];
          if (category.percentage < 100) {
            selected = category;
            break;
          }
        }
        if (selected === null) {
          const index = Math.floor(Math.random() * max);
          selected = this.$store.state.studyList.categories[index];
        }

        await this.$store.dispatch("studyList/fetchTests", {
          serieId: this.series.id,
          categoryId: selected.id,
        });

        const maxTest = this.$store.state.studyList.tests.length;
        let selectedTest = null;
        for (let i = 0; i < maxTest; i++) {
          const test = this.$store.state.studyList.tests[i];
          if (test.completionStatus !== "completed") {
            selectedTest = test;
            break;
          }
        }
        if (selectedTest === null) {
          const index = Math.floor(Math.random() * maxTest);
          selectedTest = this.$store.state.studyList.tests[index];
        }
        const study = !this.isTest ? `&study=${true}` : "";

        this.$router.push(`/tests/board?test=${selectedTest.id}${study}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/tests/series-item";
</style>
