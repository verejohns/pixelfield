<template>
  <div class="main-container">
    <Button
      :label="$t('try again')"
      type="tertiary"
      size="large"
      icon="refresh"
      position="right"
      width="30%"
      height="56px"
      padding-top="17px"
      @click="$router.back()"
    />
  </div>
</template>

<script>
import Button from "~/components/ui/buttons/Button.vue";
export default {
  components: {
    Button,
  },
};
</script>

<style scoped>
.main-container {
  margin: 0 auto;
  width: 100%;
}
</style>
