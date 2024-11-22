<template>
  <div class="empty-students">
    <div class="empty-students__text">
      <div class="empty-students__title">{{ $t("nothing_here") }}</div>
      <div class="empty-students__content">
        {{ $t("empty_students_description") }}
      </div>
    </div>
    <div class="empty-students__button" @click="findStudents">
      <Button
        :label="$t('find_students')"
        type="cta"
        size="large"
        position="right"
        width="190px"
        height="48px"
        padding-top="16px"
      />
    </div>
  </div>
</template>

<script>
import Button from "~/components/ui/buttons/Button";

export default {
  name: "EmptyStudents",
  components: {
    Button,
  },
  methods: {
    findStudents() {
      this.$router.push("/coach/invite-students/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/coach/empty-students";
</style>
