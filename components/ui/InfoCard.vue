<template>
  <nuxt-link :to="card.link ? card.link : '/'" class="info-card">
    <div class="info-card__title">
      <img
        v-if="card.icon"
        :src="require('~/assets/icons/' + card.icon + '.svg')"
      />
      <div v-if="card.title" class="info-card__title__text">
        {{ card.title }}
      </div>
    </div>
    <div class="info-card__main">
      <div class="info-card__main__top">
        <div class="info-card__main__top__left">
          <div class="info-card__subtitle">
            {{ card.subtitle }}
          </div>
          <div class="info-card__text">
            {{ card.text }}
          </div>
        </div>
        <img :src="card.image" />
      </div>
      <span class="info-card__link">{{ $t("learn_more") }}</span>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: "InfoCard",
  props: {
    card: {
      type: Object,
      required: true,
      default: null,
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/components/ui/info-card";
</style>
