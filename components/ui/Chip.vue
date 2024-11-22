<template>
  <div>
    <div :class="[bg]" class="chip">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    groupDetail: {
      type: Boolean,
      default: true,
    },
    competition: {
      type: Boolean,
      default: false,
    },
    coachDetail: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    bg() {
      return this.groupDetail
        ? "chip__group-details"
        : this.coachDetail
        ? "chip__coach-details"
        : this.competition
        ? "chip__competition"
        : "";
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/ui/chip";
</style>
