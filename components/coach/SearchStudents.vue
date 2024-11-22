<template>
  <div class="search-students">
    <v-autocomplete
      v-model="select"
      :items="filteredStudents"
      :search-input.sync="search"
      :item-text="'display_name'"
      :no-filter="true"
      return-object
      class="mx-4"
      flat
      hide-no-data
      hide-details
      :label="$t('find_students')"
      solo-inverted
      @change="itemChange"
    ></v-autocomplete>
    <img src="~/assets/icons/search-black.svg" class="search-students__icon" />
  </div>
</template>

<script>
export default {
  name: "SearchStudents",
  data() {
    return {
      filteredStudents: [],
      search: null,
      select: null,
      searchTimeout: null,
      students: [],
    };
  },
  watch: {
    select(val) {
      if (val) {
        this.$emit("student-selected", val);
      }
    },
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  methods: {
    querySelections(v) {
      clearTimeout(this.searchTimeout);
      if (v !== undefined) {
        this.searchTimeout = setTimeout(async () => {
          this.filteredStudents = await this.$store.dispatch(
            "user/getStudents",
            v
          );
        }, 500);
      }
    },
    itemChange() {
      this.$nextTick(() => {
        this.search = "";
        this.select = null;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/coach/search-students";
</style>
