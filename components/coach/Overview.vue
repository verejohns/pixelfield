<template>
  <div class="overview">
    <div class="overview__item">
      <div class="overview__header">
        <div v-if="filteredRequests.length" class="overview__title">
          {{ $t("new_requests") }} ({{ filteredRequests.length }})
        </div>
      </div>
      <div class="overview__content">
        <div v-for="request in filteredRequests" :key="`request_${request.id}`">
          <RequestItem
            :request="request"
            :user="request.user"
            @updateRequests="updateRequests"
          />
        </div>
      </div>
    </div>
    <div class="overview__item">
      <div class="overview__header">
        <div class="overview__title">
          {{
            $tc("study_groups_count", studyGroups.length, {
              count: studyGroups.length,
            })
          }}
          <span v-if="studyGroups.length">({{ studyGroups.length }})</span>
        </div>
        <div class="overview__link" @click="viewAllGroups">
          {{ $t("view_all") }}
        </div>
      </div>
      <div
        v-if="studyGroups.length"
        class="overview__content overview__study-group"
      >
        <div v-for="group in studyGroups" :key="`group_${group.id}`">
          <StudyGroup :group="group" />
        </div>
      </div>
      <div v-else class="overview__empty-container">
        <EmptyGroups />
      </div>
    </div>
    <div class="overview__item">
      <div class="overview__header">
        <div class="overview__title">
          {{
            $tc("coach_student_count", studentCount, {
              count: studentCount,
            })
          }}
        </div>
        <div
          v-if="studentCount"
          class="overview__link"
          @click="viewAllStudents"
        >
          {{ $t("view_all") }}
        </div>
      </div>
      <div v-if="studentCount" class="overview__content">
        <div v-for="student in students" :key="`student_${student.id}`">
          <UserInfo :user="student.user" />
        </div>
      </div>
      <div v-else class="overview__empty-container">
        <EmptyStudents />
      </div>
    </div>
  </div>
</template>

<script>
import UserInfo from "~/components/coach/UserInfo";
import StudyGroup from "~/components/coach/StudyGroup";
import EmptyGroups from "~/components/coach/EmptyGroups";
import EmptyStudents from "~/components/coach/EmptyStudents";
import RequestItem from "~/components/coach/RequestItem";
export default {
  components: {
    UserInfo,
    StudyGroup,
    EmptyGroups,
    EmptyStudents,
    RequestItem,
  },
  props: {
    requests: {
      type: Array,
      required: true,
    },
    students: {
      type: Array,
      required: true,
    },
    studyGroups: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sortedRequests: 0,
    };
  },
  computed: {
    coachRequests() {
      return this.filteredRequests.length - this.sortedRequests;
    },
    filteredRequests() {
      return this.requests.filter(
        (r) =>
          !r.declined_by_coach &&
          !r.declined_by_user &&
          !r.accepted_by_coach &&
          r.accepted_by_user
      );
    },
    studentCount() {
      return this.students.length;
    },
  },
  methods: {
    updateRequests(user) {
      this.sortedRequests += 1;
      this.$store.commit("coach/addStudent", {
        accepted_by_coach: "true",
        accepted_by_user: "true",
        user: {
          avatar: user.avatar,
          display_name: user.display_name,
          id: user.id,
          level: user.level,
        },
      });
    },
    viewAllGroups() {
      this.$emit("swap", "study_groups");
    },
    viewAllStudents() {
      this.$emit("swap", "students");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/coach/overview";
</style>
