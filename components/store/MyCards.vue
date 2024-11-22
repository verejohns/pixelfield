<template>
  <div class="my-cards">
    <div class="my-cards_title mb-16">
      {{ $t("my_cards") }}
    </div>
    <div class="my-cards_count mb-24">
      <img src="~/assets/icons/cards.svg" class="mr-16" />
      <span class="my-cards_count_text">{{ count }}</span>
    </div>
    <div class="my-cards_checkbox">
      <input
        id="show-only-owned"
        :checked="value"
        type="checkbox"
        class="my-cards_checkbox_box mr-16"
        @input="$emit('input', $event.target.checked)"
      />
      <label for="show-only-owned" class="my-cards_checkbox_label">
        {{ $t("show_only_owned") }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCards",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/store/collection";
</style>
