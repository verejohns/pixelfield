<template>
  <div class="main-container">
    <ReturnArrow />
    <div class="main-container__title">{{ $t("edit_group") }}</div>
    <div class="main-container__info">{{ $t("group_info") }}</div>
    <div v-if="!groupIsLoading" class="main-container__field">
      <div class="main-container__field__label">{{ $t("name") }}</div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="groupInfo.title"
          solo
          flat
          :rules="[rules.required]"
          required
          class="main-container__field__name"
        ></v-text-field>
      </v-form>
    </div>
    <Loading v-else />
    <div v-if="!groupIsLoading" class="main-container__field">
      <div class="main-container__field__label">{{ $t("description") }}</div>
      <v-text-field
        v-model="groupInfo.description"
        solo
        flat
        hide-details
        class="main-container__field__name"
      ></v-text-field>
    </div>
    <div class="main-container__info">{{ $t("add_students") }}</div>
    <SearchStudents
      class="view-margin-bottom-24"
      @student-selected="addStudent"
    />
    <div class="main-container__info">
      {{ $tc("student_bracket", students.length, { count: students.length }) }}
    </div>
    <div v-for="student in students" :key="student.id">
      <InvitationUserCard :user="student" @remove-student="removeStudent" />
    </div>
    <div class="button-position">
      <v-btn
        class="main-container__button button__with-icon"
        @click="validate"
        >{{ $t("confirm") }}</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import InvitationUserCard from "~/components/coach/InvitationUserCard";
import validation from "~/mixins/validation";
import SearchStudents from "~/components/coach/SearchStudents";
import ReturnArrow from "~/components/ui/ReturnArrow.vue";
import Loading from "~/components/ui/Loading.vue";

export default {
  components: { InvitationUserCard, SearchStudents, ReturnArrow, Loading },
  mixins: [validation],
  data() {
    return {
      valid: true,
      students: [],
      student_ids: [],
      groupInfo: {},
    };
  },
  computed: {
    ...mapGetters({
      group: "coach/coachGroup",
      groupIsLoading: "coach/coachGroupIsLoading",
    }),
  },
  mounted() {
    this.$store.dispatch("coach/getGroup", this.$route.params.id);
  },
  methods: {
    removeStudent(id) {
      this.students = this.students.filter((obj) => obj.id !== id);
    },
    addStudent(student) {
      if (!this.students.includes(student)) {
        this.students.push(student);
      }
    },
    async validate() {
      for (let i = 0; i < this.students.length; i++) {
        this.student_ids[i] = this.students[i].id;
      }

      if (this.$refs.form.validate()) {
        await this.$store.dispatch("coach/editGroup", {
          groupId: this.groupInfo.id,
          payload: {
            title: this.groupInfo.title,
            description: this.groupInfo.description,
            student_ids: this.student_ids,
          },
        });
        this.$router.push(`/coach/group-detail/${this.groupInfo.id}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/coach/create-edit-group";
@import "~/assets/scss/components/ui/buttons/button";
</style>
