<template>
  <div class="coin-card">
    <img class="coin-card__img-resize" :src="getImage" />
    <div class="coin-card__text">
      <div class="coin-card__heading">
        {{ isCoin ? $t("my_coins") : $t("my_diamonds") }}
      </div>
      <div class="coin-card__number">{{ amount }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoinCard",
  props: {
    isCoin: {
      type: Boolean,
      default: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    getImage() {
      return this.isCoin
        ? require("~/assets/icons/coin_colour.svg")
        : require("~/assets/icons/diamond_colour.svg");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/coin-card";
</style>
