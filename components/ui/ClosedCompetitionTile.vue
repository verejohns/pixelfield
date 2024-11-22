<template>
  <div class="closed-competition">
    <div class="closed-competition__title">{{ competition.title }}</div>
    <div v-if="competition.is_chess_to_schools" class="margin-bottom-8">
      <Chip
        :competition="true"
        :group-detail="false"
        :text="$t('šachy_do_škol')"
      />
    </div>
    <div class="view-flex">
      <div class="view-spacing">{{ $t("closed") }}</div>
      <div>{{ competition.participants }} {{ $t("participants") }}</div>
    </div>
    <div class="closed-competition__desc">{{ competition.description }}</div>
    <div><IconSet :space-around="true" :competition="competition" /></div>
  </div>
</template>

<script>
import IconSet from "~/components/ui/icon-set/CompetitionIconSet";
import Chip from "~/components/ui/Chip.vue";
export default {
  components: {
    IconSet,
    Chip,
  },
  props: {
    competition: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/closed-competition-tile.scss";
</style>
