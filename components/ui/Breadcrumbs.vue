<template>
  <div>
    <div v-for="(breadcrumb, i) in breadcrumbs" :key="i" class="breadcrumbs">
      <div class="breadcrumb" @click="back(i)">
        {{ breadcrumb }}
      </div>
      <div class="divider">
        {{ shouldAddDivider(i) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    breadcrumbs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    shouldAddDivider(i) {
      return this.breadcrumbs.length > 1 && this.breadcrumbs.length - 1 !== i
        ? "•"
        : "";
    },
    back(i) {
      if (i === this.breadcrumbs.length - 1) {
        this.$router.back();
      } else if (this.breadcrumbs[0] === this.$t("sachopedie")) {
        this.$router.push("/sachopedie/");
      }
    },
  },
};
</script>

<style>
@import "~/assets/scss/components/ui/breadcrumbs.scss";
</style>
