<template>
  <div v-if="!isHidden" class="request-item">
    <div @click="toProfile">
      <UserInfo :user="user" />
    </div>
    <div class="request-item__action">
      <Button
        :label="$t('decline')"
        type="decline"
        size="large"
        position="right"
        width="208px"
        height="40px"
        padding-top="12px"
        @click="declineRequest"
      />
      <Button
        :label="$t('accept')"
        type="cta"
        size="large"
        position="right"
        width="208px"
        height="40px"
        padding-top="12px"
        @click="acceptRequest"
      />
    </div>
  </div>
</template>

<script>
import UserInfo from "~/components/coach/UserInfo";
import Button from "~/components/ui/buttons/Button";

export default {
  name: "RequestItem",
  components: {
    UserInfo,
    Button,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    request: {
      type: Object,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      isHidden: false,
    };
  },

  methods: {
    toProfile() {
      if (this.$route.name.includes("user")) {
        this.$router.push(
          `/coach/details/${this.user.id}/?accepted=${false}&requestId=${
            this.request.id
          }`
        );
      }
    },
    async acceptRequest() {
      this.isHidden = true;
      this.$emit("updateRequests", this.user);
      await this.$store.dispatch("coach/acceptRequest", this.request.id);
    },
    async declineRequest() {
      this.isHidden = true;
      await this.$store.dispatch("coach/declineRequest", this.request.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/coach/request-item";
</style>
