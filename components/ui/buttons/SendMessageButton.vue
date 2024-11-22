<template>
  <div>
    <v-btn depressed color="primary" class="button__with-icon" @click="onClick">
      <img class="button__icon-spacing" src="~/assets/icons/speech.svg" />
      {{ $t(text) }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "send_message",
    },
  },
  methods: {
    onClick() {
      this.$emit("on-click");
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/components/ui/buttons/button";
</style>
