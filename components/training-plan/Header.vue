<template>
  <div :class="[!isDetail ? 'header' : 'detail-header']">
    <DifficultyModal
      v-if="showModal"
      :current-difficulty="selectedDifficulty"
      @closeModal="showModal = false"
      @changeDifficulty="updateDifficulty"
    />
    <div class="header__top-row">
      <div class="header__dashboard" @click="toDashboard">
        <img src="~/assets/icons/left-arrow-white.svg" />
        <div class="header__dashboard-text">
          {{ $t("dashboard") }}
        </div>
      </div>
      <div class="header__difficulty" @click="openModal">
        {{ $t(selectedDifficulty.toLowerCase()) }}
      </div>
    </div>
    <div :class="[!isDetail ? 'header__title' : 'detail-header__title']">
      {{ $t("Kurzy") }}
    </div>
  </div>
</template>

<script>
import DifficultyModal from "~/pages/training-plans/DifficultyModal.vue";

export default {
  components: {
    DifficultyModal,
  },
  props: {
    isDetail: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showModal: false,
      difficulties: ["Easy", "Medium", "Hard"],
      selectedDifficulty: "Easy",
    };
  },
  methods: {
    updateDifficulty(newDifficulty) {
      this.showModal = false;
      this.selectedDifficulty = newDifficulty;
    },
    toDashboard() {
      if (this.$route.name.includes("training-plans-detail")) {
        this.$router.push("/training-plans/");
        console.log("to training plans");
      } else if (
        this.$route.name.includes("training-plans") &&
        !this.$route.name.includes("details")
      ) {
        this.$router.push("/");
      } else {
        this.$router.back();
      }
    },
    openModal() {
      this.showModal = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/training-plan/header";
</style>
