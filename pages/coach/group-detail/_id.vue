<template>
  <div class="main-container">
    <div class="main-container__header">
      <div class="main-container__header__content">
        <div class="main-container__header__dashboard" @click="toCoach">
          <img
            class="main-container__header__img view-mr16"
            src="~/assets/icons/left-arrow-white.svg"
          />
          <div>{{ $t("dashboard") }} • {{ $t("coach") }}</div>
        </div>
        <div v-if="!coachGroupIsLoading && !studentsIsLoading">
          <EditGroupTile
            :group="coachGroup"
            :number-of-students="students.count"
          />
          <div v-if="students.count" class="main-container__student-list">
            <div class="main-container__heading">
              {{ $t("students") }} ({{ students.count }})
            </div>
            <div v-for="student in students.results" :key="student">
              <UserInfo :user="student.user" />
            </div>
          </div>
          <div v-else>
            <EmptyStudents class="view-margin-top-24" />
          </div>
        </div>
        <Loading v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EditGroupTile from "~/components/coach/EditGroupTile.vue";
import UserInfo from "~/components/coach/UserInfo";
import EmptyStudents from "~/components/coach/EmptyStudents";
import Loading from "~/components/ui/Loading.vue";

export default {
  components: {
    UserInfo,
    EditGroupTile,
    EmptyStudents,
    Loading,
  },
  computed: {
    ...mapGetters({
      coachGroup: "coach/coachGroup",
      coachGroupIsLoading: "coach/coachGroupIsLoading",
      students: "coach/coachStudents",
      studentsIsLoading: "coach/coachStudentsIsLoading",
    }),
  },
  mounted() {
    this.$store.dispatch("coach/getStudentsInGroup", this.$route.params.id);
    this.$store.dispatch("coach/getGroup", this.$route.params.id);
  },
  methods: {
    toCoach() {
      this.$router.push(`/coach/`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/coach/group-detail";
</style>
