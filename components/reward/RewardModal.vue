<template>
  <Modal v-if="show" size="medium" @close="$emit('close')">
    <div v-if="data.diamonds && data.coins" class="rewards">
      <img src="~/assets/icons/diamonds-and-coins.svg" class="rewards_img" />
      <h4 class="rewards_header">{{ data.message.title }}!</h4>
      <span class="rewards_text">
        {{ data.message.text }}
      </span>
    </div>
    <div v-else-if="data.diamonds" class="rewards">
      <div class="rewards_vertical">
        <span class="rewards_vertical_amount diamonds">
          +{{ data.diamonds }}
        </span>
        <img
          src="~/assets/icons/diamond_colour.svg"
          class="rewards_vertical_img"
        />
      </div>
      <h4 class="rewards_header">{{ data.message.title }}!</h4>
      <span class="rewards_text">
        {{ data.message.text }}
      </span>
    </div>
    <div v-else-if="data.coins" class="rewards">
      <div class="rewards_vertical">
        <span class="rewards_vertical_amount coins">+{{ data.coins }}</span>
        <img
          src="~/assets/icons/coin_colour.svg"
          class="rewards_vertical_img"
        />
      </div>
      <h4 class="rewards_header">{{ data.message.title }}!</h4>
      <span class="rewards_text">
        {{ data.message.text }}
      </span>
    </div>
    <button type="button" class="rewards_button" @click="$emit('close')">
      {{ $t("okay") }}
    </button>
    <NuxtLink
      to="/store"
      class="rewards_link"
      @click.native="$emit('close', '/store')"
    >
      {{ $t("visit_estore") }}
    </NuxtLink>
  </Modal>
</template>

<script>
export default {
  name: "RewardModal",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/reward/reward";
</style>
