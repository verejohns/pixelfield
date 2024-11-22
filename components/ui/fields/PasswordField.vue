<template>
  <div class="password-field">
    <v-text-field
      v-model="password"
      :label="label"
      placeholder=" "
      :type="isVisible ? 'text' : 'password'"
      :rules="validationRules"
      outlined
      autocomplete="new-password"
      @input="$emit('input', password)"
      @focusout="$emit('showFooter')"
      @click="$emit('click')"
      @keyup.enter="$emit('login')"
    />
    <a v-if="!isVisible" class="link" @click="showPassword()">
      <img src="~/assets/icons/eye.svg" class="icon" alt="" />
    </a>
    <a v-if="isVisible" class="link" @click="hidePassword()">
      <img src="~/assets/icons/hide.svg" class="icon" alt="" />
    </a>
  </div>
</template>

<script>
import validation from "~/mixins/validation";

export default {
  name: "Password",
  components: {},
  mixins: [validation],
  props: {
    label: {
      type: String,
      required: true,
      default: "Password",
    },
    value: {
      type: String,
      default: "",
    },
    validationRules: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  computed: {
    getPassword() {
      return this.value;
    },
  },
  methods: {
    showPassword() {
      this.isVisible = true;
    },
    hidePassword() {
      this.isVisible = false;
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/components/ui/fields/password-field";
</style>
