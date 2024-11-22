<template>
  <div class="coach">
    <div class="coach__content-container">
      <div class="coach__content">
        <div class="coach__content__info">
          <img class="coach__content__info__profile-photo" :src="coachPhoto" />
          <div class="coach__content__coach-details">
            <p class="text" background="red">{{ coach.display_name }}</p>
            <Chip
              :groupdetail="false"
              :coachdetail="true"
              :text="$t('coach')"
            />
          </div>
        </div>
        <div class="coach__content__button">
          <SendMessage :text="buttonText" @on-click="handleRequest" />
        </div>
      </div>
    </div>
    <div class="coach__study-groups">
      <div class="coach__study-groups__title">
        <p>{{ $t("study_group") }}</p>
      </div>
      <div class="coach__study-groups__list">
        <StudyGroup :group="group" />
      </div>
    </div>
  </div>
</template>

<script>
import SendMessage from "~/components/ui/buttons/SendMessageButton";
import StudyGroup from "~/components/coach/StudyGroup";
import Chip from "~/components/ui/Chip";

export default {
  components: {
    SendMessage,
    StudyGroup,
    Chip,
  },
  async asyncData({ params, store }) {
    const response = await store.dispatch("coach/getCoach", params.id);
    return { coach: response.coach };
  },
  data() {
    return {
      isAccepted: this.$route.query.accepted === "true",
      coach: {},
      group: {
        id: 1,
        title: "Coach's group 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididu...",
        student_count: 10,
      },
    };
  },
  computed: {
    buttonText() {
      return this.isAccepted
        ? this.$t("send_message")
        : this.$t("accept_request");
    },
    coachPhoto() {
      console.log("this.coach", this.coach);
      return this.coach.avatar
        ? this.coach.avatar
        : require("~/assets/images/profile_avatar.png");
    },
  },
  methods: {
    async handleRequest() {
      if (this.isAccepted) {
        this.$router.push(`/coach/message/${this.coach.id}`);
      } else {
        await this.$store.dispatch(
          "coach/acceptRequest",
          this.$route.query.requestId
        );
        this.isAccepted = true;
      }
    },
  },
};
</script>

<style lang="scss">
@import "assets/scss/pages/coach/details";
</style>
