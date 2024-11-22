<template>
  <div v-if="user.completed_studies.length" class="activities">
    <div class="activities__section activities__part">
      <div class="activities__title">{{ $t("partii") }}</div>
      <div class="activities__content">
        <LessonTile
          v-for="study in user.completed_studies"
          :key="`study-${study.id}`"
          :data="study"
          :is-parti="true"
        />
      </div>
    </div>
    <div class="activities__section activities__lessons">
      <div class="activities__title">{{ $t("lessons") }}</div>
      <div class="activities__content">
        <LessonTile
          v-for="study in user.completed_studies"
          :key="`study-${study.id}`"
          :data="study"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LessonTile from "~/components/ui/LessonTile.vue";

export default {
  name: "Activities",
  components: {
    LessonTile,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/user/activities";
</style>
