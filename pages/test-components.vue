<template>
  <div class="main-container">
    <RewardTile />
  </div>
</template>

<script>
import RewardTile from "~/components/tests/RewardTile.vue";

export default {
  components: {
    RewardTile,
  },
};
</script>

<style scoped>
.main-container {
  margin: 30px auto;
}
</style>
