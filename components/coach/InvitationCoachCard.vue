<template>
  <div class="invitation-user-card">
    <div class="invitation-user-card__user-card">
      <CoachInfo :coach="coach" :is-white="false" />
    </div>
    <div class="invitation-user-card__button" @click="remove">
      <img
        class="invitation-user-card__icon"
        src="~/assets/icons/close-black.svg"
      />
    </div>
  </div>
</template>

<script>
import CoachInfo from "~/components/coach/CoachInfo";

export default {
  name: "InvitationCoachCard",
  components: {
    CoachInfo,
  },
  props: {
    coach: {
      type: Object,
      required: true,
      default: null,
    },
  },
  methods: {
    remove() {
      this.$emit("remove", this.coach.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/coach/invitation-user-card";
</style>
