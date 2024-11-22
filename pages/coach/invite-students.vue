<template>
  <div class="main-container">
    <ReturnArrow />
    <div class="main-container__title">{{ $t("invite_students") }}</div>
    <div class="main-container__info">{{ $t("add_students") }}</div>
    <SearchStudents
      class="view-margin-bottom-24"
      @student-selected="addStudent"
    />
    <div class="main-container__info">
      {{
        $tc("selected_students", students.length, { count: students.length })
      }}
    </div>
    <div v-for="student in students" :key="student.id">
      <InvitationUserCard :user="student" @remove-student="removeStudent" />
    </div>
    <div v-if="students.length === 0" class="main-container__info-message">
      {{ $t("add_students_from_list") }}
    </div>
    <div class="button-position">
      <v-btn
        class="main-container__button button__with-icon"
        @click="inviteStudents"
        >{{ $t("send") }}</v-btn
      >
    </div>
  </div>
</template>

<script>
import ReturnArrow from "~/components/ui/ReturnArrow.vue";
import SearchStudents from "~/components/coach/SearchStudents.vue";
import InvitationUserCard from "~/components/coach/InvitationUserCard";

export default {
  components: { InvitationUserCard, SearchStudents, ReturnArrow },
  data() {
    return {
      students: [],
      student_ids: [],
    };
  },
  methods: {
    addStudent(student) {
      if (!this.students.includes(student)) {
        this.students.push(student);
      }
    },
    removeStudent(id) {
      this.students = this.students.filter((obj) => obj.id !== id);
    },
    async inviteStudents() {
      if (this.students.length > 0) {
        for (let i = 0; i < this.students.length; i++) {
          this.student_ids[i] = this.students[i].id;
        }
        await this.$store.dispatch("coach/inviteStudents", {
          student_ids: this.student_ids,
        });
        this.$router.push(`/coach/`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/coach/create-edit-group";
@import "~/assets/scss/components/ui/buttons/button";
</style>
