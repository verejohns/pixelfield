<template>
  <div class="tile view-margin-vertical-12">
    <div class="tile__lesson">
      <div class="tile__lesson tile__lesson__heading">
        <img
          class="view-margin-right-12"
          src="~/assets/icons/empty_circle.svg"
        />
        <div>{{ data.title }}</div>
      </div>
      <div class="tile__lesson__details">
        <img
          class="
            view-margin-right-12 view-resize-timer view-margin-left-12-small
          "
          src="~/assets/icons/clock.svg"
        />
        <div>{{ data.minutes }} {{ $t("minutes") }}</div>
        <img
          class="view-margin-right-12 view-margin-left-12 view-resize-speech"
          src="~/assets/icons/speech2.svg"
        />
        <div>{{ data.comments }} {{ $t("comments") }}</div>
      </div>
    </div>
    <div class="tile__open-button">
      <div @click="onClick">
        {{ buttonText }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isParti: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: null,
    },
  },
  computed: {
    buttonText() {
      return this.isParti ? this.$t("play") : this.$t("open");
    },
  },
  methods: {
    onClick() {
      if (this.isParti) {
        this.$router.push(`/tests/board?test=15`);
      } else {
        const study = `&study=${true}`;
        this.$router.push(`/tests/board?test=15${study}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/lesson-tile";
</style>
