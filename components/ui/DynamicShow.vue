<template>
  <div id="dynamic-show" class="dynamic-show" :class="showDescription">
    {{ label }}
    <div
      v-if="showDescription === 'more'"
      class="dynamic-show__more"
      @click="changeShow"
    >
      {{ $t("more") }}...
    </div>
    <!-- <div
      v-if="showDescription === 'less'"
      class="dynamic-show__less"
      @click="changeShow"
    >
      {{ $t("less") }}...
    </div> -->
  </div>
</template>

<script>
export default {
  name: "DynamicShow",
  props: {
    label: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {
      showDescription: "less",
    };
  },
  mounted() {
    if (
      document.getElementById("dynamic-show") &&
      document.getElementById("dynamic-show").offsetHeight > 70
    ) {
      this.showDescription = "less";
    }
  },
  methods: {
    changeShow() {
      if (this.showDescription === "more") {
        this.showDescription = "less";
      } else {
        this.showDescription = "more";
      }
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/components/ui/dynamic-show";
</style>
