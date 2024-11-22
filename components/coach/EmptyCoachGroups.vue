<template>
  <div class="empty-groups">
    <div class="empty-groups__description">
      <div class="empty-groups__title">{{ $t("nothing_here") }}</div>
      <div class="empty-groups__content">
        {{ $t("empty_coach_description") }}
      </div>
    </div>
    <div class="empty-groups__guidance">
      <div class="empty-groups__title">{{ $t("any_coach_yet") }}</div>
      <div class="empty-groups__button">
        <Button
          :label="$t('find_coaches')"
          type="cta"
          size="large"
          position="right"
          width="190px"
          height="48px"
          padding-top="16px"
          @click="findStudents"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/ui/buttons/Button";

export default {
  name: "EmptyCoachGroups",
  components: {
    Button,
  },
  methods: {
    findStudents() {
      this.$router.push("/user/hire-a-coach/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/coach/empty-groups";
</style>
