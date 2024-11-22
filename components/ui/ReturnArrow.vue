<template>
  <img
    class="form-back-arrow"
    src="~/assets/icons/left-arrow.svg"
    @click="returnToCoachOverview"
  />
</template>

<script>
export default {
  props: {
    isCoach: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    returnToCoachOverview() {
      if (this.isCoach) {
        this.$router.push("/coach/");
      } else {
        this.$router.push("/user/");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/coach/create-edit-group";
</style>
