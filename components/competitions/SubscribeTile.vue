<template>
  <div class="subscribe-tile">
    <img class="subscribe-tile__image" src="~/assets/images/unpaid.png" />
    <div class="display-flex">
      <div>{{ $t("full_membership") }}</div>
      <div class="subscribe-tile__button" @click="toSubscribe">
        {{ $t("subscribe") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toSubscribe() {
      // TODO nav to the subscribe page
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/competitions/subscribe-tile";
</style>
