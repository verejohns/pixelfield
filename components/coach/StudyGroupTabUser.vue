<template>
  <div class="study-group-tab">
    <div class="study-group-tab__button">
      <Button
        :label="$t('hire_new_coach')"
        type="tertiary"
        size="large"
        position="left"
        width="208px"
        height="40px"
        padding-top="10px"
        icon="add"
        @click="toForm"
      />
    </div>
    <div class="study-group-tab__title view-margin-bottom-24">
      {{
        $tc("new_coach_invitations", requestsLength, {
          count: requestsLength,
        })
      }}
    </div>
    <div
      v-for="(request, index) in filteredRequests"
      :key="`request_${index}`"
      class="study-group-tab__coach-requests"
    >
      <RequestItem
        :request="request"
        :user="request.coach"
        @updateRequests="updateRequests"
      />
    </div>
    <div class="study-group-tab__header">
      <div class="study-group-tab__title">
        {{
          $tc("my_study_groups", userGroups.length, {
            count: userGroups.length,
          })
        }}
      </div>
    </div>
    <div v-if="userGroups.length" class="study-group-tab__content">
      <StudyGroup
        v-for="(group, index) in userGroups"
        :key="`group_${index}`"
        :group="group"
      />
    </div>
    <div v-else class="study-group-tab__empty-container">
      <EmptyCoachGroups />
    </div>
    <div class="study-group-tab__title">
      <div class="view-margin-bottom-24">
        {{ $tc("my_coaches", coachLength, { count: coachLength }) }}
      </div>
      <div v-for="(coach, index) in userCoaches" :key="`coach_${index}`">
        <CoachInfo :is-white="true" :link-to-accepted="true" :coach="coach" />
      </div>
      <div v-for="(coach, index) in coachList" :key="`coach_${index}`">
        <CoachInfo :is-white="true" :link-to-accepted="true" :coach="coach" />
      </div>
    </div>
    <EmptyCoaches
      v-if="!coachLength"
      class="study-group-tab__empty-container"
    />
  </div>
</template>

<script>
import Button from "~/components/ui/buttons/Button";
import StudyGroup from "~/components/coach/StudyGroup";
import EmptyCoaches from "~/components/coach/EmptyCoaches";
import EmptyCoachGroups from "~/components/coach/EmptyCoachGroups";
import RequestItem from "~/components/coach/RequestItem.vue";
import CoachInfo from "~/components/coach/CoachInfo";

export default {
  name: "StudyGroupTab",
  components: {
    Button,
    StudyGroup,
    EmptyCoaches,
    CoachInfo,
    EmptyCoachGroups,
    RequestItem,
  },
  data() {
    return {
      sortedRequests: 0,
      coachList: [],
    };
  },
  computed: {
    filteredRequests() {
      return this.$auth.user.requests.filter(
        (r) =>
          !r.declined_by_coach &&
          !r.declined_by_user &&
          r.accepted_by_coach &&
          !r.accepted_by_user
      );
    },
    userGroups() {
      return this.$auth.user.groups;
    },
    userCoaches() {
      return this.$auth.user.coaches;
    },
    coachLength() {
      return Number(this.coachList.length + this.userCoaches.length);
    },
    requestsLength() {
      return this.filteredRequests.length - this.sortedRequests;
    },
  },
  methods: {
    updateRequests(user) {
      this.sortedRequests += 1;
      this.coachList.push(user);
    },
    toForm() {
      this.$router.push(`/user/hire-a-coach/`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/coach/study-group-tab";
</style>
