<template>
  <div
    v-click-outside="closeDashboard"
    :class="dashboardLeft ? 'dashboard__left' : ''"
    class="dashboard"
  >
    <div class="dashboard__content">
      <div class="dashboard__close">
        <img
          src="~/assets/icons/close-circle-black.svg"
          @click="closeDashboard"
        />
      </div>
      <div class="dashboard__container">
        <div class="dashboard__container__grid-row">
          <NavTile
            :image="getImage(1)"
            :title="categories[0]"
            @click="toRoute"
          />
          <NavTile
            class="nav-tile__horiz-spacing"
            :title="categories[1]"
            :image="getImage(2)"
          />

          <NavTile
            :title="categories[2]"
            :image="getImage(3)"
            @click="toRoute"
          />
        </div>
        <div class="dashboard__container__grid-row">
          <NavTile
            :title="categories[3]"
            :image="getImage(4)"
            @click="toRoute"
          />
          <NavTile
            class="nav-tile__horiz-spacing"
            :title="categories[4]"
            :image="getImage(5)"
            @click="toRoute"
          />
          <NavTile
            :title="categories[5]"
            :image="getImage(6)"
            @click="toRoute"
          />
        </div>
        <div class="dashboard__container__grid-row">
          <NavTile
            :title="categories[6]"
            :image="getImage(7)"
            @click="toRoute"
          />
          <NavTile
            class="nav-tile__horiz-spacing"
            :title="categories[7]"
            :image="getImage(8)"
            @click="toRoute"
          />
          <NavTile
            :title="categories[8]"
            :image="getImage(9)"
            @click="toRoute"
          />
        </div>
      </div>
      <div class="dashboard__row">
        <DashboardButton :is-home="true" @closeDashboard="closeDashboard" />
        <DashboardButton
          class="nav-tile__horiz-spacing"
          :is-profile="true"
          @closeDashboard="closeDashboard"
        />
        <DashboardButton :is-blog="true" @closeDashboard="closeDashboard" />
      </div>
      <div v-if="$auth.user.role === 'coach'" class="dashboard__coach-row">
        <DashboardButton :is-coach="true" @closeDashboard="closeDashboard" />
      </div>
      <div class="log-out-button">
        <div class="log-out-button__content">
          <div @click="logout">
            {{ $t("log_out") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavTile from "~/components/layout/NavTile.vue";
import DashboardButton from "~/components/layout/DashboardButton.vue";
export default {
  components: {
    NavTile,
    DashboardButton,
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
    dashboardLeft: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getImage(id) {
      return require(`~/assets/images/dashboard/${id}.png`);
    },
    logout() {
      this.$auth.logout();
      this.$router.push("/login");
    },
    toRoute(category) {
      this.$emit("toRoute", category);
    },
    closeDashboard() {
      this.$emit("closeDashboard");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/layout/blog-header";
</style>
