<template>
  <div class="number-field-question">
    <v-text-field
      v-model="number"
      :label="$t('type_in_a_number')"
      type="number"
      max-length="6"
      outlined
      @blur="blurOption"
      @change="changeOption"
      @keydown="androidArrowButtonFix"
    />
  </div>
</template>

<script>
export default {
  name: "NumberFieldQuestion",
  computed: {
    number: {
      get() {
        const answer = this.$store.getters["tests/currentAnswer"];
        if (answer === undefined) {
          return "";
        } else {
          return answer.value;
        }
      },
      set(value) {
        this.$store.commit("tests/setAnswerValue", Number(value));
      },
    },
  },
  methods: {
    androidArrowButtonFix(e) {
      if (e.keyCode === 13) {
        e.target.blur();
      }
    },
    focusOption() {
      if (!this.number) this.$emit("add-option", "numberfield");
    },
    blurOption() {
      if (!this.number) this.$emit("remove-option", "numberfield");
    },
    changeOption() {
      if (this.number) this.$emit("add-option", "numberfield");
      else this.$emit("remove-option", "numberfield");
    },
  },
};
</script>
