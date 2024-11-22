<template>
  <div
    class="store-card"
    :class="{ inModal }"
    :style="{ margin: inModal ? '0 auto' : '8px' }"
  >
    <img class="store-card__img" :src="image" />
    <div class="store-card__title">{{ title }}</div>
    <button
      ref="button"
      class="store-card__buy-button"
      :class="{ purchased: isPurchased }"
      @click="handlePurchaseClick"
    >
      <span v-if="!isPurchased" class="store-card__buy-button__text">
        {{ $t("buy") }}
      </span>
      <span v-else class="store-card__buy-button__text">
        {{ $t("purchased") }}
      </span>
      <img
        v-if="!isPurchased && priceDiamonds > 0"
        class="store-card__buy-button__img"
        src="~/assets/icons/diamond_colour.svg"
      />
      <span
        v-if="!isPurchased && priceDiamonds > 0"
        class="store-card__buy-button__amount mr-8"
      >
        {{ priceDiamonds }}
      </span>
      <img
        v-if="!isPurchased && priceCoins > 0"
        class="store-card__buy-button__img"
        src="~/assets/icons/coin_colour.svg"
      />
      <span
        v-if="!isPurchased && priceCoins > 0"
        class="store-card__buy-button__amount"
      >
        {{ priceCoins }}
      </span>
      <img
        v-if="isPurchased"
        class="store-card__buy-button__img"
        src="~/assets/icons/check-circle-green-fat.svg"
      />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    priceCoins: {
      type: Number,
      default: 0,
    },
    priceDiamonds: {
      type: Number,
      default: 0,
    },
    isPurchased: {
      type: Boolean,
      default: false,
    },
    inModal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handlePurchaseClick() {
      if (!this.isPurchased && this.inModal) {
        console.log("buy");
        this.$emit("buy");
      } else if (!this.isPurchased) {
        console.log("dialog");
        this.$emit("dialog");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/store/store";
</style>
