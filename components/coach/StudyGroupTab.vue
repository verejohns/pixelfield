<template>
  <div class="study-group-tab">
    <div class="study-group-tab__button">
      <Button
        :label="$t('create_new_group')"
        type="tertiary"
        size="large"
        position="left"
        width="208px"
        height="40px"
        padding-top="10px"
        icon="add"
        @click="toForm"
      />
    </div>
    <div class="study-group-tab__header">
      <div class="study-group-tab__title">
        {{ $t("study_groups") }}
        <span v-if="studyGroups.length">({{ studyGroups.length }})</span>
      </div>
    </div>
    <div v-if="studyGroups.length" class="study-group-tab__content">
      <StudyGroup
        v-for="(group, i) in studyGroups"
        :key="`group_${i}`"
        :group="group"
      />
    </div>
    <div v-else class="study-group-tab__empty-container">
      <EmptyGroups />
    </div>
  </div>
</template>

<script>
import Button from "~/components/ui/buttons/Button";
import StudyGroup from "~/components/coach/StudyGroup";
import EmptyGroups from "~/components/coach/EmptyGroups";

export default {
  name: "StudyGroupTab",
  components: {
    Button,
    StudyGroup,
    EmptyGroups,
  },
  props: {
    studyGroups: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toForm() {
      this.$router.push(`/coach/new-group/`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/coach/study-group-tab";
</style>
