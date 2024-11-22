<template>
  <div
    class="user-info"
    :style="{ backgroundColor: isWhite ? 'white' : '#EEEEEE' }"
    @click="toCoachDetails"
  >
    <div class="user-info__private">
      <img :src="coachPhoto" />
      <div class="user-info__name">{{ coach.display_name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoachInfo",
  props: {
    linkToMessage: {
      type: Boolean,
      default: false,
    },
    linkToAccept: {
      type: Boolean,
      default: false,
    },
    coach: {
      type: Object,
      required: true,
    },
    isWhite: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    coachPhoto() {
      console.log("this.coach", this.coach);
      return this.coach.avatar
        ? this.coach.avatar
        : require("~/assets/images/profile_avatar.png");
    },
  },
  methods: {
    toCoachDetails() {
      if (this.linkToProfile !== null) {
        this.$router.push(`/coach/details/${this.coach.id}/?accepted=${true}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/coach/user-info";
</style>
