<template>
  <button
    ref="button"
    class="button"
    :class="[
      size,
      type,
      filled ? 'green__filled' : '',
      disabled === 'disabled' ? 'disabled' : '',
      selected === 'selected' ? 'selected' : '',
      color,
    ]"
    :disabled="disabled === 'disabled'"
    :style="{
      width: width ? width : 'inherit',
      height: height ? height : 'inherit',
      paddingTop: paddingTop ? paddingTop : '',
    }"
    @click="onClick"
  >
    <img
      v-if="icon !== '' && position === 'left'"
      :src="require(`~/assets/icons/${icon}.svg`)"
      class="btn_icon"
      :class="{ disabled: disabled === 'disabled' }"
      alt=""
    />
    <div class="btn_label">{{ label }}</div>
    <img
      v-if="icon !== '' && position === 'right'"
      :src="require(`~/assets/icons/${icon}.svg`)"
      :class="{
        'position-right': position === 'right',
        disabled: disabled === 'disabled',
      }"
      class="btn_icon"
      alt=""
    />
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    label: {
      type: String,
      required: true,
      default: "Button",
    },
    size: {
      type: String,
      required: true,
      default: "medium",
    },
    filled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
      default: "cta",
    },
    disabled: {
      type: String,
      required: false,
      default: "",
    },
    icon: {
      type: String,
      required: false,
      default: "",
    },
    color: {
      type: String,
      required: false,
      default: "",
    },
    position: {
      type: String,
      required: false,
      default: "left",
    },
    width: {
      type: String,
      required: false,
      default: "",
    },
    height: {
      type: String,
      required: false,
      default: "",
    },
    paddingTop: {
      type: String,
      required: false,
      default: "",
    },
    selected: {
      type: String,
      required: false,
      default: "",
    },
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/components/ui/buttons/button";
</style>
