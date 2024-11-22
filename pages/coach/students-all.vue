<template>
  <div class="students-all">
    <div class="students-all__header">
      <div class="students-all__header__content">
        <NuxtLink to="/tests/series" class="students-all__header__link">
          <img src="~/assets/icons/left-arrow-white.svg" />
          <div class="students-all__header__text">
            {{ $t("dashboard") }} • {{ $t("coach") }}
          </div>
        </NuxtLink>
        <div class="students-all__header__title">{{ $t("students") }}</div>
      </div>
    </div>
    <div class="students-all__content">
      <v-data-table
        :headers="headers"
        :items="desserts"
        :sort-by="['calories', 'fat']"
        :sort-desc="[false, true]"
        multi-sort
        class="elevation-1"
      ></v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentsAll",
  data() {
    return {
      headers: [
        {
          text: "Number",
          align: "start",
          sortable: false,
          value: "number",
        },
        {
          text: "Username",
          sortable: false,
          value: "username",
        },
        {
          text: "Level",
          value: "level",
        },
        {
          text: "Last log",
          value: "lastlog",
        },
        {
          text: "Completed tests",
          value: "tests",
        },
        {
          text: "Completed lessons",
          value: "lessons",
        },
        {
          text: "Completed Competitions",
          value: "competitions",
        },
        {
          text: "Time (7days)",
          value: "time7",
        },
        {
          text: "Time (All)",
          value: "timeall",
        },
      ],
      desserts: [
        {
          number: "Frozen Yogurt",
          username: "test",
          level: "beginner",
          lastlog: "test",
          tests: "beginner",
          lessons: "",
          competitions: "",
          time7: "",
          timeall: "",
        },
        {
          number: "Frozen Yogurt",
          username: "test",
          level: "beginner",
          lastlog: "test",
          tests: "beginner",
          lessons: "",
          competitions: "",
          time7: "",
          timeall: "",
        },
        {
          number: "Frozen Yogurt",
          username: "test",
          level: "beginner",
          lastlog: "test",
          tests: "beginner3",
          lessons: "",
          competitions: "",
          time7: "",
          timeall: "",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "assets/scss/pages/coach/students-all";
</style>
