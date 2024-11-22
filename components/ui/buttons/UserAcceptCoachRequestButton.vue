<template>
  <div>
    <v-btn
      depressed
      color="primary"
      class="button__with-icon"
      @click="onAccept"
    >
      <img class="button__icon-spacing" src="~/assets/icons/speech.svg" />
      {{ $t("accept_request") }}
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    onAccept() {
      this.$router.push(`/coach/details/`);
      // TODO some api call to add coach to user list
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/components/ui/buttons/button";
</style>
