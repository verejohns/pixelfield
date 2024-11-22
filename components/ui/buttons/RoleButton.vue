<template>
  <div class="role-button" :class="selected ? 'selected' : ''" @click="onClick">
    <img class="image" :src="require(`~/assets/images/${label}.png`)" />
    <div class="info" :class="selected ? 'selected' : ''">
      <div class="label">{{ $t(lbl) }}</div>
      <!-- <img v-if="selected" class="icon" src="~/assets/icons/check.png" /> -->
      <img v-if="selected" src="~/assets/icons/check-circle.svg" class="icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: "RoleButton",
  props: {
    label: {
      type: String,
      required: true,
      default: "",
    },
    selected: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    lbl() {
      if (this.label === "student") {
        return "student_single";
      }
      return this.label;
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
@import "/assets/scss/components/ui/buttons/role-button";
</style>
