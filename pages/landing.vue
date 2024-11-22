<template>
  <div class="landing">
    <div class="landing__content-container">
      <div class="landing__top-container show-desktop">
        <div class="landing__tile-container">
          <NavTile
            class="view-margin-bottom-29"
            :text="$t('procvičovat')"
            :image="getImage(1)"
            :url="'/tests/series/'"
          />
          <NavTile
            :text="$t('sachopedie')"
            :image="getImage(2)"
            :url="'https://sachy-dolmen.cz/sachopedie/sachopedie-rozcestnik'"
            :external="true"
          />
        </div>
        <AuthTile class="landing__auth-container" />
        <div class="landing__tile-container">
          <NavTile
            class="view-margin-bottom-29 view-margin-left-4"
            :text="$t('naučit_se_šachy')"
            :image="getLandingImage(1)"
            :url="'/study/series/'"
          /><NavTile
            :text="$t('tutoriály')"
            :image="getLandingImage(2)"
            :url="'/blog/post-list/'"
          />
        </div>
      </div>
      <div class="landing__top-container show-mobile">
        <div class="landing__tile-container">
          <NavTile
            :text="$t('procvičovat')"
            :image="getImage(1, true)"
            :url="'/tests/series/'"
          /><NavTile
            class="view-margin-right-8__desktop"
            :text="$t('naučit_se_šachy')"
            :url="'/study/series/'"
            :image="getLandingImage(1, true)"
          />
        </div>
        <AuthTile class="landing__auth-container" />
        <div class="landing__tile-container">
          <NavTile
            :text="$t('sachopedie')"
            :image="getImage(2, true)"
            :url="'https://sachy-dolmen.cz/sachopedie/sachopedie-rozcestnik'"
            :external="true"
          />
          <NavTile
            :text="$t('tutoriály')"
            :image="getLandingImage(2, true)"
            class="view-margin-right-8__desktop"
            :url="'/blog/post-list/'"
          />
        </div>
      </div>
      <div class="landing__middle-container">
        <img
          class="landing-image order-1"
          src="~/assets/images/landing-1.png"
        />
        <div
          class="landing__middle-container__content view-margin-left-31 order-2"
        >
          <div>
            <div class="tag tag__orange">
              <div>{{ $t("oddíly") }}</div>
            </div>
            <div class="landing__middle-container__content__title">
              {{ $t("title1") }}
            </div>
            <div class="landing__middle-container__content__description">
              {{ $t("desc1") }}
            </div>
            <div class="button-login button-login__smaller" @click="toRegister">
              {{ $t("register_free") }}
            </div>
          </div>
        </div>
        <div class="landing__middle-container__content order-4">
          <div>
            <div class="tag tag__blue">
              <div>
                {{ $t("jednotlivci") }}
              </div>
            </div>
            <div class="landing__middle-container__content__title">
              {{ $t("title2") }}
            </div>
            <div class="landing__middle-container__content__description">
              {{ $t("desc2") }}
            </div>
            <div class="button-login button-login__smaller" @click="toRegister">
              {{ $t("register_free") }}
            </div>
          </div>
        </div>
        <img
          class="landing-image order-3"
          src="~/assets/images/landing-2.png"
        />
      </div>
    </div>
    <div class="blog-title">
      <div class="blog-title__icon-text">
        <img src="~/assets/icons/black-blog.svg" />
        <div class="blog-title__icon-spacing">{{ $t("blog") }}</div>
      </div>
      <div class="blog-title__read-more" @click="toBlogs">
        {{ $t("view_all") }}
      </div>
    </div>
    <div v-if="!postsIsLoading" class="blog">
      <div class="main-container__title">{{ $t("posts") }}</div>
      <div v-for="post in posts.results.slice(0, 6)" :key="post.id">
        <RecentPost :is-test="true" :preview="true" :blog="post" />
      </div>
    </div>
    <Loading v-else :show-background="false" class="loading" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NavTile from "~/components/landing/LandingNavTile.vue";
import AuthTile from "~/components/landing/AuthTile.vue";
import Loading from "~/components/ui/Loading.vue";
import RecentPost from "~/components/blog/RecentPost.vue";

export default {
  name: "Landing",
  auth: false,
  components: {
    NavTile,
    RecentPost,
    AuthTile,
    Loading,
  },
  computed: {
    ...mapGetters({
      posts: "blog/posts",
      postsIsLoading: "blog/postsIsLoading",
    }),
  },
  mounted() {
    this.$store.dispatch("blog/getPosts");
  },
  methods: {
    getImage(id, small = false) {
      if (small) {
        return require(`~/assets/images/dashboard/${id}.png`);
      } else {
        return require(`~/assets/images/dashboard/large_${id}.png`);
      }
    },
    getLandingImage(id, small = false) {
      if (small) {
        return require(`~/assets/images/landing/landing_${id}_small.png`);
      } else {
        return require(`~/assets/images/landing/landing_${id}.png`);
      }
    },
    toRegister() {
      this.$router.push("/register/");
    },
    toBlogs() {
      this.$router.push("/blog/post-list/");
    },
    toRoute(number) {
      switch (number) {
        case 1:
          return this.$router.push("/sachopedie/");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/landing";
@import "~/assets/scss/components/landing/auth-tile";
@import "~/assets/scss/pages/blog/post-list";
</style>
