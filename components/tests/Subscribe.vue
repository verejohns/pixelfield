<template>
  <div class="subscribe" :class="'column' + column">
    <div class="subscribe__main">
      <img :src="require('~/assets/images/' + subscribe.image)" />
      <div class="subscribe__text" :class="'column' + column">
        {{ subscribe.content }}
      </div>
      <div v-if="column === 2" class="subscribe__button column2">
        <Button
          :label="subscribe.button"
          type="tertiary"
          size="medium"
          width="200px"
          color="green-background"
          height="40px"
          padding-top="8px"
        />
      </div>
    </div>
    <div v-if="column === 1" class="subscribe__button column1">
      <Button
        :label="subscribe.button"
        type="tertiary"
        size="medium"
        width="200px"
        color="green-background"
        height="40px"
        padding-top="8px"
      />
    </div>
  </div>
</template>

<script>
import Button from "~/components/ui/buttons/Button";

export default {
  name: "Subscribe",
  components: {
    Button,
  },
  props: {
    subscribe: {
      type: Object,
      required: true,
      default: null,
    },
    column: {
      type: Number,
      required: false,
      default: 1,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/tests/subscribe";
</style>
