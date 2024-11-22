<template>
  <div class="move-question">
    <div class="correct-move" :class="[option ? 'selected' : '']">
      {{ option ? option : $t("correct_move") }}
      <img
        v-if="option"
        class="option-icon"
        src="~/assets/icons/close-circle-black.svg"
        @click="removeOption($event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "MoveQuestion",
  computed: {
    option: {
      get() {
        const answer = this.$store.getters["tests/currentAnswer"];
        if (answer === undefined) {
          return "";
        } else {
          if (answer.value) this.$emit("add-option", "move");
          const regex = /^p([a-h][1-8]-[a-h][1-8][A-Z]?)$/gm;
          const match = regex.exec(answer.value);
          if (match !== null) {
            return match[1];
          }
          return answer.value;
        }
      },
      set(value) {
        this.$store.commit("tests/setAnswerValue", value);
      },
    },
  },
  methods: {
    removeOption(event) {
      event.stopPropagation();
      this.option = "";
      this.$emit("remove-option", "move");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/questions/move-question";
</style>
