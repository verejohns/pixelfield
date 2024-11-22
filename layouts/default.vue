<template>
  <div id="application" :class="showFooter ? 'footer-padding' : ''" data-app>
    <OnboardingHeader v-if="isOnboardingPage" />
    <AuthHeader v-if="isAuthPage" />
    <BlogHeader
      v-if="isDefaultPage"
      :style="{ backgroundColor: footerColors.bg, color: footerColors.text }"
      :color="footerColors.text === '#FFF' ? 'white' : 'black'"
    />
    <div>
      <Nuxt />
    </div>
    <DefaultFooter
      v-if="showFooter"
      :color="footerColors.text === '#FFF' ? 'white' : 'black'"
    />
  </div>
</template>
<script>
import OnboardingHeader from "~/components/layout/OnboardingHeader";
import AuthHeader from "~/components/layout/AuthHeader";
import BlogHeader from "~/components/layout/LayoutBlogHeader.vue";
import DefaultFooter from "~/components/layout/DefaultFooter.vue";

export default {
  components: {
    OnboardingHeader,
    AuthHeader,
    BlogHeader,
    DefaultFooter,
  },
  computed: {
    isAuthPage() {
      return (
        !this.$auth.$state.loggedIn && !this.$route.name.includes("onboarding")
      );
    },
    isOnboardingPage() {
      return (
        this.$route.name === "onboarding" ||
        this.$route.name === "check-components"
      );
    },
    isExactTestsPage() {
      return this.$route.name && this.$route.name === "tests-board";
    },
    isDefaultPage() {
      return !this.isOnboardingPage && !this.isAuthPage;
    },
    showFooter() {
      return (
        this.$route.name &&
        this.$route.name !== "coach-invite-students" &&
        this.$route.name !== "coach-new-group" &&
        this.$route.name !== "user-hire-a-coach" &&
        !this.$route.name.includes("coach-edit-group") &&
        this.$route.name !== "tests-board" &&
        this.$route.name !== "tests-detail" &&
        this.$route.name !== "competitions-details-id" &&
        this.$route.name !== "training-plans-video-id" &&
        this.$route.name !== "training-plans-article-id"
      );
    },
    footerColors() {
      const route = this.$route.name;
      const query = this.$route.query;
      if (
        (route === "tests-categories" ||
          route === "study-categories" ||
          route === "tests" ||
          route === "tests-detail" ||
          (route === "study-detail" && query.category !== undefined) ||
          (route === "study" && query.category !== undefined)) &&
        query.serie !== undefined
      ) {
        const qs = route.includes("tests") ? "testsList" : "studyList";
        const serie = this.$store.state[qs].series.find(
          (item) => item.id === Number(this.$route.query.serie)
        );
        if (serie) {
          return { bg: serie.color, text: "#24282A" };
        }
      }
      return { bg: "#71AB4F", text: "#FFF" };
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/global.scss";
</style>
