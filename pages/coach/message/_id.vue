<template>
  <div class="form">
    <div class="form__content">
      <p class="form__content__title">
        {{ $t("message_for") + " " + coach.display_name }}
      </p>
      <p class="form__content__textarea-header">{{ $t("your_message") }}</p>
      <div>
        <textarea
          v-model="text"
          :label="$t('message')"
          rows="6"
          class="textarea"
          :placeholder="$t('message')"
        />
      </div>
      <div class="form__content__button" align-center>
        <v-btn :disabled="!text" class="view-send-button" @click="sendMessage">
          {{ $t("send") }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, store }) {
    const response = await store.dispatch("coach/getCoach", params.id);
    return { coach: response.coach };
  },
  data() {
    return {
      coach: {},
      text: "",
    };
  },
  methods: {
    async sendMessage() {
      await this.$store.dispatch("user/sendCoachMessage", {
        id: this.coach.id,
        message: this.text,
      });
      this.$toast.success(this.$t("message_sent"));
      this.$router.push(`/coach/details/${this.coach.id}/`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/send-message-form";
@import "~/assets/scss/components/ui/buttons/button";
</style>
