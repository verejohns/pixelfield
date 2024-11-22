<template>
  <div class="reward-tile">
    <div class="reward-tile__left">
      <div class="reward-tile__coins">+{{ data.coins }}</div>
      <img src="~/assets/icons/coin_colour.svg" />
    </div>
    <div class="reward-tile__right">
      <div class="reward-tile__text">
        <div class="reward-tile__heading">{{ data.message.title }}</div>
        <div class="reward-tile__subheading">{{ data.message.text }}</div>
      </div>
      <div class="button-container">
        <div class="reward-tile__button" @click="click">
          {{ $t("visit_e_store") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    click() {
      this.$router.push("/store/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/tests/reward-tile";
</style>
