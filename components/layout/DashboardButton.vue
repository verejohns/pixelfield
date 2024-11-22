<template>
  <div class="dashboard-button" @click="toRoute">
    <img class="dashboard-button__icon" :src="getImage" />
    <div class="dashboard-button__text">{{ getText }}</div>
  </div>
</template>

<script>
export default {
  props: {
    isHome: {
      type: Boolean,
      default: false,
    },
    isProfile: {
      type: Boolean,
      default: false,
    },
    isBlog: {
      type: Boolean,
      default: false,
    },
    isCoach: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getText() {
      return this.isHome
        ? this.$t("home")
        : this.isProfile
        ? this.$t("profile")
        : this.isCoach
        ? this.$t("coach")
        : this.$t("blog");
    },
    getImage() {
      return this.isHome
        ? require("~/assets/icons/home.svg")
        : this.isProfile || this.isCoach
        ? require("~/assets/icons/user.svg")
        : require("~/assets/icons/blog.svg");
    },
  },
  methods: {
    toRoute() {
      this.$emit("closeDashboard");
      return this.isHome
        ? this.$router.push("/")
        : this.isProfile
        ? this.$router.push("/profile/")
        : this.isCoach
        ? this.$router.push("/coach/")
        : this.$router.push("/blog/post-list/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/layout/blog-header";
</style>
