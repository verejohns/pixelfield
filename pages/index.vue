<template>
  <div class="home-container">
    <div v-if="show" class="home">
      <div class="position-display">
        <div class="home__stats position-display__1">
          <div class="home__heading">{{ $t("statistics") }}</div>
          <div
            v-if="!testIsLoading && !learningIsLoading && !studyIsLoading"
            class="stats-tile"
          >
            <div
              v-if="$auth.user.avatar"
              class="stats-tile__img"
              :style="{ backgroundImage: `url(${$auth.user.avatar})` }"
            ></div>
            <DefaultAvatar
              v-else
              :size="104"
              :username="$auth.user.full_name"
              class="stats-tile__img"
            />
            <div class="divider" />
            <div class="stats-tile__row mb-mobile">
              <div class="stats-tile__row__left">
                <img
                  class="view-icon-spacing"
                  src="~/assets/icons/check-circle.svg"
                />
                <div>{{ $t("tests") }}</div>
              </div>
              <div class="stats-tile__row__right view-margin-bottom-24-desktop">
                {{ test.completed_tests }} {{ $t("completed") }}
              </div>
            </div>
            <div class="stats-tile__row mb-mobile">
              <div class="stats-tile__row__left">
                <img class="view-icon-spacing" src="~/assets/icons/book.svg" />
                <div>{{ $t("learning") }}</div>
              </div>
              <div
                class="
                  stats-tile__row__right stats-tile__row__right__orange
                  view-margin-bottom-24-desktop
                "
              >
                {{ learning.completed_tests }} {{ $t("completed") }}
              </div>
            </div>
            <div class="stats-tile__row">
              <div class="stats-tile__row__left">
                <img class="view-icon-spacing" src="~/assets/icons/timer.svg" />
                <div>{{ $t("time_spent") }}</div>
              </div>
              <div class="stats-tile__row__right stats-tile__row__right__blue">
                {{ convertTime }}
              </div>
            </div>
          </div>
          <Loading v-else />
        </div>
        <div class="position-display__2">
          <div class="grid-row">
            <NavTile
              :large="true"
              :image="getImage(1)"
              :title="categories[0]"
              @click="toRoute(categories[0])"
            />
            <NavTile
              :large="true"
              :image="getImage(2)"
              :title="categories[1]"
            />
            <NavTile
              :large="true"
              :image="getImage(3)"
              :title="categories[2]"
              @click="toRoute(categories[2])"
            />
          </div>
          <div class="grid-row">
            <NavTile
              :large="true"
              :title="categories[3]"
              :image="getImage(4)"
              @click="toRoute(categories[3])"
            />
            <NavTile
              :large="true"
              :title="categories[4]"
              :image="getImage(5)"
              @click="toRoute(categories[4])"
            />
            <NavTile
              :large="true"
              :title="categories[5]"
              :image="getImage(6)"
              @click="toRoute(categories[5])"
            />
          </div>
          <div class="grid-row">
            <NavTile
              :large="true"
              :title="categories[6]"
              :image="getImage(7)"
              @click="toRoute(categories[6])"
            />
            <NavTile
              :large="true"
              :title="categories[7]"
              :image="getImage(8)"
              @click="toRoute(categories[7])"
            />
            <NavTile
              :large="true"
              :image="getImage(9)"
              :title="categories[8]"
              @click="toRoute(categories[8])"
            />
          </div>
        </div>
      </div>
      <div class="view-all-heading view-margin-top-24">
        <div class="view-align-heading-icon">
          <img class="view-img-spacing" src="~/assets/icons/blog-black.svg" />
          <strong>{{ $t("blog") }}</strong>
        </div>
        <div class="view-all-styling" @click="toBlogs">
          {{ $t("view_all") }}
        </div>
      </div>
      <Loading v-if="blogsIsLoading" />
      <div v-else>
        <div v-for="blog in blogs.results.slice(0, 5)" :key="blog.id">
          <BlogTile :blog="blog" :is-test="true" :preview="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fromSecondsToTime } from "~/utils/common";
import Loading from "~/components/ui/Loading.vue";
import NavTile from "~/components/layout/NavTile.vue";
import BlogTile from "~/components/blog/RecentPost.vue";
import DefaultAvatar from "~/components/ui/DefaultAvatar.vue";

export default {
  components: {
    Loading,
    NavTile,
    BlogTile,
    DefaultAvatar,
  },
  auth: false,
  data() {
    return {
      categories: [
        "Procvičovat",
        "Šachopedie",
        "Učit se",
        "Videa",
        "Statistiky",
        "Kurzy",
        "Sbírka",
        "Obchodník",
        "Soutěžit",
      ],
      show: false,
    };
  },
  computed: {
    ...mapGetters({
      blogsIsLoading: "blog/postsIsLoading",
      blogs: "blog/posts",
      test: "statistics/test",
      testIsLoading: "statistics/testIsLoading",
      learning: "statistics/learning",
      learningIsLoading: "statistics/learningIsLoading",
      study: "statistics/study",
      studyIsLoading: "statistics/studyIsLoading",
    }),
    convertTime() {
      return this.fromSecondsToTime(this.study.total_time);
    },
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$store.dispatch("blog/getPosts");
      this.$store.dispatch("statistics/fetchTest");
      this.$store.dispatch("statistics/fetchLearning");
      this.$store.dispatch("statistics/fetchStudy");
      this.show = true;
    } else {
      this.$router.push("/landing/");
    }
  },
  methods: {
    getImage(id) {
      return require(`~/assets/images/dashboard/large_${id}.png`);
    },
    toBlogs() {
      this.$router.push("/blog/post-list/");
    },
    fromSecondsToTime,
    toRoute(route) {
      switch (route) {
        case this.categories[0]:
          return this.$router.push("/tests/series/");
        case this.categories[1]:
          return (window.href.location =
            "https://sachy-dolmen.cz/sachopedie/sachopedie-rozcestnik");
        // return this.$router.push("/sachopedie/");
        case this.categories[2]:
          return this.$router.push("/study/series/");
        case this.categories[3]:
          return this.$router.go("/blog/post-list?blogCategory=videos");
        case this.categories[4]:
          return this.$router.push("/user/");
        case this.categories[5]:
          return this.$router.push("/training-plans/");
        case this.categories[6]:
          return this.$router.push("/store/collection/");
        case this.categories[7]:
          return this.$router.push("/store/");
        case this.categories[8]:
          return this.$router.push("/competitions/");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/home";
</style>
