<template>
  <div>
    <v-btn
      :disabled="editable"
      class="button primary main-container__button"
      @click="toEditGroup"
      >{{ $t("edit") }}</v-btn
    >
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toEditGroup() {
      this.$router.push(`/coach/edit-group/${this.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/coach/edit-group-tile";
@import "~/assets/scss/components/ui/buttons/button";
</style>
