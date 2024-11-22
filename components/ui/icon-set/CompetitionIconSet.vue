<template>
  <div :class="spaceAround ? 'icon-set__space-around' : ''" class="icon-set">
    <div v-if="competition.time_limit" class="icon-set__icon-text">
      <img src="~/assets/icons/alarm.svg" />
      <div class="icon-spacing-left-12">
        {{ competition.time_limit }} {{ $t("min") }}
      </div>
    </div>
    <div v-if="competition.lives" class="icon-set__icon-text">
      <img src="~/assets/icons/heart.svg" />
      <div class="icon-spacing-left-12">
        {{ competition.lives }} {{ $t("lives") }}
      </div>
    </div>
    <div v-if="competition.attempts !== 999999999" class="icon-set__icon-text">
      <img src="~/assets/icons/re-try.svg" />
      <div class="icon-spacing-left-12">
        {{ competition.attempts }} {{ $t("attempts") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    competition: { type: Object, required: true },
    spaceAround: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/icon-set";
</style>
