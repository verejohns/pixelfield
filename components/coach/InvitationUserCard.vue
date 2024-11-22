<template>
  <div class="invitation-user-card">
    <div class="invitation-user-card__user-card">
      <UserInfo :user="user" :is-white="false" />
    </div>
    <div class="invitation-user-card__button" @click="removeStudent">
      <img
        class="invitation-user-card__icon"
        src="~/assets/icons/close-black.svg"
      />
    </div>
  </div>
</template>

<script>
import UserInfo from "~/components/coach/UserInfo";

export default {
  name: "InvitationUserCard",
  components: {
    UserInfo,
  },
  props: {
    user: {
      type: Object,
      required: true,
      default: null,
    },
  },
  methods: {
    removeStudent() {
      this.$emit("remove-student", this.user.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/coach/invitation-user-card";
</style>
