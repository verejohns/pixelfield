<template>
  <div class="study-group">
    <div class="study-group__name">{{ group.title }}</div>
    <div class="study-group__count">
      {{
        $tc("study_group_student_count", group.student_count, {
          count: group.student_count,
        })
      }}
    </div>
    <div class="study-group__description">{{ group.description }}</div>
    <div class="study-group__detail-link" @click="toGroupDetail">
      {{ $t("see_details") }}
    </div>
  </div>
</template>

<script>
export default {
  name: "StudyGroup",
  props: {
    group: {
      type: Object,
      required: true,
      default: null,
    },
  },
  methods: {
    toGroupDetail() {
      console.log(this.group.id);
      this.$router.push(`/coach/group-detail/${this.group.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/coach/study-group";
</style>
