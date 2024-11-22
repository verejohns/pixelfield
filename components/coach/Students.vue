<template>
  <div class="students">
    <div class="students__button">
      <Button
        :label="$t('invite_new_students')"
        type="tertiary"
        size="large"
        position="left"
        width="208px"
        height="40px"
        padding-top="10px"
        icon="add"
        @click="toInviteNewStudents"
      />
    </div>
    <div class="students__item">
      <div class="students__header">
        <div v-if="requestsLength" class="students__title">
          {{ $t("new_requests") }} ({{ requestsLength }})
        </div>
      </div>
      <div class="students__content">
        <RequestItem
          v-for="(request, i) in filteredRequests"
          :key="`request_${i}`"
          :request="request"
          :user="request.user"
          @updateRequests="updateRequests"
        />
      </div>
    </div>
    <div class="students__item">
      <div class="students__header">
        <div class="students__title">
          {{ $t("students") }}
          <span v-if="studentCount">({{ studentCount }})</span>
        </div>
      </div>
      <div v-if="studentCount" class="students__content">
        <UserInfo
          v-for="(student, i) in students"
          :key="`student_${i}`"
          :user="student.user"
        />
      </div>
      <div v-else class="students__empty-container">
        <EmptyStudents />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/ui/buttons/Button";
import UserInfo from "~/components/coach/UserInfo";
import EmptyStudents from "~/components/coach/EmptyStudents";
import RequestItem from "~/components/coach/RequestItem";

export default {
  name: "Students",
  components: {
    Button,
    UserInfo,
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
  },
  data() {
    return {
      sortedRequests: 0,
    };
  },
  computed: {
    requestsLength() {
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
    toInviteNewStudents() {
      this.$router.push(`/coach/invite-students/`);
    },
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
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/coach/students";
</style>
