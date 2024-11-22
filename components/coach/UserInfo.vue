<template>
  <nuxt-link
    :to="`/profile/${user.id}`"
    class="user-info"
    :style="{ backgroundColor: isWhite ? 'white' : '#EEEEEE' }"
  >
    <div class="user-info__private">
      <img v-if="user.avatar" :src="user.avatar" />
      <DefaultAvatar v-else :size="40" :username="user.display_name" />
      <div class="user-info__name">{{ user.display_name }}</div>
    </div>
    <div v-if="user.role !== 'coach'" class="user-info__level">
      {{ user.level }}
    </div>
  </nuxt-link>
</template>

<script>
import DefaultAvatar from "~/components/ui/DefaultAvatar";

export default {
  name: "UserInfo",
  components: { DefaultAvatar },
  props: {
    user: {
      type: Object,
      required: true,
    },
    isWhite: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/coach/user-info";
</style>
