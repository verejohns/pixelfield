<template>
  <div class="detail-description">
    <div class="detail-description__text">
      <div class="detail-description__text__title">
        {{ test.title }}
      </div>
      <div class="detail-description__text__content">
        {{ test.content }}
      </div>
    </div>
    <div class="detail-description__action" :style="{ backgroundColor: color }">
      <div class="detail-description__action__top">
        <div class="detail-description__action__wrap">
          <img src="~/assets/icons/alarm.svg" />
          <div>
            {{ $tc("minutes", test.duration, { count: test.duration }) }}
          </div>
        </div>
        <div class="detail-description__action__wrap">
          <img src="~/assets/icons/question.svg" />
          <div>
            {{
              isTest
                ? $tc("questions", test.question, { count: test.question })
                : $tc("comments", test.question, { count: test.question })
            }}
          </div>
        </div>
      </div>
      <Button
        :label="isTest ? $t('play') : $t('open')"
        type="primary"
        size="large"
        icon="arrow-right-circle-selected"
        position="right"
        width="100%"
        height="56px"
        padding-top="20px"
        @click="open"
      />
    </div>
  </div>
</template>

<script>
import Button from "~/components/ui/buttons/Button";

export default {
  name: "DetailDescription",
  components: {
    Button,
  },
  props: {
    color: {
      type: String,
      required: false,
      default: "#85D6F9",
    },
    test: {
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
  },
  methods: {
    open() {
      localStorage.setItem(
        this.isTest ? "test-detail-name" : "study-detail-name",
        this.test.title
      );
      const study = !this.isTest ? `&study=${true}` : "";

      const module = "tests";
      this.$router.push(
        `/${module}/board?test=${this.$route.query.id}&serie=${this.$route.query.serie}&category=${this.$route.query.category}&id=${this.$route.query.id}${study}`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/tests/detail-description";
</style>
