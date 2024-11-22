<template>
  <div class="nav-menu">
    <img src="~/assets/icons/close.svg" @click="closeMenu" />
    <ul>
      <li>
        <a @click="toPage('tests/series')"> Dashboard </a>
      </li>
      <li>
        <a @click="toPage('profile')"> My profile </a>
      </li>
      <li>
        <a @click="toPage('')"> Blog </a>
      </li>
      <li>
        <a @click="toPage('')"> E-shop </a>
      </li>
      <li class="logout">
        <a @click="logout">Log out</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  props: {
    page: {
      type: String,
      required: true,
      default: "",
    },
  },
  methods: {
    toPage(route) {
      this.$emit("close-menu");
      this.$router.push("/" + route);
    },
    logout() {
      this.$emit("close-menu");
      this.$auth.logout();
      this.$router.push("/login");
    },
    closeMenu() {
      this.$emit("close-menu");
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/components/layout/navmenu";
</style>
